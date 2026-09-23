import type { ReactNode } from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import { ArrowRight } from '@carbon/icons-react';
import { PRODUCTS, ProductMark } from '@site/src/data/products';
import styles from './admin.module.css';

// Landing for the Dynamics 365 admin guides (the homepage band links here).
const DETAIL: Record<string, string> = {
  fo: 'Billing, fee collection, debtor management and reporting.',
  hr: 'Hiring, onboarding, leave plans, probation and offboarding.',
  scm: 'Vendor registration, contracts and sourcing.',
};

export default function Admin(): ReactNode {
  return (
    <Layout title="Dynamics 365 admin guides" description="Admin guides for tmrw's Dynamics 365 apps">
      <main className={styles.main}>
        <h1 className={styles.title}>Dynamics 365 admin guides</h1>
        <p className={styles.lede}>
          For HR, finance and procurement teams who run the school in Microsoft Dynamics 365.
          Looking for your own leave or payslips? That’s in <Link to="/ess">Employee Self-Service</Link>.
        </p>
        <ul className={styles.list}>
          {PRODUCTS.filter((p) => p.group === 'admin').map((p) => (
            <li key={p.id}>
              <Link to={p.route} className={styles.row}>
                <ProductMark product={p} size={32} />
                <span>
                  <span className={styles.name}>{p.name}</span>
                  <span className={styles.detail}>{DETAIL[p.id]}</span>
                </span>
                <ArrowRight size={16} aria-hidden className={styles.arrow} />
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </Layout>
  );
}
