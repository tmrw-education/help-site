import React, { useEffect, type ReactNode } from 'react';
import { PhotoProvider } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';

// Hide images that fail to load (docs reference some missing 99-Images/* files)
// so they don't render as broken-image boxes. Real fix is adding the files.
export default function Root({ children }: { children: ReactNode }): React.JSX.Element {
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
  // One provider for the whole app; each doc image is a <PhotoView> (see ZoomImage).
  // Near-black backdrop + zoom/pan toolbar, à la Linear's docs lightbox.
  return (
    <PhotoProvider maskOpacity={0.96} pullClosable bannerVisible>
      {children}
    </PhotoProvider>
  );
}
