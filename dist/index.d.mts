import * as react_jsx_runtime from 'react/jsx-runtime';
import React$1, { CSSProperties, ReactNode } from 'react';

interface UnsplashUrls {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
    small_s3?: string;
}
interface UnsplashPhotoLinks {
    self: string;
    html: string;
    download: string;
    download_location: string;
}
interface UnsplashUserLinks {
    self: string;
    html: string;
    photos: string;
    likes: string;
    portfolio: string;
    following?: string;
    followers?: string;
}
interface UnsplashProfileImage {
    small: string;
    medium: string;
    large: string;
}
interface UnsplashUserSocial {
    instagram_username?: string | null;
    portfolio_url?: string | null;
    twitter_username?: string | null;
    paypal_email?: string | null;
}
interface UnsplashUser {
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
interface UnsplashTagAncestry {
    type?: {
        slug: string;
        pretty_slug: string;
    };
    category?: {
        slug: string;
        pretty_slug: string;
    };
    subcategory?: {
        slug: string;
        pretty_slug: string;
    };
}
interface UnsplashTagSource {
    ancestry?: UnsplashTagAncestry;
    title?: string;
    subtitle?: string;
    description?: string;
    meta_title?: string;
    meta_description?: string;
}
interface UnsplashTag {
    type: string;
    title: string;
    source?: UnsplashTagSource;
}
interface UnsplashPhoto {
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
interface ImageRenderProps {
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
interface LinkRenderProps {
    href: string;
    children: ReactNode;
    target?: string;
    rel?: string;
    className?: string;
    style?: CSSProperties;
}
/** Override class names for each part of the component */
interface ReactUnsplashClassNames {
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
interface ReactUnsplashSlots {
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
    loadMoreButton?: (props: {
        onClick: () => void;
        loading: boolean;
    }) => ReactNode;
    /**
     * Custom overlay rendered on top of each image.
     * Receives the full UnsplashPhoto object.
     */
    imageOverlay?: (photo: UnsplashPhoto) => ReactNode;
    /** Replaces the search icon (start adornment) */
    searchIcon?: ReactNode;
}
interface ReactUnsplashProps {
    /** Array of Unsplash photo objects */
    images?: UnsplashPhoto[];
    /** Called when a photo is clicked/selected */
    onSelect: (photo: UnsplashPhoto) => void;
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
    /** Whether a search/fetch is in progress */
    loading?: boolean;
    /** Whether more pages are available */
    hasMore?: boolean;
    /** Called to load the next page */
    handleLoadMore?: () => void;
    /** How to trigger loading more: infinite scroll or button click */
    loadMode?: 'scroll' | 'button';
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
    /** Additional class name on the root element */
    className?: string;
    /** Override class names for each internal part */
    classNames?: ReactUnsplashClassNames;
    /** Custom CSS variables to override the default theme */
    style?: CSSProperties;
    /** Slot overrides for internal UI elements */
    slots?: ReactUnsplashSlots;
}

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
declare const ReactUnsplash: ({ images, onSelect, initValue, onSearch, onCommit, maxSearchLength, searchPlaceholder, loading, hasMore, handleLoadMore, loadMode, displayMode, open, onClose, cols, gap, width, height, autoFocus, renderImage, renderLink, className, classNames, style, slots, }: ReactUnsplashProps) => react_jsx_runtime.JSX.Element;

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
    renderImage?: (props: ImageRenderProps) => React$1.ReactNode;
    renderLink?: (props: LinkRenderProps) => React$1.ReactNode;
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
declare function useUnsplashContext(): UnsplashContextValue;
interface UnsplashRootProps extends Pick<ReactUnsplashProps, 'images' | 'onSelect' | 'loading' | 'hasMore' | 'handleLoadMore' | 'loadMode' | 'cols' | 'gap' | 'height' | 'width' | 'renderImage' | 'renderLink' | 'classNames' | 'slots' | 'autoFocus' | 'maxSearchLength' | 'searchPlaceholder' | 'onSearch' | 'onCommit' | 'initValue' | 'onClose'> {
    children: React$1.ReactNode;
    isPopUp?: boolean;
}
declare function UnsplashRoot({ children, images, onSelect, loading, hasMore, handleLoadMore, loadMode, cols, gap, height, width, renderImage, renderLink, classNames, slots, autoFocus, maxSearchLength, searchPlaceholder, onSearch, onCommit, initValue, isPopUp, onClose, }: UnsplashRootProps): react_jsx_runtime.JSX.Element;

interface UnsplashSearchProps {
    /** Extra class name on the wrapper */
    className?: string;
}
declare function UnsplashSearch({ className }: UnsplashSearchProps): react_jsx_runtime.JSX.Element;

interface UnsplashGridProps {
    /** Override columns (takes priority over auto-responsive) */
    cols?: number;
    /** Gap between images in pixels */
    gap?: number;
    /** Fixed height of the scrollable area */
    height?: number;
    /** Extra class name on the scroll wrapper */
    className?: string;
}
declare function UnsplashGrid({ cols, gap, height, className }: UnsplashGridProps): react_jsx_runtime.JSX.Element | null;

interface UnsplashDialogProps {
    /** Whether the dialog is open */
    open: boolean;
    /** Called when dialog requests to close */
    onClose: () => void;
    children: React$1.ReactNode;
    /** Fixed width of the dialog panel */
    width?: number;
    /** Extra class name on the panel */
    className?: string;
}
/**
 * Popup dialog using the native <dialog> element.
 * Handles: ESC key, click-outside, scroll lock, ARIA.
 */
declare function UnsplashDialog({ open, onClose, children, width, className, }: UnsplashDialogProps): react_jsx_runtime.JSX.Element | null;

interface UnsplashEmptyStateProps {
    children?: React$1.ReactNode;
    className?: string;
}
declare function UnsplashEmptyState({ children, className }: UnsplashEmptyStateProps): react_jsx_runtime.JSX.Element;
/**
 * Auto empty state — reads context to determine which message to show.
 * Use this inside compound layouts for automatic behavior.
 */
declare function UnsplashAutoEmptyState(): react_jsx_runtime.JSX.Element | null;

/**
 * Observe an element's dimensions using ResizeObserver.
 * Falls back gracefully in SSR environments.
 */
declare function useResizeObserver(ref: React.RefObject<Element | null>): {
    width: number;
    height: number;
};
/**
 * Call `onIntersect` when the observed element enters the viewport.
 * Used for infinite scroll "load more" triggering.
 */
declare function useIntersectionObserver(ref: React.RefObject<Element | null>, onIntersect: () => void, options?: {
    threshold?: number;
    rootMargin?: string;
    enabled?: boolean;
}): void;

export { type ImageRenderProps, type LinkRenderProps, ReactUnsplash, type ReactUnsplashClassNames, type ReactUnsplashProps, type ReactUnsplashSlots, UnsplashAutoEmptyState, UnsplashDialog, UnsplashEmptyState, UnsplashGrid, type UnsplashPhoto, type UnsplashPhotoLinks, type UnsplashProfileImage, UnsplashRoot, UnsplashSearch, type UnsplashTag, type UnsplashTagAncestry, type UnsplashTagSource, type UnsplashUrls, type UnsplashUser, type UnsplashUserLinks, ReactUnsplash as default, useIntersectionObserver, useResizeObserver, useUnsplashContext };
