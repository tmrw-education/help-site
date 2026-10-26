import type { ReactNode } from 'react';
import Link from '@docusaurus/Link';
import Head from '@docusaurus/Head';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import LiveSearch from '@site/src/components/LiveSearch';
import { ArrowRight, UserMultiple, Chat, Education } from '@carbon/icons-react';
import styles from './index.module.css';

// Concept C: search-led homepage for the three everyday audiences. Dynamics 365
// admin guides (F&O, HR, SCM) sit behind one band → /admin, and in the navbar switcher.
const AUDIENCES = [
  {
    title: 'School staff',
    // GXP is linked below but not named here: the full name would widen this max-content column past the 880px frame.
    products: 'StaffXP and Employee Self-Service',
    Icon: UserMultiple,
    links: [
      { label: 'Take the daily roll', to: '/sxp/Attendance/take-attendance-roll' },
      { label: 'Submit a leave request', to: '/ess/Leave/submit-a-leave-request' },
      { label: 'Send a notice to parents', to: '/sxp/Notices/create-notice' },
      { label: 'Start or resume a course', to: '/gxp/My-learning/gxp-start-or-resume-a-course' },
    ],
    all: { label: 'All staff guides', to: '/sxp' },
  },
  {
    title: 'Parents',
    products: 'ParentXP',
    Icon: Chat,
    links: [
      { label: 'Pay outstanding fees', to: '/pxp/Fees/pay-outstanding-fees' },
      { label: 'Report an unexpected absence', to: '/pxp/Attendance/unexpected-absence-pxp' },
      { label: 'Let someone else collect my child', to: '/pxp/Attendance/someone-else-collects-my-child' },
    ],
    all: { label: 'All parent guides', to: '/pxp' },
  },
  {
    title: 'Students',
    products: 'LearnerXP',
    Icon: Education,
    // LearnerXP has one page so far; no "coming soon" filler on the homepage
    links: [{ label: 'Getting started with LearnerXP', to: '/lxp' }],
  },
];

// Each chip opens its article directly: a chip that runs a search can land on nothing
// ("Reset password" and "View payslip" had no article) or on the wrong one first.
const POPULAR = [
  { label: 'Request leave', to: '/ess/Leave/submit-a-leave-request' },
  { label: 'Take the daily roll', to: '/sxp/Attendance/take-attendance-roll' },
  { label: 'Pay fees', to: '/pxp/Fees/pay-outstanding-fees' },
  { label: 'Exam timetable', to: '/pxp/Timetable/view-exam-timetable-pxp' },
  { label: 'Payment details', to: '/ess/Profile/update-payment-information' },
];

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  const d365 = useBaseUrl('/img/d365/dynamics-365.svg');

  return (
    <Layout title="Help" description={siteConfig.tagline}>
      {/* the hero owns search on this page; custom.css hides the navbar search */}
      <Head>
        <html className="page-home" />
      </Head>
      <main className={styles.main}>
        <div className={styles.hero}>
          <h1 className={styles.title}>How can we help?</h1>
          <p className={styles.subtitle}>Search across every tmrw product.</p>
          <LiveSearch variant="hero" />
          {/* no visible label: it pushed the chips off the field's axis; the nav names them for screen readers */}
          <nav className={styles.popular} aria-label="Popular tasks">
            {POPULAR.map(({ label, to }) => (
              <Link key={to} to={to} className={styles.chip}>
                {label}
              </Link>
            ))}
          </nav>
        </div>

        <div className={styles.audiences}>
          {AUDIENCES.map(({ title, products, Icon, links, all }) => (
            <section key={title} className={styles.audience}>
              <Icon size={32} aria-hidden />
              <h2 className={styles.audienceTitle}>{title}</h2>
              <p className={styles.audienceProducts}>{products}</p>
              <ul className={styles.links}>
                {links.map((l) => (
                  <li key={l.to}>
                    <Link to={l.to}>{l.label}</Link>
                  </li>
                ))}
                {all && (
                  <li>
                    <Link to={all.to}>{all.label} →</Link>
                  </li>
                )}
              </ul>
            </section>
          ))}
        </div>

        <aside className={styles.admin}>
          <img src={d365} width={40} height={40} alt="Dynamics 365" />
          <div>
            <p className={styles.adminTitle}>Running the school in Dynamics 365?</p>
            <p className={styles.adminText}>
              Admin guides for Finance &amp; Operations, Human Resources and Supply Chain live in their own section.
            </p>
          </div>
          <Link to="/admin" className={styles.adminButton}>
            Admin guides <ArrowRight size={16} aria-hidden />
          </Link>
        </aside>
      </main>
    </Layout>
  );
}
