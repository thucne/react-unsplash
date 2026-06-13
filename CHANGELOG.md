# Changelog

All notable changes to `react-unsplash` will be documented in this file.

---

## [1.0.0] — 2026-06-12

### 🎉 Major Release — Complete Rewrite

This is a full rewrite from the ground up. The public props API is largely backwards-compatible; see the [Migration Guide](README.md#-migration-guide-v0x--v10) for breaking changes.

### ✨ New Features

- **Compound Component API**: Full control over layout using `UnsplashRoot`, `UnsplashSearch`, `UnsplashGrid`, `UnsplashDialog`, `UnsplashEmptyState`
- **`renderImage` prop**: Inject any custom image component (e.g. `next/image`)
- **`renderLink` prop**: Inject any custom link component (e.g. `next/link`)
- **`classNames` prop**: Override class names on every internal element
- **`slots` prop**: Replace internal UI pieces (empty state, loading state, load more button, image overlay, search icon)
- **`style` prop**: Pass CSS variable overrides per-instance
- **`searchPlaceholder` prop**: Customize the search input placeholder
- **`autoFocus` prop**: Control whether the search auto-focuses on mount
- **`maxSearchLength` prop**: Configure max characters in the search input
- **Exported hooks**: `useResizeObserver`, `useIntersectionObserver`, `useUnsplashContext`
- **Full TypeScript types**: `UnsplashPhoto`, `UnsplashUser`, `UnsplashUrls`, `ImageRenderProps`, `LinkRenderProps`, `ReactUnsplashClassNames`, `ReactUnsplashSlots` all exported

### 🎨 Styling

- **shadcn/ui compatible**: CSS variables automatically map to shadcn design tokens (`--background`, `--border`, `--primary`, etc.)
- **Dark mode**: Works automatically with shadcn's `.dark` class or `data-theme="dark"` attribute
- **CSS Variables**: All visual properties customizable via `--ru-*` variables
- **No MUI**: Zero dependency on Material UI or Emotion

### ⚡ Performance

- **`ResizeObserver`**: Replaced `setInterval` polling for element dimension tracking
- **`IntersectionObserver`**: Extracted into a reusable hook for infinite scroll
- **BlurHash**: Decodes to 32×32 placeholder (was full-size before), saving memory
- **Tree-shakable**: Dual ESM/CJS output via `tsup`/esbuild
- **`sideEffects: ["*.css"]`** declared for optimal dead code elimination

### 🛠️ Developer Experience

- **Dual ESM/CJS output**: `dist/index.mjs` and `dist/index.js`
- **Declaration maps**: Full source maps for `.d.ts` files
- **`exports` field**: Proper `package.json#exports` for Node.js and bundlers
- **Build script**: `pnpm build:lib` via `tsup`

### 🔧 Internal Changes

- **Removed dependencies**: `@mui/material`, `@emotion/react`, `@emotion/styled`, `@mui/icons-material`, `next` (as runtime dep)
- **Moved to `peerDependencies`**: `react`, `react-dom`
- **Only runtime dependency**: `blurhash`
- **Replaced `next/image`**: Native `<img>` with `loading="lazy"` (opt-in `renderImage`)
- **Replaced `next/link`**: Native `<a>` (opt-in `renderLink`)
- **Replaced MUI `<Dialog>`**: Native dialog with backdrop, ESC key, scroll lock
- **Replaced MUI `<TextField>`**: Native `<input>` with CSS styling
- **Replaced MUI `<ImageList>`**: CSS `columns` masonry layout

### 🐛 Bug Fixes

- Fixed SSR crash in `blurHashToBase64` when `document` is not available
- Fixed `useElementDimensions` causing infinite renders via `setInterval`

---

## [0.1.26] — 2024

Initial publish series. Built with Next.js 14, MUI 5, and `@swc/cli`.

---

[1.0.0]: https://github.com/thucne/react-unsplash/releases/tag/v1.0.0
