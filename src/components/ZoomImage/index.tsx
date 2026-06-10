import React, { type ComponentProps } from 'react';
import { PhotoView } from 'react-photo-view';
import styles from './styles.module.css';

// Doc screenshots are dense full-canvas D365 captures whose numbered callouts
// are hard to read at column width. Click to open a fullscreen lightbox that
// supports scroll/pinch zoom and drag-to-pan (see PhotoProvider in Root).
export default function ZoomImage(props: ComponentProps<'img'>): React.JSX.Element {
  const { src, alt, className } = props;
  return (
    <PhotoView src={typeof src === 'string' ? src : undefined}>
      <img
        loading="lazy"
        {...props}
        alt={alt}
        className={[styles.zoomImage, className].filter(Boolean).join(' ')}
      />
    </PhotoView>
  );
}
