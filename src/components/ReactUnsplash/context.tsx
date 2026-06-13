'use client';
import React, { createContext, useContext, useMemo } from 'react';
import type {
  ReactUnsplashProps,
  UnsplashPhoto,
  ImageRenderProps,
  LinkRenderProps,
  ReactUnsplashClassNames,
  ReactUnsplashSlots,
} from './types';

// ============================================================
// Context
// ============================================================

interface UnsplashContextValue {
  images: UnsplashPhoto[];
  onSelect: (photo: UnsplashPhoto) => void;
  loading: boolean;
  hasMore: boolean;
  handleLoadMore?: () => void;
  loadMode: 'scroll' | 'button';
  cols?: number;
  gap?: number;
  height?: number;
  width?: number;
  renderImage?: (props: ImageRenderProps) => React.ReactNode;
  renderLink?: (props: LinkRenderProps) => React.ReactNode;
  classNames: ReactUnsplashClassNames;
  slots: ReactUnsplashSlots;
  autoFocus: boolean;
  maxSearchLength: number;
  searchPlaceholder: string;
  onSearch?: (value: string) => void;
  onCommit?: (value: string) => void;
  initValue: string;
  isPopUp: boolean;
  onClose: () => void;
}

const UnsplashContext = createContext<UnsplashContextValue | null>(null);

export function useUnsplashContext(): UnsplashContextValue {
  const ctx = useContext(UnsplashContext);
  if (!ctx) {
    throw new Error('useUnsplashContext must be used inside <UnsplashRoot>');
  }
  return ctx;
}

// ============================================================
// UnsplashRoot — Context Provider
// ============================================================

export interface UnsplashRootProps
  extends Pick<
    ReactUnsplashProps,
    | 'images'
    | 'onSelect'
    | 'loading'
    | 'hasMore'
    | 'handleLoadMore'
    | 'loadMode'
    | 'cols'
    | 'gap'
    | 'height'
    | 'width'
    | 'renderImage'
    | 'renderLink'
    | 'classNames'
    | 'slots'
    | 'autoFocus'
    | 'maxSearchLength'
    | 'searchPlaceholder'
    | 'onSearch'
    | 'onCommit'
    | 'initValue'
    | 'onClose'
  > {
  children: React.ReactNode;
  isPopUp?: boolean;
}

export function UnsplashRoot({
  children,
  images = [],
  onSelect,
  loading = false,
  hasMore = false,
  handleLoadMore,
  loadMode = 'scroll',
  cols,
  gap,
  height,
  width,
  renderImage,
  renderLink,
  classNames = {},
  slots = {},
  autoFocus = true,
  maxSearchLength = 64,
  searchPlaceholder = 'Search photos...',
  onSearch,
  onCommit,
  initValue = '',
  isPopUp = false,
  onClose = () => {},
}: UnsplashRootProps) {
  const value = useMemo<UnsplashContextValue>(
    () => ({
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
      isPopUp,
      onClose,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [images, loading, hasMore, loadMode, cols, gap, height, width, isPopUp]
  );

  return (
    <UnsplashContext.Provider value={value}>
      {children}
    </UnsplashContext.Provider>
  );
}
