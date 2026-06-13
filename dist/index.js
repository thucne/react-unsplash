'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var react = require('react');
var jsxRuntime = require('react/jsx-runtime');
var blurhash = require('blurhash');
require('./react-unsplash-DUTWNAVS.css');

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n.default = e;
  return Object.freeze(n);
}

var blurhash__namespace = /*#__PURE__*/_interopNamespace(blurhash);

// src/components/ReactUnsplash/context.tsx
var UnsplashContext = react.createContext(null);
function useUnsplashContext() {
  const ctx = react.useContext(UnsplashContext);
  if (!ctx) {
    throw new Error("useUnsplashContext must be used inside <UnsplashRoot>");
  }
  return ctx;
}
function UnsplashRoot({
  children,
  images = [],
  onSelect,
  loading = false,
  hasMore = false,
  handleLoadMore,
  loadMode = "scroll",
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
  searchPlaceholder = "Search photos...",
  onSearch,
  onCommit,
  initValue = "",
  isPopUp = false,
  onClose = () => {
  }
}) {
  const value = react.useMemo(
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
      onClose
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [images, loading, hasMore, loadMode, cols, gap, height, width, isPopUp]
  );
  return /* @__PURE__ */ jsxRuntime.jsx(UnsplashContext.Provider, { value, children });
}
var PLACEHOLDER_SIZE = 32;
function blurHashToDataURL(hash, width = PLACEHOLDER_SIZE, height = PLACEHOLDER_SIZE) {
  if (typeof document === "undefined") return "";
  try {
    const w = Math.min(width, PLACEHOLDER_SIZE);
    const h = Math.min(height, PLACEHOLDER_SIZE);
    const pixels = blurhash__namespace.decode(hash, w, h);
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) return "";
    const imageData = ctx.createImageData(w, h);
    imageData.data.set(pixels);
    ctx.putImageData(imageData, 0, 0);
    return canvas.toDataURL();
  } catch {
    return "";
  }
}
function getResponsiveCols(containerWidth) {
  if (containerWidth <= 0) return 3;
  if (containerWidth < 320) return 1;
  if (containerWidth < 480) return 2;
  if (containerWidth < 720) return 3;
  if (containerWidth < 1024) return 4;
  return 5;
}
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}
var SearchIcon = () => /* @__PURE__ */ jsxRuntime.jsxs(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    width: "18",
    height: "18",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true",
    children: [
      /* @__PURE__ */ jsxRuntime.jsx("circle", { cx: "11", cy: "11", r: "8" }),
      /* @__PURE__ */ jsxRuntime.jsx("path", { d: "m21 21-4.3-4.3" })
    ]
  }
);
var SpinnerIcon = () => /* @__PURE__ */ jsxRuntime.jsx(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    width: "18",
    height: "18",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style: { animation: "ru-spin 0.8s linear infinite" },
    "aria-hidden": "true",
    children: /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M21 12a9 9 0 1 1-6.219-8.56" })
  }
);
var UnsplashLogo = ({ collapsed }) => /* @__PURE__ */ jsxRuntime.jsx(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 457.19 104.19",
    fill: "currentColor",
    "aria-label": "Unsplash",
    preserveAspectRatio: "xMinYMid slice",
    style: {
      height: "1.25rem",
      width: collapsed ? "1.25rem" : "5.485rem",
      transition: "width 0.25s ease",
      overflow: "hidden",
      flexShrink: 0
    },
    children: /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M59.88 38.66h27.53v48.75H0V38.66h27.53v24.37h32.35zm93 25c0 8.25-5.45 13.13-12.9 13.13-7.28 0-12.81-4.88-12.81-13.13V24.41h-12.22v39.13c0 15.45 11 25.21 25.06 25.21s25.15-9.76 25.15-25.21V24.41h-12.25zm43.7-21.13c-4.7 0-9.94 2-12.6 6.57v-5.41h-11.45v43.64h11.81v-25.1c0-5 3-9 8.16-9 5.68 0 8.08 3.82 8.08 8.7v25.4h11.8V59.82c.03-9.59-4.94-17.31-15.77-17.31zm43.31 18.37l-6.48-1.33c-2.47-.5-4-1.77-4-3.9 0-2.49 2.23-4.35 5.33-4.35 4.36 0 6.09 2.25 6.51 4.88h10.18c-.08-6-4.83-13.84-16.51-13.84-9.41 0-16.33 6.47-16.33 14.28 0 6.13 3.81 11.19 12.24 13l6.05 1.33c3.37.71 4.7 2.31 4.7 4.26 0 2.31-2.14 4.35-6 4.35-4.71 0-7.27-2.68-7.87-5.79h-10.5c.59 6.53 5.32 14.84 18.46 14.84 11.45 0 17.22-7.28 17.22-14.38-.01-6.36-4.36-11.59-12.97-13.37zm63.19 4.53c0 13.22-8.26 23-20.59 23-6 0-10.48-2.4-12.61-5.33v21.13h-11.8V43.67h11.45v5.41c2-3.37 6.83-6.39 13.4-6.39 12.81 0 20.18 9.76 20.18 22.72zm-11.63.09c0-7.72-4.79-12.25-10.83-12.25s-10.91 4.53-10.91 12.25 4.88 12.33 10.91 12.33 10.91-4.54 10.91-12.35zm68-21.83h11.45v43.64h-11.8v-5.31c-2 3.5-6.57 6.38-12.61 6.38-12.33 0-20.59-9.77-20.59-23 0-13 7.37-22.72 20.15-22.72 6.57 0 11.32 3.05 13.4 6.39zm-.18 21.83c0-7.72-4.88-12.25-10.91-12.25s-10.83 4.51-10.83 12.23 4.79 12.33 10.83 12.33 10.92-4.6 10.92-12.33zm-50.66 21.81h11.8V24.41h-11.8zm132.35-44.81c-4.17 0-9 1.41-11.81 4.78V24.41h-11.8v62.91h11.8V61.68c.27-4.8 3.2-8.52 8.17-8.52 5.68 0 8.08 3.83 8.07 8.71v25.47h11.81V59.82c-.01-9.59-5.15-17.3-16.24-17.3zm-42 18.36l-6.43-1.33c-2.47-.5-4-1.77-4-3.9 0-2.49 2.22-4.35 5.33-4.35 4.35 0 6.08 2.25 6.5 4.88h10.17c-.08-6-4.83-13.84-16.51-13.84-9.41 0-16.33 6.47-16.33 14.28 0 6.13 3.82 11.19 12.25 13l6 1.33c3.37.71 4.7 2.31 4.7 4.26 0 2.31-2.14 4.35-6 4.35-4.71 0-7.27-2.68-7.87-5.79h-10.49c.58 6.53 5.31 14.84 18.45 14.84 11.45 0 17.22-7.28 17.22-14.38 0-6.34-4.35-11.57-12.95-13.35zM59.88 0H27.53v24.37h32.35z" })
  }
);
function UnsplashSearch({ className }) {
  const {
    loading,
    isPopUp,
    onClose,
    onSearch,
    onCommit,
    initValue,
    autoFocus,
    maxSearchLength,
    searchPlaceholder,
    slots,
    classNames
  } = useUnsplashContext();
  const [value, setValue] = react.useState(initValue ?? "");
  const inputRef = react.useRef(null);
  react.useEffect(() => {
    if (initValue) {
      setValue(initValue);
      onSearch == null ? void 0 : onSearch(initValue);
    }
  }, []);
  react.useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);
  const handleChange = (e) => {
    const val = e.target.value;
    if (val.length > maxSearchLength) return;
    setValue(val);
    onSearch == null ? void 0 : onSearch(val);
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onCommit == null ? void 0 : onCommit(value);
    }
    if (e.key === "Escape" && isPopUp) {
      e.preventDefault();
      onClose();
    }
  };
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "div",
    {
      className: cn("ru-search-wrapper", classNames.searchWrapper, className),
      role: "search",
      children: [
        /* @__PURE__ */ jsxRuntime.jsx("span", { className: "ru-search-icon", children: slots.searchIcon ?? (loading ? /* @__PURE__ */ jsxRuntime.jsx(SpinnerIcon, {}) : /* @__PURE__ */ jsxRuntime.jsx(SearchIcon, {})) }),
        /* @__PURE__ */ jsxRuntime.jsx("span", { className: "ru-unsplash-logo", "aria-hidden": "true", children: /* @__PURE__ */ jsxRuntime.jsx(UnsplashLogo, { collapsed: value.length > 0 }) }),
        /* @__PURE__ */ jsxRuntime.jsx(
          "input",
          {
            ref: inputRef,
            type: "search",
            role: "searchbox",
            "aria-label": "Search Unsplash photos",
            placeholder: searchPlaceholder,
            value,
            onChange: handleChange,
            onKeyDown: handleKeyDown,
            className: cn("ru-search-input", classNames.searchInput),
            autoComplete: "off",
            spellCheck: false,
            maxLength: maxSearchLength
          }
        ),
        isPopUp && /* @__PURE__ */ jsxRuntime.jsx(
          "button",
          {
            type: "button",
            className: cn("ru-esc-badge"),
            onClick: onClose,
            "aria-label": "Close photo picker",
            tabIndex: 0,
            children: "esc"
          }
        )
      ]
    }
  );
}
var useIsomorphicLayoutEffect = typeof window !== "undefined" ? react.useLayoutEffect : react.useEffect;
function useResizeObserver(ref) {
  const [size, setSize] = react.useState({ width: 0, height: 0 });
  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setSize({ width: rect.width, height: rect.height });
    if (typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);
  return size;
}
function useIntersectionObserver(ref, onIntersect, options = {}) {
  const { threshold = 0.1, rootMargin = "0px", enabled = true } = options;
  const callbackRef = react.useRef(onIntersect);
  callbackRef.current = onIntersect;
  react.useEffect(() => {
    if (!enabled) return;
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        var _a;
        if ((_a = entries[0]) == null ? void 0 : _a.isIntersecting) {
          callbackRef.current();
        }
      },
      { threshold, rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, threshold, rootMargin, enabled]);
}
function ScrollSentinel({ onVisible, enabled }) {
  const ref = react.useRef(null);
  useIntersectionObserver(ref, onVisible, { enabled, threshold: 0.1 });
  return /* @__PURE__ */ jsxRuntime.jsx("div", { ref, className: "ru-scroll-sentinel", "aria-hidden": "true" });
}
function ImageItem({ photo, containerWidth, isLast }) {
  var _a, _b, _c, _d, _e, _f;
  const { onSelect, renderImage, renderLink, slots, classNames, hasMore, handleLoadMore, loadMode, loading } = useUnsplashContext();
  const itemWidth = containerWidth > 0 ? containerWidth : 200;
  const itemHeight = photo.height && photo.width ? Math.round(itemWidth * photo.height / photo.width) : itemWidth;
  const placeholder = photo.blur_hash ? blurHashToDataURL(photo.blur_hash) : void 0;
  const authorHref = ((_b = (_a = photo.user) == null ? void 0 : _a.links) == null ? void 0 : _b.html) ?? "#";
  const authorName = ((_c = photo.user) == null ? void 0 : _c.name) ?? "";
  const altText = photo.alt_description ?? photo.description ?? "";
  const imageProps = {
    src: ((_d = photo.urls) == null ? void 0 : _d.small) ?? ((_e = photo.urls) == null ? void 0 : _e.thumb) ?? ((_f = photo.urls) == null ? void 0 : _f.regular) ?? "",
    alt: altText,
    width: itemWidth,
    height: itemHeight,
    loading: "lazy",
    style: { width: "100%", height: "auto", display: "block" },
    onClick: () => onSelect(photo),
    placeholder,
    "data-photo-id": photo.id
  };
  const linkProps = {
    href: authorHref,
    target: "_blank",
    rel: "noopener noreferrer",
    className: "ru-author-link",
    children: authorName
  };
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: cn("ru-image-item", classNames.imageItem), children: [
    renderImage ? renderImage(imageProps) : /* @__PURE__ */ jsxRuntime.jsx(
      "img",
      {
        src: imageProps.src,
        alt: imageProps.alt,
        width: imageProps.width,
        height: imageProps.height,
        loading: imageProps.loading,
        style: imageProps.style,
        onClick: imageProps.onClick,
        "data-photo-id": imageProps["data-photo-id"]
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsx("div", { className: cn("ru-author-overlay", classNames.imageOverlay), children: renderLink ? renderLink(linkProps) : /* @__PURE__ */ jsxRuntime.jsx(
      "a",
      {
        href: linkProps.href,
        target: linkProps.target,
        rel: linkProps.rel,
        className: cn(linkProps.className, classNames.authorLink),
        onClick: (e) => e.stopPropagation(),
        children: authorName
      }
    ) }),
    slots.imageOverlay && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "ru-image-custom-overlay", children: slots.imageOverlay(photo) }),
    isLast && loadMode === "scroll" && /* @__PURE__ */ jsxRuntime.jsx(
      ScrollSentinel,
      {
        onVisible: () => !loading && hasMore && (handleLoadMore == null ? void 0 : handleLoadMore()),
        enabled: hasMore && !loading
      }
    )
  ] });
}
function UnsplashGrid({ cols, gap, height, className }) {
  const ctx = useUnsplashContext();
  const {
    images,
    loading,
    hasMore,
    handleLoadMore,
    loadMode,
    classNames,
    slots
  } = ctx;
  const gridRef = react.useRef(null);
  const { width: containerWidth } = useResizeObserver(gridRef);
  const resolvedCols = cols ?? ctx.cols ?? getResponsiveCols(containerWidth);
  const resolvedGap = gap ?? ctx.gap ?? 8;
  const resolvedHeight = height ?? ctx.height ?? 450;
  if (!images || images.length === 0) return null;
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "div",
    {
      className: cn("ru-image-grid-scroll", classNames.imageGrid, className),
      style: { height: resolvedHeight },
      children: [
        /* @__PURE__ */ jsxRuntime.jsx(
          "div",
          {
            ref: gridRef,
            className: "ru-image-grid",
            style: {
              "--ru-cols": resolvedCols,
              "--ru-gap": `${resolvedGap}px`
            },
            children: images.map((photo, idx) => /* @__PURE__ */ jsxRuntime.jsx(
              ImageItem,
              {
                photo,
                containerWidth: containerWidth > 0 ? Math.floor(containerWidth / resolvedCols) - resolvedGap : 0,
                isLast: idx === images.length - 1
              },
              photo.id
            ))
          }
        ),
        loading && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "ru-loading-state", children: slots.loadingState ?? "Loading..." }),
        hasMore && loadMode === "button" && /* @__PURE__ */ jsxRuntime.jsx("div", { className: cn("ru-load-more", classNames.loadMore), children: slots.loadMoreButton ? slots.loadMoreButton({
          onClick: () => handleLoadMore == null ? void 0 : handleLoadMore(),
          loading: loading ?? false
        }) : /* @__PURE__ */ jsxRuntime.jsx(
          "button",
          {
            type: "button",
            className: "ru-load-more-btn",
            disabled: loading,
            onClick: () => handleLoadMore == null ? void 0 : handleLoadMore(),
            children: loading ? "Loading..." : "More photos"
          }
        ) })
      ]
    }
  );
}
function UnsplashDialog({
  open,
  onClose,
  children,
  width,
  className
}) {
  const backdropRef = react.useRef(null);
  react.useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);
  react.useEffect(() => {
    if (!open) return;
    const handleKey = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onClose]);
  const handleBackdropClick = (e) => {
    if (e.target === backdropRef.current) {
      onClose();
    }
  };
  if (!open) return null;
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      ref: backdropRef,
      className: "ru-dialog-backdrop",
      role: "dialog",
      "aria-modal": "true",
      "aria-label": "Unsplash photo picker",
      onClick: handleBackdropClick,
      children: /* @__PURE__ */ jsxRuntime.jsx(
        "div",
        {
          className: cn("ru-dialog-panel", className),
          style: width ? { width, maxWidth: "100%" } : void 0,
          onClick: (e) => e.stopPropagation(),
          children
        }
      )
    }
  );
}
function UnsplashEmptyState({ children, className }) {
  return /* @__PURE__ */ jsxRuntime.jsx("div", { className: cn("ru-empty-state", className), role: "status", "aria-live": "polite", children });
}
function UnsplashAutoEmptyState() {
  const { images, loading, slots, classNames } = useUnsplashContext();
  if (loading || images.length > 0) return null;
  return /* @__PURE__ */ jsxRuntime.jsx(UnsplashEmptyState, { className: classNames.emptyState, children: slots.emptyState ?? /* @__PURE__ */ jsxRuntime.jsx("span", { children: "\u{1F50D} Start typing to search for photos" }) });
}
function LoadingBar() {
  const { loading, classNames } = useUnsplashContext();
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      className: cn("ru-loading-bar-track", !loading && "ru-loading-bar-hidden", classNames.loadingBar),
      role: "progressbar",
      "aria-hidden": !loading,
      "aria-label": "Loading",
      children: loading && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "ru-loading-bar-fill" })
    }
  );
}
function UnsplashInner({ width }) {
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "div",
    {
      className: "react-unsplash",
      style: width ? { width, maxWidth: "100%" } : void 0,
      children: [
        /* @__PURE__ */ jsxRuntime.jsx(UnsplashSearch, {}),
        /* @__PURE__ */ jsxRuntime.jsx(LoadingBar, {}),
        /* @__PURE__ */ jsxRuntime.jsx(UnsplashAutoEmptyState, {}),
        /* @__PURE__ */ jsxRuntime.jsx(UnsplashGrid, {})
      ]
    }
  );
}
var ReactUnsplash = ({
  // Core
  images = [],
  onSelect,
  // Search
  initValue = "",
  onSearch,
  onCommit,
  maxSearchLength = 64,
  searchPlaceholder = "Search photos...",
  // State
  loading = false,
  // Pagination
  hasMore = false,
  handleLoadMore,
  loadMode = "scroll",
  // Layout
  displayMode = "normal",
  open = false,
  onClose = () => {
  },
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
  slots = {}
}) => {
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
    onClose
  };
  if (displayMode === "popup") {
    return /* @__PURE__ */ jsxRuntime.jsx(UnsplashRoot, { ...rootProps, isPopUp: true, children: /* @__PURE__ */ jsxRuntime.jsx(
      UnsplashDialog,
      {
        open,
        onClose,
        width,
        className: cn(classNames.dialog, className),
        children: /* @__PURE__ */ jsxRuntime.jsx(UnsplashInner, { isPopUp: true, width })
      }
    ) });
  }
  return /* @__PURE__ */ jsxRuntime.jsx(UnsplashRoot, { ...rootProps, isPopUp: false, children: /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      className: cn(className),
      style: { width: width ?? "100%", maxWidth: "100%", ...style },
      children: /* @__PURE__ */ jsxRuntime.jsx(UnsplashInner, { isPopUp: false, width })
    }
  ) });
};
var ReactUnsplash_default = ReactUnsplash;

exports.ReactUnsplash = ReactUnsplash_default;
exports.UnsplashAutoEmptyState = UnsplashAutoEmptyState;
exports.UnsplashDialog = UnsplashDialog;
exports.UnsplashEmptyState = UnsplashEmptyState;
exports.UnsplashGrid = UnsplashGrid;
exports.UnsplashRoot = UnsplashRoot;
exports.UnsplashSearch = UnsplashSearch;
exports.default = ReactUnsplash_default;
exports.useIntersectionObserver = useIntersectionObserver;
exports.useResizeObserver = useResizeObserver;
exports.useUnsplashContext = useUnsplashContext;
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map