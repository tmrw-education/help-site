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
        const items = node.children || [];
        children[i] = {
          type: 'mdxJsxFlowElement',
          name: 'Steps',
          attributes: [],
          children: items.map((item, idx) => ({
            type: 'mdxJsxFlowElement',
            name: 'Step',
            // The last step is the result — give it the inverse (filled) marker.
            attributes:
              idx === items.length - 1
                ? [{ type: 'mdxJsxAttribute', name: 'final', value: null }]
                : [],
            children: item.children || [],
          })),
        };
      }
    }
  };
}
