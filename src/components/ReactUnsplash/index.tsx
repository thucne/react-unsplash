'use client';
import React from 'react';
import { UnsplashRoot, useUnsplashContext } from './context';
import { UnsplashSearch } from './SearchInput';
import { UnsplashGrid } from './ImageGrid';
import { UnsplashDialog } from './Dialog';
import { UnsplashAutoEmptyState } from './EmptyState';
import { cn } from './helpers';
import type { ReactUnsplashProps } from './types';
import '../../styles/react-unsplash.css';

// ============================================================
// Inner layout (used in both normal and popup mode)
// ============================================================

function LoadingBar() {
  const { loading, classNames } = useUnsplashContext();
  return (
    <div
      className={cn('ru-loading-bar-track', !loading && 'ru-loading-bar-hidden', classNames.loadingBar)}
      role="progressbar"
      aria-hidden={!loading}
      aria-label="Loading"
    >
      {loading && <div className="ru-loading-bar-fill" />}
    </div>
  );
}

function UnsplashInner({ width }: { width?: number; isPopUp: boolean }) {
  return (
    <div
      className="react-unsplash"
      style={width ? { width, maxWidth: '100%' } : undefined}
    >
      <UnsplashSearch />
      <LoadingBar />
      <UnsplashAutoEmptyState />
      <UnsplashGrid />
    </div>
  );
}

// ============================================================
// ReactUnsplash — Main flat-props component
// ============================================================

/**
 * `ReactUnsplash` — the primary, all-in-one component.
 *
 * Supports both `normal` (inline) and `popup` display modes.
 * All props are fully typed with TypeScript.
 *
 * @example
 * ```tsx
 * <ReactUnsplash
 *   images={photos}
 *   onSelect={(photo) => console.log(photo)}
 *   onSearch={fetchPhotos}
 *   hasMore={hasNextPage}
 *   handleLoadMore={loadNext}
 * />
 * ```
 */
const ReactUnsplash = ({
  // Core
  images = [],
  onSelect,
  // Search
  initValue = '',
  onSearch,
  onCommit,
  maxSearchLength = 64,
  searchPlaceholder = 'Search photos...',
  // State
  loading = false,
  // Pagination
  hasMore = false,
  handleLoadMore,
  loadMode = 'scroll',
  // Layout
  displayMode = 'normal',
  open = false,
  onClose = () => {},
  cols,
  gap,
  width,
  height,
  autoFocus = true,
  // Custom renderers
  renderImage,
  renderLink,
  // Styling
  className,
  classNames = {},
  style,
  slots = {},
}: ReactUnsplashProps) => {
  const rootProps = {
    images,
    onSelect,
    loading,
    hasMore,
    handleLoadMore,
    loadMode,
    cols,
    gap,
    height,
    width,
    renderImage,
    renderLink,
    classNames,
    slots,
    autoFocus,
    maxSearchLength,
    searchPlaceholder,
    onSearch,
    onCommit,
    initValue,
    onClose,
  };

  if (displayMode === 'popup') {
    return (
      <UnsplashRoot {...rootProps} isPopUp>
        <UnsplashDialog
          open={open}
          onClose={onClose}
          width={width}
          className={cn(classNames.dialog, className)}
        >
          <UnsplashInner isPopUp width={width} />
        </UnsplashDialog>
      </UnsplashRoot>
    );
  }

  return (
    <UnsplashRoot {...rootProps} isPopUp={false}>
      <div
        className={cn(className)}
        style={{ width: width ?? '100%', maxWidth: '100%', ...style }}
      >
        <UnsplashInner isPopUp={false} width={width} />
      </div>
    </UnsplashRoot>
  );
};

export default ReactUnsplash;
