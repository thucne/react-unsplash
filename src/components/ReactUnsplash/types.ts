import type { CSSProperties, ReactNode } from 'react';

// ============================================================
// Unsplash API Types
// ============================================================

export interface UnsplashUrls {
  raw: string;
  full: string;
  regular: string;
  small: string;
  thumb: string;
  small_s3?: string;
}

export interface UnsplashPhotoLinks {
  self: string;
  html: string;
  download: string;
  download_location: string;
}

export interface UnsplashUserLinks {
  self: string;
  html: string;
  photos: string;
  likes: string;
  portfolio: string;
  following?: string;
  followers?: string;
}

export interface UnsplashProfileImage {
  small: string;
  medium: string;
  large: string;
}

export interface UnsplashUserSocial {
  instagram_username?: string | null;
  portfolio_url?: string | null;
  twitter_username?: string | null;
  paypal_email?: string | null;
}

export interface UnsplashUser {
  id: string;
  username: string;
  name: string;
  first_name?: string;
  last_name?: string | null;
  bio?: string | null;
  location?: string | null;
  portfolio_url?: string | null;
  twitter_username?: string | null;
  instagram_username?: string | null;
  total_photos?: number;
  total_likes?: number;
  total_collections?: number;
  links: UnsplashUserLinks;
  profile_image: UnsplashProfileImage;
  social?: UnsplashUserSocial;
  for_hire?: boolean;
  accepted_tos?: boolean;
  updated_at?: string;
}

export interface UnsplashTagAncestry {
  type?: { slug: string; pretty_slug: string };
  category?: { slug: string; pretty_slug: string };
  subcategory?: { slug: string; pretty_slug: string };
}

export interface UnsplashTagSource {
  ancestry?: UnsplashTagAncestry;
  title?: string;
  subtitle?: string;
  description?: string;
  meta_title?: string;
  meta_description?: string;
}

export interface UnsplashTag {
  type: string;
  title: string;
  source?: UnsplashTagSource;
}

export interface UnsplashPhoto {
  id: string;
  slug?: string;
  created_at?: string;
  updated_at?: string;
  promoted_at?: string | null;
  width: number;
  height: number;
  color?: string;
  blur_hash?: string;
  description?: string | null;
  alt_description?: string | null;
  urls: UnsplashUrls;
  links?: UnsplashPhotoLinks;
  likes?: number;
  liked_by_user?: boolean;
  user: UnsplashUser;
  tags?: UnsplashTag[];
  asset_type?: string;
  topic_submissions?: Record<string, unknown>;
  current_user_collections?: unknown[];
  sponsorship?: unknown;
}

// ============================================================
// Component Customization Types
// ============================================================

export interface ImageRenderProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  loading?: 'lazy' | 'eager';
  style?: CSSProperties;
  className?: string;
  onClick?: () => void;
  /** base64 encoded blur placeholder */
  placeholder?: string;
  'data-photo-id'?: string;
}

export interface LinkRenderProps {
  href: string;
  children: ReactNode;
  target?: string;
  rel?: string;
  className?: string;
  style?: CSSProperties;
}

/** Override class names for each part of the component */
export interface ReactUnsplashClassNames {
  /** The outermost container */
  root?: string;
  /** The search input wrapper */
  searchWrapper?: string;
  /** The search <input> element */
  searchInput?: string;
  /** The progress bar shown while loading */
  loadingBar?: string;
  /** The masonry image grid container */
  imageGrid?: string;
  /** Each individual image item wrapper */
  imageItem?: string;
  /** The overlay shown on hover over an image */
  imageOverlay?: string;
  /** The author link below each image */
  authorLink?: string;
  /** The dialog/modal wrapper (popup mode) */
  dialog?: string;
  /** The "Load More" button or scroll trigger container */
  loadMore?: string;
  /** The empty/no-results state container */
  emptyState?: string;
}

/** Custom render slots for replacing internal UI pieces */
export interface ReactUnsplashSlots {
  /** Shown when no search has been entered yet */
  emptyState?: ReactNode;
  /** Shown when search returns no results */
  noResults?: ReactNode;
  /** Shown in the loading bar area while fetching */
  loadingState?: ReactNode;
  /**
   * Custom "Load More" button. Receives onClick and loading state.
   * Only used when loadMode="button".
   */
  loadMoreButton?: (props: { onClick: () => void; loading: boolean }) => ReactNode;
  /**
   * Custom overlay rendered on top of each image.
   * Receives the full UnsplashPhoto object.
   */
  imageOverlay?: (photo: UnsplashPhoto) => ReactNode;
  /** Replaces the search icon (start adornment) */
  searchIcon?: ReactNode;
}

// ============================================================
// Main Component Props
// ============================================================

export interface ReactUnsplashProps {
  // --- Core ---
  /** Array of Unsplash photo objects */
  images?: UnsplashPhoto[];
  /** Called when a photo is clicked/selected */
  onSelect: (photo: UnsplashPhoto) => void;

  // --- Search ---
  /** Initial search value; triggers onSearch on mount */
  initValue?: string;
  /** Called on every keystroke (debounce recommended) */
  onSearch?: (value: string) => void;
  /** Called when Enter is pressed */
  onCommit?: (value: string) => void;
  /** Max characters allowed in the search input */
  maxSearchLength?: number;
  /** Placeholder text for the search input */
  searchPlaceholder?: string;

  // --- State ---
  /** Whether a search/fetch is in progress */
  loading?: boolean;

  // --- Pagination ---
  /** Whether more pages are available */
  hasMore?: boolean;
  /** Called to load the next page */
  handleLoadMore?: () => void;
  /** How to trigger loading more: infinite scroll or button click */
  loadMode?: 'scroll' | 'button';

  // --- Layout ---
  /** Normal inline display or popup modal */
  displayMode?: 'normal' | 'popup';
  /** Whether the popup is open (required when displayMode="popup") */
  open?: boolean;
  /** Called when the popup requests to close */
  onClose?: () => void;
  /** Number of columns in the masonry grid (auto-calculated if omitted) */
  cols?: number;
  /** Gap between images in pixels */
  gap?: number;
  /** Fixed width of the component */
  width?: number;
  /** Fixed height of the image grid area */
  height?: number;
  /** Auto-focus the search input on mount */
  autoFocus?: boolean;

  // --- Custom Renderers ---
  /**
   * Inject a custom image component (e.g., next/image).
   * Falls back to native <img> if not provided.
   */
  renderImage?: (props: ImageRenderProps) => ReactNode;
  /**
   * Inject a custom link component (e.g., next/link).
   * Falls back to native <a> if not provided.
   */
  renderLink?: (props: LinkRenderProps) => ReactNode;

  // --- Styling ---
  /** Additional class name on the root element */
  className?: string;
  /** Override class names for each internal part */
  classNames?: ReactUnsplashClassNames;
  /** Custom CSS variables to override the default theme */
  style?: CSSProperties;
  /** Slot overrides for internal UI elements */
  slots?: ReactUnsplashSlots;
}
