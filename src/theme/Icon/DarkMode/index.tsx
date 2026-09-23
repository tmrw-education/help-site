import React, { type ComponentProps } from 'react';
import { Asleep } from '@carbon/icons-react';

// Carbon icon swap for the color-mode toggle (dark).
export default function IconDarkMode(props: ComponentProps<'svg'>): React.JSX.Element {
  return <Asleep {...props} />;
}
