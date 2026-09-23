import type { ReactNode } from 'react';
import LiveSearch from '@site/src/components/LiveSearch';

// Navbar search = our LiveSearch (plugin index, our dropdown) instead of the plugin's SearchBar.
export default function SearchBar(): ReactNode {
  return <LiveSearch variant="navbar" />;
}
