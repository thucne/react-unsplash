// ============================================================
// react-unsplash — Main Entry Point
// ============================================================

// Default export — flat-props API
export { default } from './components/ReactUnsplash';
export { default as ReactUnsplash } from './components/ReactUnsplash';

// Compound component API exports
export { UnsplashRoot } from './components/ReactUnsplash/context';
export { UnsplashSearch } from './components/ReactUnsplash/SearchInput';
export { UnsplashGrid } from './components/ReactUnsplash/ImageGrid';
export { UnsplashDialog } from './components/ReactUnsplash/Dialog';
export { UnsplashEmptyState, UnsplashAutoEmptyState } from './components/ReactUnsplash/EmptyState';

// Hooks (useful for custom layouts)
export { useUnsplashContext } from './components/ReactUnsplash/context';
export { useResizeObserver, useIntersectionObserver } from './components/ReactUnsplash/hooks';

// Types
export type {
  // Unsplash API types
  UnsplashPhoto,
  UnsplashUser,
  UnsplashUrls,
  UnsplashPhotoLinks,
  UnsplashUserLinks,
  UnsplashProfileImage,
  UnsplashTag,
  UnsplashTagSource,
  UnsplashTagAncestry,
  // Component prop types
  ReactUnsplashProps,
  ReactUnsplashClassNames,
  ReactUnsplashSlots,
  ImageRenderProps,
  LinkRenderProps,
} from './components/ReactUnsplash/types';
