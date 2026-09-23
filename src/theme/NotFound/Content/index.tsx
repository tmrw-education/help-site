import React from 'react';
import Link from '@docusaurus/Link';
import LiveSearch from '@site/src/components/LiveSearch';
import { PRODUCTS, ProductMark } from '@site/src/data/products';

// 404: never a dead end. Search, popular tasks, and the product list.
const POPULAR = [
  { label: 'Submit a leave request', to: '/ess/Leave/submit-a-leave-request' },
  { label: 'Take the daily roll', to: '/sxp/Attendance/take-attendance-roll' },
  { label: 'Pay outstanding fees', to: '/pxp/Fees/pay-outstanding-fees' },
  { label: 'Send a notice to parents', to: '/sxp/Notices/create-notice' },
];

export default function NotFoundContent({ className }: { className?: string }): React.JSX.Element {
  return (
    <main className={`not-found ${className ?? ''}`}>
      <p className="not-found__code">404 · Page not found</p>
      <h1 className="not-found__title">That page has moved or no longer exists.</h1>
      <p className="not-found__lede">Help articles get renamed as tmrw changes. Search for it, or pick up from one of these.</p>
      <div className="not-found__search">
        <LiveSearch variant="hero" />
      </div>
      <div className="not-found__cols">
        <section>
          <h2>Popular tasks</h2>
          <ul>
            {POPULAR.map((p) => (
              <li key={p.to}>
                <Link to={p.to}>{p.label}</Link>
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h2>Browse a product</h2>
          <ul>
            {PRODUCTS.map((p) => (
              <li key={p.id}>
                <Link to={p.route} className="not-found__product">
                  {/* shared list: D365 apps as text only, so the admin guides don't out-shout school ones */}
                  <span className="not-found__mark">{!p.d365Icon && <ProductMark product={p} size={20} />}</span>
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
