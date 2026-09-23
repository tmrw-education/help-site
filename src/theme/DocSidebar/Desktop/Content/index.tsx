import React from 'react';
import Content from '@theme-original/DocSidebar/Desktop/Content';
import type ContentType from '@theme/DocSidebar/Desktop/Content';
import type { WrapperProps } from '@docusaurus/types';
import type { PropSidebarItem } from '@docusaurus/plugin-content-docs';
import Link from '@docusaurus/Link';
import { useLocation } from '@docusaurus/router';
import { productFromPath, ProductMark } from '@site/src/data/products';

type Props = WrapperProps<typeof ContentType>;

function countDocs(items: readonly PropSidebarItem[]): number {
  return items.reduce(
    (n, it) => n + (it.type === 'link' ? 1 : it.type === 'category' ? countDocs(it.items) + (it.href ? 1 : 0) : 0),
    0,
  );
}

// Sidebar opens with the product it belongs to, so you always know where you are.
export default function ContentWrapper(props: Props): React.JSX.Element {
  const product = productFromPath(useLocation().pathname);
  return (
    <>
      {product && (
        <Link to={product.route} className="sidebar-product">
          <ProductMark product={product} size={32} />
          <span>
            <span className="sidebar-product__name">{product.name}</span>
            <span className="sidebar-product__count">{countDocs(props.sidebar)} articles</span>
          </span>
        </Link>
      )}
      <Content {...props} />
    </>
  );
}
