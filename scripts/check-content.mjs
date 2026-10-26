// Content rules the build enforces, so only live, real, consistently keyed pages are published.
// Runs as `prebuild`: any failure stops the build, and deploy.yml publishes only after a passing build.
// Authors' version of these rules: CONTRIBUTING.md in the content repo (§3 ids, §10 publishing).
//
// Every published (non-draft) page in a product folder must:
//   - have content: not just front matter and a title;
//   - not carry an author's "VERIFY BEFORE PUBLISHING" note (written from a demo, not yet checked);
//   - if it's an article, have an `id` with no product code in it: the product comes from the
//     folder, so Felix and agents key a page as <product>/<id>.
// Anything inside a `{/* Hidden until … */}` block is ignored (content parked until it goes live).
import { readdirSync, readFileSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const CONTENT = process.env.CONTENT_DIR ?? '../help';
const MARKER = /VERIFY BEFORE PUBLISHING/i;
const SKIP_DIRS = new Set(['node_modules', 'build']); // plus every hidden folder (.git, .github, .claude)
// folder → product code; CE ids may end in "-ce" as wording ("sync to CE"), so CE has no code check
const CODES = { sxp: 'sxp', ess: 'ess', gxp: 'gxp', pxp: 'pxp', finops: 'fo', hr: 'hr', scm: 'scm', lxp: 'lxp' };
// pages that aren't tasks for Felix: section landings and single-page glossaries/troubleshooting
const NOT_AN_ARTICLE = /(^|[-/])(index|Glossary|Troubleshooting)\.mdx?$/;

// Files at the content root (README, CONTRIBUTING, the authoring rationale) aren't published, and the
// guide quotes the marker as an example, so only the product folders are checked.
function* markdownFiles(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (!SKIP_DIRS.has(entry.name) && !entry.name.startsWith('.')) yield* markdownFiles(join(dir, entry.name));
    } else if (dir !== CONTENT && /\.mdx?$/.test(entry.name) && entry.name.toLowerCase() !== 'readme.md') {
      yield join(dir, entry.name);
    }
  }
}

const failures = [];
for (const file of markdownFiles(CONTENT)) {
  const path = relative(CONTENT, file);
  const text = readFileSync(file, 'utf8');
  const fmEnd = text.startsWith('---\n') ? text.indexOf('\n---', 4) : -1;
  const frontMatter = fmEnd === -1 ? '' : text.slice(4, fmEnd);
  if (/^draft: true$/m.test(frontMatter)) continue;
  const body = (fmEnd === -1 ? text : text.slice(fmEnd + 4)).replace(/\{\/\*[\s\S]*?\*\/\}/g, '');
  const visible = text.replace(/\{\/\* Hidden until[\s\S]*?\*\/\}/g, '');

  if (!body.replace(/^#.*$/gm, '').trim()) failures.push([path, 'has no content: write it, or add `draft: true`']);
  if (MARKER.test(visible)) failures.push([path, 'says VERIFY BEFORE PUBLISHING: verify it and delete the note, or add `draft: true`']);

  if (NOT_AN_ARTICLE.test(path.split(sep).join('/'))) continue;
  const id = frontMatter.match(/^id: (\S+)\s*$/m)?.[1];
  const code = CODES[path.split(sep)[0]];
  if (!id) failures.push([path, 'has no `id`: add one (kebab-case, verb-first)']);
  else if (code && (id.startsWith(`${code}-`) || id.endsWith(`-${code}`)))
    failures.push([path, `id "${id}" contains the product code "${code}": drop it, the folder already says which product`]);
}

if (failures.length) {
  console.error(
    `\n[check-content] ${failures.length} problem(s) to fix before this can be published:\n` +
      failures.map(([f, why]) => `  - ${f} ${why}`).join('\n') +
      '\nSee CONTRIBUTING.md in the content repo.\n',
  );
  process.exit(1);
}
console.log('[check-content] all published pages pass');
