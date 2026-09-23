import ComponentTypes from '@theme-original/NavbarItem/ComponentTypes';
import ProductSwitcher from '@site/src/components/ProductSwitcher';

// Adds the navbar product switcher as `type: 'custom-productSwitcher'`.
export default {
  ...ComponentTypes,
  'custom-productSwitcher': ProductSwitcher,
};
