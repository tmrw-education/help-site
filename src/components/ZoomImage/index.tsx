import React, { useEffect, useRef, useState, type ComponentProps } from 'react';
import mediumZoom from 'medium-zoom';
import type { Zoom } from 'medium-zoom';
import 'medium-zoom/dist/style.css';
import { useColorMode } from '@docusaurus/theme-common';
import { useLocation } from '@docusaurus/router';
import { Image as ImageIcon } from '@carbon/icons-react';
import styles from './styles.module.css';

// The gradient mat accent follows the app (by route): /sxp, /ess→ESS, /fo→F&O,
// /pxp, /lxp, /hr, /scm. So every screenshot is automatically tinted to its app's brand.
function appFromPath(pathname: string): 'sxp' | 'ess' | 'fno' | 'pxp' | 'lxp' | 'hr' | 'scm' {
  if (pathname.startsWith('/ess')) return 'ess';
  if (pathname.startsWith('/fo')) return 'fno';
  if (pathname.startsWith('/pxp')) return 'pxp';
  if (pathname.startsWith('/lxp')) return 'lxp';
  if (pathname.startsWith('/hr')) return 'hr';
  if (pathname.startsWith('/scm')) return 'scm';
  return 'sxp';
}

// Click a doc screenshot to zoom it to fit the screen; click again (or scroll /
// Esc) to zoom back. No toolbar, arrows, or close button — the Linear-docs feel.
export default function ZoomImage(props: ComponentProps<'img'>): React.JSX.Element {
  const ref = useRef<HTMLImageElement>(null);
  const zoomRef = useRef<Zoom | null>(null);
  const { colorMode } = useColorMode();
  const [failed, setFailed] = useState(false);

  // Missing screenshot → designed placeholder, not a broken-image icon. Also catches
  // images that failed before hydration (complete, but no pixels).
  useEffect(() => {
    const img = ref.current;
    if (img && img.complete && img.naturalWidth === 0) setFailed(true);
  }, []);

  useEffect(() => {
    if (!ref.current || failed) return;
    zoomRef.current = mediumZoom(ref.current, { margin: 32 });
    return () => {
      zoomRef.current?.detach();
    };
  }, [failed]);

  // Near-black backdrop, matched to the theme.
  useEffect(() => {
    zoomRef.current?.update({
      background: colorMode === 'dark' ? 'rgba(13,16,23,0.96)' : 'rgba(0,0,0,0.92)',
    });
  }, [colorMode]);

  // Default treatment = screenshot floating on the app's brand gradient mat
  // (Linear-style), applied automatically in CSS. Authors can opt out per image
  // with `"plain"` as the markdown image title, e.g. ![alt](x.png "plain").
  const { pathname } = useLocation();
  const { title, ...imgProps } = props;
  const plain = title === 'plain';
  const frameClass = plain
    ? styles.framePlain
    : `${styles.frame} ${styles[appFromPath(pathname)]}`;

  if (failed) {
    return (
      <span className={styles.placeholder} role="note">
        <ImageIcon size={24} aria-hidden />
        <span>
          <strong>Screenshot coming soon</strong>
          <span>The steps are complete without it.</span>
        </span>
      </span>
    );
  }

  return (
    <span className={frameClass}>
      <img
        ref={ref}
        loading="lazy"
        {...imgProps}
        onError={() => setFailed(true)}
        className={[styles.zoomImage, props.className].filter(Boolean).join(' ')}
      />
    </span>
  );
}
