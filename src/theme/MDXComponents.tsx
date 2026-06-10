import MDXComponents from '@theme-original/MDXComponents';
import { Steps, Step, StepDetail } from '@site/src/components/Steps';
import ZoomImage from '@site/src/components/ZoomImage';

// Make custom doc components available in every .md / .mdx without an import.
export default {
  ...MDXComponents,
  // Every markdown image becomes click-to-zoom.
  img: ZoomImage,
  Steps,
  Step,
  StepDetail,
};
