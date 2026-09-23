import React, { type ComponentProps } from 'react';
import MDXComponents from '@theme-original/MDXComponents';
import { Steps, Step, StepDetail } from '@site/src/components/Steps';
import ZoomImage from '@site/src/components/ZoomImage';
import QuickAnswer from '@site/src/components/QuickAnswer';

const H1 = MDXComponents.h1;

// Make custom doc components available in every .md / .mdx without an import.
export default {
  ...MDXComponents,
  // The article title is followed by its Quick answer (from `summary:` front matter).
  h1: (props: ComponentProps<'h1'>) => (
    <>
      <H1 {...props} />
      <QuickAnswer />
    </>
  ),
  // Every markdown image becomes click-to-zoom.
  img: ZoomImage,
  Steps,
  Step,
  StepDetail,
};
