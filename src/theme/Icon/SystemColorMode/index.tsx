import React, { type ComponentProps } from 'react';
import { Laptop } from '@carbon/icons-react';

// Carbon icon swap for the color-mode toggle (system).
export default function IconSystemColorMode(props: ComponentProps<'svg'>): JSX.Element {
  return <Laptop {...props} />;
}
