import React, { type ComponentProps } from 'react';
import { Edit } from '@carbon/icons-react';

// Carbon icon swap for the "edit this page" pencil.
export default function IconEdit(props: ComponentProps<'svg'>): JSX.Element {
  return <Edit {...props} />;
}
