import type { ComponentType, ReactNode } from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {
  UserMultiple,
  Chat,
  Education,
  UserProfile,
  Money,
  UserAdmin,
  DeliveryTruck,
} from '@carbon/icons-react';

// Single source of truth for the seven product surfaces. Keep in sync with the
// docs plugin ids/routes in docusaurus.config.ts (root AGENTS.md Content Map).
export type ProductId = 'sxp' | 'pxp' | 'lxp' | 'ess' | 'fo' | 'hr' | 'scm';
export type ProductGroup = 'school' | 'employment' | 'admin';

export type Product = {
  id: ProductId;
  name: string;
  /** One line, plain language: who it's for. */
  audience: string;
  route: string;
  group: ProductGroup;
  /** Carbon icon for tmrw products. */
  Icon?: ComponentType<{ size?: number; 'aria-hidden'?: boolean }>;
  /** Official Microsoft icon for Dynamics 365 apps (used as-is, never recoloured). */
  d365Icon?: string;
};

export const PRODUCTS: Product[] = [
  { id: 'sxp', name: 'StaffXP', audience: 'Teachers and school leaders', route: '/sxp', group: 'school', Icon: UserMultiple },
  { id: 'pxp', name: 'ParentXP', audience: 'Parents and guardians', route: '/pxp', group: 'school', Icon: Chat },
  { id: 'lxp', name: 'LearnerXP', audience: 'Students', route: '/lxp', group: 'school', Icon: Education },
  { id: 'ess', name: 'Employee Self-Service', audience: 'Leave, payslips, benefits', route: '/ess', group: 'employment', Icon: UserProfile },
  { id: 'fo', name: 'Finance & Operations', audience: 'Billing and collections', route: '/fo', group: 'admin', d365Icon: '/img/d365/finance-operations.svg' },
  { id: 'hr', name: 'Human Resources', audience: 'HR administration', route: '/hr', group: 'admin', d365Icon: '/img/d365/human-resources.svg' },
  { id: 'scm', name: 'Supply Chain Management', audience: 'Vendors and sourcing', route: '/scm', group: 'admin', d365Icon: '/img/d365/supply-chain-management.svg' },
];

export const GROUPS: { id: ProductGroup; label: string }[] = [
  { id: 'school', label: 'At school' },
  { id: 'employment', label: 'Your employment' },
  { id: 'admin', label: 'Admin guides · Dynamics 365' },
];

export function productFromPath(pathname: string): Product | undefined {
  const seg = pathname.split('/').filter(Boolean)[0];
  return PRODUCTS.find((p) => p.id === seg);
}

/** Product mark: Carbon icon (inherits text colour) or the official D365 icon. */
export function ProductMark({ product, size = 20 }: { product: Product; size?: 16 | 20 | 24 | 32 }): ReactNode {
  const src = useBaseUrl(product.d365Icon ?? '');
  if (product.d365Icon) {
    return <img src={src} width={size} height={size} alt="" style={{ flex: 'none' }} />;
  }
  const { Icon } = product;
  return Icon ? <Icon size={size} aria-hidden /> : null;
}
