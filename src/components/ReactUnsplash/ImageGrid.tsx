'use client';
import React, { useRef } from 'react';
import { useUnsplashContext } from './context';
import { useResizeObserver, useIntersectionObserver } from './hooks';
import { blurHashToDataURL, getResponsiveCols, cn } from './helpers';
import type { UnsplashPhoto } from './types';

// ============================================================
// Scroll sentinel for infinite scroll
// ============================================================

interface ScrollSentinelProps {
  onVisible: () => void;
  enabled: boolean;
}

function ScrollSentinel({ onVisible, enabled }: ScrollSentinelProps) {
  const ref = useRef<HTMLDivElement>(null);
  useIntersectionObserver(ref, onVisible, { enabled, threshold: 0.1 });
  return <div ref={ref} className="ru-scroll-sentinel" aria-hidden="true" />;
}

// ============================================================
// Single image item
// ============================================================

interface ImageItemProps {
  photo: UnsplashPhoto;
  containerWidth: number;
  isLast: boolean;
}

function ImageItem({ photo, containerWidth, isLast }: ImageItemProps) {
  const { onSelect, renderImage, renderLink, slots, classNames, hasMore, handleLoadMore, loadMode, loading } =
    useUnsplashContext();

  const itemWidth = containerWidth > 0 ? containerWidth : 200;
  const itemHeight = photo.height && photo.width
    ? Math.round((itemWidth * photo.height) / photo.width)
    : itemWidth;

  const placeholder =
    photo.blur_hash ? blurHashToDataURL(photo.blur_hash) : undefined;

  const authorHref = photo.user?.links?.html ?? '#';
  const authorName = photo.user?.name ?? '';
  const altText = photo.alt_description ?? photo.description ?? '';

  const imageProps = {
    src: photo.urls?.small ?? photo.urls?.thumb ?? photo.urls?.regular ?? '',
    alt: altText,
    width: itemWidth,
    height: itemHeight,
    loading: 'lazy' as const,
    style: { width: '100%', height: 'auto', display: 'block' },
    onClick: () => onSelect(photo),
    placeholder,
    'data-photo-id': photo.id,
  };

  const linkProps = {
    href: authorHref,
    target: '_blank',
    rel: 'noopener noreferrer',
    className: 'ru-author-link',
    children: authorName,
  };

  return (
    <div className={cn('ru-image-item', classNames.imageItem)}>
      {/* The image */}
      {renderImage ? renderImage(imageProps) : (
        <img
          src={imageProps.src}
          alt={imageProps.alt}
          width={imageProps.width}
          height={imageProps.height}
          loading={imageProps.loading}
          style={imageProps.style}
          onClick={imageProps.onClick}
          data-photo-id={imageProps['data-photo-id']}
        />
      )}

      {/* Author overlay */}
      <div className={cn('ru-author-overlay', classNames.imageOverlay)}>
        {renderLink ? renderLink(linkProps) : (
          <a
            href={linkProps.href}
            target={linkProps.target}
            rel={linkProps.rel}
            className={cn(linkProps.className, classNames.authorLink)}
            onClick={(e) => e.stopPropagation()}
          >
            {authorName}
          </a>
        )}
      </div>

      {/* Custom overlay slot */}
      {slots.imageOverlay && (
        <div className="ru-image-custom-overlay">
          {slots.imageOverlay(photo)}
        </div>
      )}

      {/* Invisible sentinel on last item for infinite scroll */}
      {isLast && loadMode === 'scroll' && (
        <ScrollSentinel
          onVisible={() => !loading && hasMore && handleLoadMore?.()}
          enabled={hasMore && !loading}
        />
      )}
    </div>
  );
}

// ============================================================
// UnsplashGrid — Main Export
// ============================================================

export interface UnsplashGridProps {
  /** Override columns (takes priority over auto-responsive) */
  cols?: number;
  /** Gap between images in pixels */
  gap?: number;
  /** Fixed height of the scrollable area */
  height?: number;
  /** Extra class name on the scroll wrapper */
  className?: string;
}

export function UnsplashGrid({ cols, gap, height, className }: UnsplashGridProps) {
  const ctx = useUnsplashContext();
  const {
    images,
    loading,
    hasMore,
    handleLoadMore,
    loadMode,
    classNames,
    slots,
  } = ctx;

  const gridRef = useRef<HTMLDivElement>(null);
  const { width: containerWidth } = useResizeObserver(gridRef);

  // Resolve columns
  const resolvedCols = cols ?? ctx.cols ?? getResponsiveCols(containerWidth);
  const resolvedGap = gap ?? ctx.gap ?? 8;
  const resolvedHeight = height ?? ctx.height ?? 450;

  if (!images || images.length === 0) return null;

  return (
    <div
      className={cn('ru-image-grid-scroll', classNames.imageGrid, className)}
      style={{ height: resolvedHeight }}
    >
      <div
        ref={gridRef}
        className="ru-image-grid"
        style={{
          '--ru-cols': resolvedCols,
          '--ru-gap': `${resolvedGap}px`,
        } as React.CSSProperties}
      >
        {images.map((photo, idx) => (
          <ImageItem
            key={photo.id}
            photo={photo}
            containerWidth={containerWidth > 0 ? Math.floor(containerWidth / resolvedCols) - resolvedGap : 0}
            isLast={idx === images.length - 1}
          />
        ))}
      </div>

      {/* Loading state (while fetching next page) */}
      {loading && (
        <div className="ru-loading-state">
          {slots.loadingState ?? 'Loading...'}
        </div>
      )}

      {/* Load more button mode */}
      {hasMore && loadMode === 'button' && (
        <div className={cn('ru-load-more', classNames.loadMore)}>
          {slots.loadMoreButton ? (
            slots.loadMoreButton({
              onClick: () => handleLoadMore?.(),
              loading: loading ?? false,
            })
          ) : (
            <button
              type="button"
              className="ru-load-more-btn"
              disabled={loading}
              onClick={() => handleLoadMore?.()}
            >
              {loading ? 'Loading...' : 'More photos'}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

// Named export for compound component pattern
export default UnsplashGrid;
