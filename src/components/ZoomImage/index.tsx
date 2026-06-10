import React, { useEffect, useRef, type ComponentProps } from 'react';
import mediumZoom from 'medium-zoom';
import type { Zoom } from 'medium-zoom';
import 'medium-zoom/dist/style.css';
import { useColorMode } from '@docusaurus/theme-common';
import styles from './styles.module.css';

// Click a doc screenshot to zoom it to fit the screen; click again (or scroll /
// Esc) to zoom back. No toolbar, arrows, or close button — the Linear-docs feel.
export default function ZoomImage(props: ComponentProps<'img'>): React.JSX.Element {
  const ref = useRef<HTMLImageElement>(null);
  const zoomRef = useRef<Zoom | null>(null);
  const { colorMode } = useColorMode();

  useEffect(() => {
    if (!ref.current) return;
    zoomRef.current = mediumZoom(ref.current, { margin: 32 });
    return () => {
      zoomRef.current?.detach();
    };
  }, []);

  // Near-black backdrop, matched to the theme.
  useEffect(() => {
    zoomRef.current?.update({
      background: colorMode === 'dark' ? 'rgba(13,16,23,0.96)' : 'rgba(0,0,0,0.92)',
    });
  }, [colorMode]);

  return (
    <img
      ref={ref}
      loading="lazy"
      {...props}
      className={[styles.zoomImage, props.className].filter(Boolean).join(' ')}
    />
  );
}
