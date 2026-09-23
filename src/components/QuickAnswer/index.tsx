import React, { type ReactNode } from 'react';
import ErrorBoundary from '@docusaurus/ErrorBoundary';
import { useDoc } from '@docusaurus/plugin-content-docs/client';
import { Idea } from '@carbon/icons-react';

// Renders the article's `summary:` front matter (authored for Felix) as a
// "Quick answer" box under the title. Nothing renders when a doc has no summary.

// Summary lines use **bold** / *italic* markdown; render just those inline.
function inline(text: string): ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g).map((part, i) =>
    part.startsWith('**') ? <strong key={i}>{part.slice(2, -2)}</strong>
    : part.startsWith('*') && part.length > 2 ? <em key={i}>{part.slice(1, -1)}</em>
    : part,
  );
}

function Box(): ReactNode {
  const summary = (useDoc().frontMatter as { summary?: unknown }).summary;
  const lines = (Array.isArray(summary) ? summary : [summary]).filter(
    (s): s is string => typeof s === 'string' && s.trim() !== '',
  );
  if (!lines.length) return null;
  return (
    <section className="quick-answer" aria-label="Quick answer">
      <p className="quick-answer__title">
        <Idea size={16} aria-hidden /> Quick answer
      </p>
      <ul>
        {lines.map((l, i) => (
          <li key={i}>{inline(l)}</li>
        ))}
      </ul>
    </section>
  );
}

// useDoc() throws outside a doc page (e.g. an MDX page in src/pages) — render nothing there.
export default function QuickAnswer(): ReactNode {
  return <ErrorBoundary fallback={() => null}><Box /></ErrorBoundary>;
}
