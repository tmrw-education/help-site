/**
 * remark plugin: render every top-level **ordered** list as the <Steps> stepper.
 *
 * Trainers keep writing plain markdown numbered lists — no JSX. Each list item
 * becomes a <Step>; the <Step> component lifts the item's first paragraph into
 * the step title and treats the rest (notes, screenshots) as the step body.
 *
 *   1. Open the form          ← becomes the step title
 *
 *      Detail with **bold**.  ← indented → step body
 *      ![shot](./99-Images/x.png)
 *
 * Unordered (bulleted) lists are left untouched.
 */
export default function remarkSteps() {
  return (tree) => {
    const children = tree.children;
    if (!Array.isArray(children)) return;
    for (let i = 0; i < children.length; i++) {
      const node = children[i];
      if (node && node.type === 'list' && node.ordered) {
        children[i] = {
          type: 'mdxJsxFlowElement',
          name: 'Steps',
          attributes: [],
          children: (node.children || []).map((item) => ({
            type: 'mdxJsxFlowElement',
            name: 'Step',
            attributes: [],
            children: item.children || [],
          })),
        };
      }
    }
  };
}
