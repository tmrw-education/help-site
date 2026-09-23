import { useCallback, useEffect, useId, useRef, useState, type ReactNode } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import { useHistory } from '@docusaurus/router';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { ArrowRight, Search as SearchIcon } from '@carbon/icons-react';
import {
  fetchIndexesByWorker,
  searchByWorker,
  type SearchResult,
} from '@easyops-cn/docusaurus-search-local/dist/client/client/theme/searchByWorker';
import { highlight } from '@easyops-cn/docusaurus-search-local/dist/client/client/utils/highlight';
import { highlightStemmed } from '@easyops-cn/docusaurus-search-local/dist/client/client/utils/highlightStemmed';
import { getStemmedPositions } from '@easyops-cn/docusaurus-search-local/dist/client/client/utils/getStemmedPositions';
import { productFromPath } from '@site/src/data/products';
import styles from './styles.module.css';

// Live search on the search plugin's own index + worker, with our dropdown:
// one row per article (title, matching snippet, product label).
// variant 'hero' = homepage/404 pill; 'navbar' = header (icon link to /search on phones).

type Hit = { url: string; titleHtml: string; snippetHtml?: string; tokens: string[]; hash?: string };

const TITLE = 0;
const HEADING = 1;
const MAX_ROWS = 6;

function toHits(results: SearchResult[]): Hit[] {
  const byUrl = new Map<string, Hit>();
  for (const r of results) {
    const { document: d, tokens } = r;
    const pageTitle = r.type === TITLE ? d.t : (r.page && r.page.t) || d.t;
    let hit = byUrl.get(d.u);
    if (!hit) {
      hit = { url: d.u, titleHtml: highlight(pageTitle, tokens), tokens, hash: r.type === TITLE ? undefined : d.h };
      byUrl.set(d.u, hit);
    }
    if (!hit.snippetHtml && r.type !== TITLE && d.t !== pageTitle) {
      hit.snippetHtml =
        r.type === HEADING ? highlight(d.t, tokens) : highlightStemmed(d.t, getStemmedPositions(r.metadata, 't'), tokens, 110);
    }
  }
  return [...byUrl.values()];
}

function hitHref(hit: Hit): string {
  const params = new URLSearchParams();
  hit.tokens.forEach((t) => params.append('_highlight', t));
  return `${hit.url}${hit.tokens.length ? `?${params}` : ''}${hit.hash ?? ''}`;
}

// Text only: the name says which product; an icon repeated on every row is noise
// (and D365 apps stay text-only in shared contexts anyway).
function ProductLabel({ url }: { url: string }): ReactNode {
  const p = productFromPath(url);
  return p ? <span className={styles.product}>{p.name}</span> : null;
}

export default function LiveSearch({ variant }: { variant: 'hero' | 'navbar' }): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  const history = useHistory();
  const searchPage = useBaseUrl('/search');
  const listId = useId();
  const root = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const [q, setQ] = useState('');
  const [hits, setHits] = useState<Hit[] | null>(null);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);

  const seeAll = useCallback(
    (query = q) => query.trim() && history.push(`${searchPage}?q=${encodeURIComponent(query.trim())}`),
    [history, searchPage, q],
  );

  // Search as you type (debounced); stale responses are dropped.
  useEffect(() => {
    const query = q.trim();
    if (!query) {
      setHits(null);
      return;
    }
    let live = true;
    const t = setTimeout(async () => {
      const results = await searchByWorker(siteConfig.baseUrl, '', query, 40);
      if (live) {
        setHits(toHits(results));
        setActive(0);
      }
    }, 120);
    return () => {
      live = false;
      clearTimeout(t);
    };
  }, [q, siteConfig.baseUrl]);

  // Close on outside click.
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => !root.current?.contains(e.target as Node) && setOpen(false);
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [open]);

  // ⌘K / Ctrl+K focuses search. On the homepage the hero owns it (navbar copy is hidden).
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() !== 'k' || !(e.metaKey || e.ctrlKey)) return;
      const onHome = document.documentElement.classList.contains('page-home');
      if ((variant === 'navbar') === onHome) return;
      e.preventDefault();
      input.current?.focus();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [variant]);

  const rows = hits?.slice(0, MAX_ROWS) ?? [];
  const showPanel = open && q.trim() !== '' && hits !== null;

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      setOpen(true);
      if (rows.length) setActive((i) => (i + (e.key === 'ArrowDown' ? 1 : rows.length - 1)) % rows.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const hit = showPanel ? rows[active] : undefined;
      if (hit) history.push(hitHref(hit));
      else seeAll();
      setOpen(false);
      input.current?.blur();
    } else if (e.key === 'Escape') {
      setOpen(false);
      input.current?.blur();
    }
  };

  const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform);

  return (
    <div ref={root} className={clsx(styles.root, styles[variant], `live-search--${variant}`)} role="search">
      <div className={styles.field}>
        <SearchIcon size={variant === 'hero' ? 20 : 16} aria-hidden className={styles.icon} />
        <input
          ref={input}
          className={styles.input}
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setOpen(true);
          }}
          onFocus={() => {
            fetchIndexesByWorker(siteConfig.baseUrl, '');
            setOpen(true);
          }}
          onKeyDown={onKeyDown}
          placeholder={variant === 'hero' ? 'Try “request leave” or “take the roll”' : 'Search help'}
          aria-label="Search help"
          role="combobox"
          aria-expanded={showPanel}
          aria-controls={listId}
          aria-activedescendant={showPanel && rows[active] ? `${listId}-${active}` : undefined}
          autoComplete="off"
          spellCheck={false}
        />
        {variant === 'hero' ? (
          <button className={styles.submit} type="button" aria-label="See all results" onClick={() => seeAll()}>
            <ArrowRight size={16} />
          </button>
        ) : (
          <kbd className={styles.kbd} aria-hidden>
            {isMac ? '⌘K' : 'Ctrl K'}
          </kbd>
        )}
      </div>

      {variant === 'navbar' && (
        <Link to="/search" className={styles.mobileLink} aria-label="Search help">
          <SearchIcon size={20} />
        </Link>
      )}

      {showPanel && (
        <div className={styles.panel}>
          {rows.length ? (
            <>
              <p className={styles.panelHead}>Articles</p>
              <ul id={listId} role="listbox" className={styles.list}>
                {rows.map((hit, i) => (
                  <li
                    key={hit.url}
                    id={`${listId}-${i}`}
                    role="option"
                    aria-selected={i === active}
                    className={clsx(styles.row, i === active && styles.rowActive)}
                    onMouseEnter={() => setActive(i)}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      history.push(hitHref(hit));
                      setOpen(false);
                    }}>
                    <span className={styles.rowText}>
                      <span className={styles.title} dangerouslySetInnerHTML={{ __html: hit.titleHtml }} />
                      {hit.snippetHtml && (
                        <span className={styles.snippet} dangerouslySetInnerHTML={{ __html: hit.snippetHtml }} />
                      )}
                    </span>
                    <ProductLabel url={hit.url} />
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p className={styles.empty}>No articles match “{q.trim()}”. Try fewer or different words.</p>
          )}
          <div className={styles.foot}>
            <span className={styles.hints}>
              <kbd>↑</kbd>
              <kbd>↓</kbd> to move <kbd>↵</kbd> to open <kbd>esc</kbd> to close
            </span>
            <button type="button" className={styles.seeAll} onMouseDown={(e) => { e.preventDefault(); seeAll(); }}>
              See all results <ArrowRight size={16} aria-hidden />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
