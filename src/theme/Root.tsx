import React, { useEffect, type ReactNode } from 'react';

// Hide images that fail to load (docs reference some missing 99-Images/* files)
// so they don't render as broken-image boxes. Real fix is adding the files.
export default function Root({ children }: { children: ReactNode }): JSX.Element {
  useEffect(() => {
    const onError = (e: Event) => {
      const t = e.target as HTMLElement | null;
      if (t && t.tagName === 'IMG') {
        (t as HTMLImageElement).style.display = 'none';
      }
    };
    // capture phase — image error events don't bubble
    document.addEventListener('error', onError, true);
    return () => document.removeEventListener('error', onError, true);
  }, []);
  return <>{children}</>;
}
