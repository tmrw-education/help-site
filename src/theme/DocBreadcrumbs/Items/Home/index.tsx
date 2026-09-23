import React from 'react';
import Link from '@docusaurus/Link';
import { useLocation } from '@docusaurus/router';
import { productFromPath, ProductMark } from '@site/src/data/products';

// First breadcrumb = the product you're in (icon + name → product landing), not "Home".
export default function HomeBreadcrumbItem(): React.JSX.Element | null {
  const product = productFromPath(useLocation().pathname);
  if (!product) return null;
  return (
    <li className="breadcrumbs__item">
      <Link className="breadcrumbs__link breadcrumbs__product" to={product.route}>
        <ProductMark product={product} size={16} />
        {product.name}
      </Link>
    </li>
  );
}
