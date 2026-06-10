import { useEffect, useRef, type ComponentProps } from 'react';
import mediumZoom from 'medium-zoom';
import type { Zoom } from 'medium-zoom';
import { useColorMode } from '@docusaurus/theme-common';
import styles from './styles.module.css';

// Doc screenshots are dense full-canvas D365 captures whose numbered callouts
// are hard to read at column width. Click to expand them fullscreen.
export default function ZoomImage(props: ComponentProps<'img'>): JSX.Element {
  const ref = useRef<HTMLImageElement>(null);
  const zoomRef = useRef<Zoom | null>(null);
  const { colorMode } = useColorMode();

  useEffect(() => {
    if (!ref.current) return;
    zoomRef.current = mediumZoom(ref.current, { margin: 24 });
    return () => zoomRef.current?.detach();
  }, []);

  // Match the backdrop to the theme so light screenshots stay readable in dark mode.
  useEffect(() => {
    zoomRef.current?.update({
      background: colorMode === 'dark' ? 'rgba(13,16,23,0.92)' : 'rgba(0,0,0,0.85)',
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
