// Fails the build when a published page still carries an author's "VERIFY BEFORE PUBLISHING"
// note: the page was written from a demo or intended behaviour and must be checked first.
// Runs as `prebuild`, so deploy.yml never publishes such a page. Draft pages are skipped, and so is
// anything inside a `{/* Hidden until … */}` block (content parked until its pages go live).
import { readdirSync, readFileSync } from 'node:fs';
import { join, relative } from 'node:path';

const CONTENT = process.env.CONTENT_DIR ?? '../help';
const MARKER = /VERIFY BEFORE PUBLISHING/i;
const SKIP_DIRS = new Set(['.git', '.github', 'node_modules', 'build']);

// Files at the content root (README, CONTRIBUTING, the authoring rationale) aren't published, and the
// guide quotes the marker as an example, so only the product folders are checked.
function* markdownFiles(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (!SKIP_DIRS.has(entry.name)) yield* markdownFiles(join(dir, entry.name));
    } else if (dir !== CONTENT && /\.mdx?$/.test(entry.name) && entry.name.toLowerCase() !== 'readme.md') {
      yield join(dir, entry.name);
    }
  }
}

const failures = [];
for (const file of markdownFiles(CONTENT)) {
  const text = readFileSync(file, 'utf8');
  const frontMatter = text.startsWith('---\n') ? text.slice(4, text.indexOf('\n---', 4)) : '';
  if (/^draft: true$/m.test(frontMatter)) continue;
  const visible = text.replace(/\{\/\* Hidden until[\s\S]*?\*\/\}/g, '');
  if (MARKER.test(visible)) failures.push(relative(CONTENT, file));
}

if (failures.length) {
  console.error(
    `\n[check-content] ${failures.length} published page(s) still say "VERIFY BEFORE PUBLISHING":\n` +
      failures.map((f) => `  - ${f}`).join('\n') +
      '\nVerify the page and delete the note, or add `draft: true` to its front matter.\n',
  );
  process.exit(1);
}
console.log('[check-content] no unverified published pages');
