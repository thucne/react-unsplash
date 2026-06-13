import { createContext, useContext, useMemo, useState, useRef, useEffect, useLayoutEffect } from 'react';
import { jsx, jsxs } from 'react/jsx-runtime';
import * as blurhash from 'blurhash';
import './react-unsplash-DUTWNAVS.css';

// src/components/ReactUnsplash/context.tsx
var UnsplashContext = createContext(null);
function useUnsplashContext() {
  const ctx = useContext(UnsplashContext);
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
  const value = useMemo(
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
  return /* @__PURE__ */ jsx(UnsplashContext.Provider, { value, children });
}
var PLACEHOLDER_SIZE = 32;
function blurHashToDataURL(hash, width = PLACEHOLDER_SIZE, height = PLACEHOLDER_SIZE) {
  if (typeof document === "undefined") return "";
  try {
    const w = Math.min(width, PLACEHOLDER_SIZE);
    const h = Math.min(height, PLACEHOLDER_SIZE);
    const pixels = blurhash.decode(hash, w, h);
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
  if (containerWidth < 320) return 1;
  if (containerWidth < 480) return 2;
  if (containerWidth < 720) return 3;
  if (containerWidth < 1024) return 4;
  return 5;
}
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}
var SearchIcon = () => /* @__PURE__ */ jsxs(
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
      /* @__PURE__ */ jsx("circle", { cx: "11", cy: "11", r: "8" }),
      /* @__PURE__ */ jsx("path", { d: "m21 21-4.3-4.3" })
    ]
  }
);
var SpinnerIcon = () => /* @__PURE__ */ jsx(
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
    children: /* @__PURE__ */ jsx("path", { d: "M21 12a9 9 0 1 1-6.219-8.56" })
  }
);
var UnsplashLogo = ({ collapsed }) => /* @__PURE__ */ jsxs(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 100 20",
    fill: "currentColor",
    "aria-label": "Unsplash",
    style: {
      height: "1.125rem",
      width: collapsed ? "1.125rem" : "5.5rem",
      transition: "width 0.25s ease",
      overflow: "hidden"
    },
    children: [
      /* @__PURE__ */ jsx("path", { d: "M 0,0 L 0,8 L 5,8 L 5,5 L 8,5 L 8,8 L 13,8 L 13,0 Z M 5,0 L 8,0 L 8,4 L 5,4 Z" }),
      !collapsed && /* @__PURE__ */ jsx("text", { x: "16", y: "8", fontSize: "8", fontFamily: "inherit", fontWeight: "600", children: "Unsplash" })
    ]
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
  const [value, setValue] = useState(initValue ?? "");
  const inputRef = useRef(null);
  useEffect(() => {
    if (initValue) {
      setValue(initValue);
      onSearch == null ? void 0 : onSearch(initValue);
    }
  }, []);
  useEffect(() => {
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
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: cn("ru-search-wrapper", classNames.searchWrapper, className),
      role: "search",
      children: [
        /* @__PURE__ */ jsx("span", { className: "ru-search-icon", children: slots.searchIcon ?? (loading ? /* @__PURE__ */ jsx(SpinnerIcon, {}) : /* @__PURE__ */ jsx(SearchIcon, {})) }),
        /* @__PURE__ */ jsx("span", { className: "ru-unsplash-logo", "aria-hidden": "true", children: /* @__PURE__ */ jsx(UnsplashLogo, { collapsed: value.length > 0 }) }),
        /* @__PURE__ */ jsx(
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
        isPopUp && /* @__PURE__ */ jsx(
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
var useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;
function useResizeObserver(ref) {
  const [size, setSize] = useState({ width: 0, height: 0 });
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
  const callbackRef = useRef(onIntersect);
  callbackRef.current = onIntersect;
  useEffect(() => {
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
  const ref = useRef(null);
  useIntersectionObserver(ref, onVisible, { enabled, threshold: 0.1 });
  return /* @__PURE__ */ jsx("div", { ref, className: "ru-scroll-sentinel", "aria-hidden": "true" });
}
function ImageItem({ photo, containerWidth, isLast }) {
  var _a, _b, _c, _d, _e, _f;
  const { onSelect, renderImage, renderLink, slots, classNames, hasMore, handleLoadMore, loadMode, loading } = useUnsplashContext();
  const itemWidth = containerWidth || 200;
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
  return /* @__PURE__ */ jsxs("div", { className: cn("ru-image-item", classNames.imageItem), children: [
    renderImage ? renderImage(imageProps) : /* @__PURE__ */ jsx(
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
    /* @__PURE__ */ jsx("div", { className: cn("ru-author-overlay", classNames.imageOverlay), children: renderLink ? renderLink(linkProps) : /* @__PURE__ */ jsx(
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
    slots.imageOverlay && /* @__PURE__ */ jsx("div", { className: "ru-image-custom-overlay", children: slots.imageOverlay(photo) }),
    isLast && loadMode === "scroll" && /* @__PURE__ */ jsx(
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
  const gridRef = useRef(null);
  const { width: containerWidth } = useResizeObserver(gridRef);
  const resolvedCols = cols ?? ctx.cols ?? getResponsiveCols(containerWidth);
  const resolvedGap = gap ?? ctx.gap ?? 8;
  const resolvedHeight = height ?? ctx.height ?? 450;
  if (!images || images.length === 0) return null;
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: cn("ru-image-grid-scroll", classNames.imageGrid, className),
      style: { height: resolvedHeight },
      children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            ref: gridRef,
            className: "ru-image-grid",
            style: {
              "--ru-cols": resolvedCols,
              "--ru-gap": `${resolvedGap}px`
            },
            children: images.map((photo, idx) => /* @__PURE__ */ jsx(
              ImageItem,
              {
                photo,
                containerWidth: Math.floor(containerWidth / resolvedCols) - resolvedGap,
                isLast: idx === images.length - 1
              },
              photo.id
            ))
          }
        ),
        loading && /* @__PURE__ */ jsx("div", { className: "ru-loading-state", children: slots.loadingState ?? "Loading..." }),
        hasMore && loadMode === "button" && /* @__PURE__ */ jsx("div", { className: cn("ru-load-more", classNames.loadMore), children: slots.loadMoreButton ? slots.loadMoreButton({
          onClick: () => handleLoadMore == null ? void 0 : handleLoadMore(),
          loading: loading ?? false
        }) : /* @__PURE__ */ jsx(
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
  const backdropRef = useRef(null);
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);
  useEffect(() => {
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
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref: backdropRef,
      className: "ru-dialog-backdrop",
      role: "dialog",
      "aria-modal": "true",
      "aria-label": "Unsplash photo picker",
      onClick: handleBackdropClick,
      children: /* @__PURE__ */ jsx(
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
  return /* @__PURE__ */ jsx("div", { className: cn("ru-empty-state", className), role: "status", "aria-live": "polite", children });
}
function UnsplashAutoEmptyState() {
  const { images, loading, slots, classNames } = useUnsplashContext();
  if (loading || images.length > 0) return null;
  return /* @__PURE__ */ jsx(UnsplashEmptyState, { className: classNames.emptyState, children: slots.emptyState ?? /* @__PURE__ */ jsx("span", { children: "\u{1F50D} Start typing to search for photos" }) });
}
function LoadingBar() {
  const { loading, classNames } = useUnsplashContext();
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cn("ru-loading-bar-track", !loading && "ru-loading-bar-hidden", classNames.loadingBar),
      role: "progressbar",
      "aria-hidden": !loading,
      "aria-label": "Loading",
      children: loading && /* @__PURE__ */ jsx("div", { className: "ru-loading-bar-fill" })
    }
  );
}
function UnsplashInner({ width }) {
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: "react-unsplash",
      style: width ? { width, maxWidth: "100%" } : void 0,
      children: [
        /* @__PURE__ */ jsx(UnsplashSearch, {}),
        /* @__PURE__ */ jsx(LoadingBar, {}),
        /* @__PURE__ */ jsx(UnsplashAutoEmptyState, {}),
        /* @__PURE__ */ jsx(UnsplashGrid, {})
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
    return /* @__PURE__ */ jsx(UnsplashRoot, { ...rootProps, isPopUp: true, children: /* @__PURE__ */ jsx(
      UnsplashDialog,
      {
        open,
        onClose,
        width,
        className: cn(classNames.dialog, className),
        children: /* @__PURE__ */ jsx(UnsplashInner, { isPopUp: true, width })
      }
    ) });
  }
  return /* @__PURE__ */ jsx(UnsplashRoot, { ...rootProps, isPopUp: false, children: /* @__PURE__ */ jsx(
    "div",
    {
      className: cn(className),
      style: { width: width ?? "100%", maxWidth: "100%", ...style },
      children: /* @__PURE__ */ jsx(UnsplashInner, { isPopUp: false, width })
    }
  ) });
};
var ReactUnsplash_default = ReactUnsplash;

export { ReactUnsplash_default as ReactUnsplash, UnsplashAutoEmptyState, UnsplashDialog, UnsplashEmptyState, UnsplashGrid, UnsplashRoot, UnsplashSearch, ReactUnsplash_default as default, useIntersectionObserver, useResizeObserver, useUnsplashContext };
//# sourceMappingURL=index.mjs.map
//# sourceMappingURL=index.mjs.map