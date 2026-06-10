import MDXComponents from '@theme-original/MDXComponents';
import { Steps, Step, StepDetail } from '@site/src/components/Steps';

// Make custom doc components available in every .md / .mdx without an import.
export default {
  ...MDXComponents,
  Steps,
  Step,
  StepDetail,
};
