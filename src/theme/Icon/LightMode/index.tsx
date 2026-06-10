import React, { type ComponentProps } from 'react';
import { Light } from '@carbon/icons-react';

// Carbon icon swap for the color-mode toggle (light).
export default function IconLightMode(props: ComponentProps<'svg'>): JSX.Element {
  return <Light {...props} />;
}
