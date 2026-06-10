import { type ReactNode, useState, useEffect } from 'react';
import Link from '@docusaurus/Link';
import { useHistory } from '@docusaurus/router';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import {
  ArrowRight,
  Search as SearchIcon,
  UserMultiple,
  UserProfile,
  Money,
  Chat,
  Education,
} from '@carbon/icons-react';
import styles from './index.module.css';

const apps = [
  {
    id: 'sxp',
    name: 'StaffXP',
    description: 'Day-to-day tools for teachers, admin, and school leaders.',
    href: '/help/sxp',
    Icon: UserMultiple,
  },
  {
    id: 'ess',
    name: 'Employee Self-Service',
    description: 'HR tasks for all staff: leave, benefits, documents, and more.',
    href: '/help/ess',
    Icon: UserProfile,
  },
  {
    id: 'fo',
    name: 'Finance & Operations',
    description: 'Billing, fees, and financial management for bursars and accountants.',
    href: '/help/fo',
    Icon: Money,
  },
  {
    id: 'pxp',
    name: 'Parent Experience',
    description: 'Everything parents need: notices, attendance, and communication.',
    href: '/help/pxp',
    Icon: Chat,
  },
  {
    id: 'lxp',
    name: 'Learner Experience',
    description: 'Help for students using the tmrw learner platform.',
    href: '/help/lxp',
    Icon: Education,
  },
];

const SEARCH_HINTS = [
  'Search leave requests…',
  'Search billing & fees…',
  'How do I mark attendance?',
  'Reset a password…',
  'Search StaffXP…',
];

const POPULAR = ['Reset password', 'Request leave', 'View payslip', 'Mark attendance', 'Pay fees'];

function HeroSearch() {
  const history = useHistory();
  const searchBase = useBaseUrl('/search');
  const [q, setQ] = useState('');
  const [hint, setHint] = useState(0);

  // cycle placeholder hints while the field is empty
  useEffect(() => {
    if (q) return;
    const id = setInterval(
      () => setHint((h) => (h + 1) % SEARCH_HINTS.length),
      2600,
    );
    return () => clearInterval(id);
  }, [q]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (q.trim()) history.push(`${searchBase}?q=${encodeURIComponent(q.trim())}`);
  };

  return (
    <form className={styles.heroSearch} onSubmit={onSubmit} role="search">
      <span className={styles.heroSearchBtn} aria-hidden="true">
        <SearchIcon size={18} />
      </span>
      <span className={styles.heroSearchField}>
        <input
          className={styles.heroSearchInput}
          value={q}
          onChange={(e) => setQ(e.target.value)}
          aria-label="Search the help center"
        />
        {!q && (
          <span className={styles.heroHint} key={hint} aria-hidden="true">
            {SEARCH_HINTS[hint]}
          </span>
        )}
      </span>
      <button className={styles.heroSubmit} type="submit" aria-label="Search">
        <ArrowRight size={18} />
      </button>
    </form>
  );
}

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout title="Help" description={siteConfig.tagline}>
      <main className={styles.main}>
        <div className={styles.hero}>
          <h1 className={styles.title}>How can we help?</h1>
          <p className={styles.subtitle}>
            Search across every tmrw product.
          </p>
          <HeroSearch />
          <div className={styles.popular}>
            <span className={styles.popularLabel}>Popular</span>
            {POPULAR.map((term) => (
              <Link
                key={term}
                to={`/search?q=${encodeURIComponent(term)}`}
                className={styles.chip}
              >
                {term}
              </Link>
            ))}
          </div>
        </div>

        <p className={styles.browseLabel}>Or browse by product</p>
        <div className={styles.grid}>
          {apps.map(({ id, name, description, href, Icon }) => (
            <Link key={id} to={href} className={styles.card}>
              <span className={styles.cardIcon}>
                <Icon width={32} height={32} aria-hidden="true" />
              </span>
              <span className={styles.cardText}>
                <h2 className={styles.cardTitle}>{name}</h2>
                <p className={styles.cardDesc}>{description}</p>
              </span>
              <span className={styles.cardArrow} aria-hidden="true">
                <ArrowRight size={18} />
              </span>
            </Link>
          ))}
        </div>
      </main>
    </Layout>
  );
}
