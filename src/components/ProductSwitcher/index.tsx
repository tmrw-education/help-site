import { useEffect, useRef, useState, type ReactNode } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import { useLocation } from '@docusaurus/router';
import { ChevronDown } from '@carbon/icons-react';
import { GROUPS, PRODUCTS, ProductMark, productFromPath } from '@site/src/data/products';
import styles from './styles.module.css';

// Navbar item (type: 'custom-productSwitcher'). Desktop: one button that names the
// current product and opens a grouped menu. Mobile drawer: the same groups as a list.
export default function ProductSwitcher({ mobile }: { mobile?: boolean }): ReactNode {
  const { pathname } = useLocation();
  const current = productFromPath(pathname);

  if (mobile) {
    return (
      <>
        {GROUPS.map((g) => (
          <li key={g.id} className="menu__list-item">
            <p className={styles.drawerGroup}>{g.label}</p>
            <ul className={clsx('menu__list', styles.drawerList)}>
              {PRODUCTS.filter((p) => p.group === g.id).map((p) => (
                <li key={p.id} className="menu__list-item">
                  <Link
                    to={p.route}
                    className={clsx('menu__link', styles.drawerLink, current?.id === p.id && 'menu__link--active')}>
                    <ProductMark product={p} size={20} />
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </>
    );
  }

  return <DesktopSwitcher current={current} pathname={pathname} />;
}

function DesktopSwitcher({ current, pathname }: { current: ReturnType<typeof productFromPath>; pathname: string }) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div className={clsx("navbar__item", styles.root)} ref={root}>
      <button
        type="button"
        className={clsx(styles.trigger, open && styles.triggerOpen)}
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((o) => !o)}>
        {current && <ProductMark product={current} size={16} />}
        {current ? current.name : 'Products'}
        <ChevronDown size={16} aria-hidden className={styles.chevron} />
      </button>
      {open && (
        <div className={styles.panel}>
          {GROUPS.map((g) => (
            <div key={g.id}>
              <p className={styles.groupLabel}>{g.label}</p>
              {PRODUCTS.filter((p) => p.group === g.id).map((p) => (
                <Link
                  key={p.id}
                  to={p.route}
                  className={clsx(styles.item, current?.id === p.id && styles.itemActive)}>
                  <span className={styles.itemMark}>
                    <ProductMark product={p} size={p.d365Icon ? 32 : 24} />
                  </span>
                  <span>
                    <span className={styles.itemName}>{p.name}</span>
                    <span className={styles.itemAudience}>{p.audience}</span>
                  </span>
                </Link>
              ))}
            </div>
          ))}
          <div className={styles.foot}>
            <Link to="/">All help</Link>
            <Link to="/admin">About the admin guides</Link>
          </div>
        </div>
      )}
    </div>
  );
}
