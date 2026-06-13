<p align="center">
  <a href="https://react-unsplash.thucde.dev/" target="_blank">
    <img src="https://raw.githubusercontent.com/thucne/react-unsplash/main/public/unsplash-logo.svg" alt="Unsplash" height="40" />
  </a>
</p>

<h1 align="center">react-unsplash</h1>

<p align="center">
  A highly customizable React component library for integrating an Unsplash photo picker into your projects.
</p>

<p align="center">
  <a href="https://react-unsplash.thucde.dev/"><strong>Live Demo</strong></a> ·
  <a href="https://www.npmjs.com/package/react-unsplash"><img src="https://img.shields.io/npm/v/react-unsplash?style=flat-square&color=18181b" alt="npm version" /></a>
  <a href="https://www.npmjs.com/package/react-unsplash"><img src="https://img.shields.io/npm/dm/react-unsplash?style=flat-square&color=18181b" alt="npm downloads" /></a>
  <a href="https://github.com/thucne/react-unsplash/blob/main/LICENSE"><img src="https://img.shields.io/github/license/thucne/react-unsplash?style=flat-square&color=18181b" alt="license" /></a>
  <img src="https://img.shields.io/badge/React-18%2B-18181b?style=flat-square&logo=react" alt="React 18+" />
  <img src="https://img.shields.io/badge/TypeScript-Ready-18181b?style=flat-square&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/shadcn%2Fui-Compatible-18181b?style=flat-square" alt="shadcn compatible" />
</p>

---

## ✨ Features

- 🎨 **shadcn/ui compatible** — CSS Variables map directly to shadcn design tokens
- 🪶 **Lightweight** — zero UI framework dependency (no MUI, no Emotion)
- 🧩 **Two usage modes** — flat props API and compound component API
- 🖼️ **Custom renderers** — inject `next/image`, custom links, custom overlays
- 🌑 **Dark mode** — automatic via `.dark` class or `data-theme="dark"`
- ♾️ **Infinite scroll & button pagination** — configurable via `loadMode`
- 💎 **Full TypeScript** — complete Unsplash API types exported
- 📦 **Dual ESM/CJS** — tree-shakable, works in any bundler
- ♿ **Accessible** — proper ARIA roles, keyboard navigation

---

## 📦 Installation

```bash
npm i react-unsplash
# or
pnpm add react-unsplash
# or
yarn add react-unsplash
```

> **Peer dependencies**: React ≥ 18 and react-dom ≥ 18 are required.

---

## 🚀 Quick Start

### 1. Import the stylesheet

```tsx
// In your app's root layout or entry file:
import 'react-unsplash/styles';
```

> **shadcn/Tailwind users**: The styles automatically inherit your CSS variables. No extra config needed.

### 2. Use the component

```tsx
import ReactUnsplash from 'react-unsplash';
import type { UnsplashPhoto } from 'react-unsplash';

export function MyPicker() {
  const [photos, setPhotos] = useState<UnsplashPhoto[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (query: string) => {
    setLoading(true);
    const results = await fetchFromUnsplash(query); // your API call
    setPhotos(results);
    setLoading(false);
  };

  return (
    <ReactUnsplash
      images={photos}
      loading={loading}
      onSearch={handleSearch}
      onSelect={(photo) => console.log('Selected:', photo)}
    />
  );
}
```

> **Note**: `react-unsplash` is a UI component only — it does not call the Unsplash API. You supply the photos and it handles the display and selection UX. See [Setting Up the Unsplash API](#-setting-up-the-unsplash-api) below.

---

## 📖 API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `images` | `UnsplashPhoto[]` | `[]` | Array of Unsplash photo objects |
| `onSelect` | `(photo: UnsplashPhoto) => void` | **required** | Called when a photo is clicked |
| `loading` | `boolean` | `false` | Shows loading indicator |
| `initValue` | `string` | `''` | Initial search value |
| `onSearch` | `(value: string) => void` | — | Called on every keystroke |
| `onCommit` | `(value: string) => void` | — | Called when Enter is pressed |
| `searchPlaceholder` | `string` | `'Search photos...'` | Search input placeholder |
| `maxSearchLength` | `number` | `64` | Max characters in search input |
| `hasMore` | `boolean` | `false` | Whether more results are available |
| `handleLoadMore` | `() => void` | — | Load next page callback |
| `loadMode` | `'scroll' \| 'button'` | `'scroll'` | How to trigger loading more |
| `displayMode` | `'normal' \| 'popup'` | `'normal'` | Inline or modal display |
| `open` | `boolean` | `false` | Controls popup visibility |
| `onClose` | `() => void` | — | Called when popup closes |
| `cols` | `number` | auto | Number of columns (auto-responsive if omitted) |
| `gap` | `number` | `8` | Gap between images (px) |
| `width` | `number` | `'100%'` | Fixed width of the component |
| `height` | `number` | `450` | Height of the image grid area |
| `autoFocus` | `boolean` | `true` | Auto-focus the search input |
| `renderImage` | `(props: ImageRenderProps) => ReactNode` | — | Custom image renderer |
| `renderLink` | `(props: LinkRenderProps) => ReactNode` | — | Custom link renderer |
| `className` | `string` | — | Extra class on the root element |
| `classNames` | `ReactUnsplashClassNames` | — | Per-part class name overrides |
| `style` | `CSSProperties` | — | Inline style / CSS variable overrides |
| `slots` | `ReactUnsplashSlots` | — | Custom render slot overrides |

### `classNames` (per-part overrides)

```tsx
<ReactUnsplash
  classNames={{
    root: '',           // outermost container
    searchWrapper: '',  // search bar wrapper div
    searchInput: '',    // <input> element
    loadingBar: '',     // loading progress bar
    imageGrid: '',      // image grid scroll area
    imageItem: '',      // each image card
    imageOverlay: '',   // author overlay on hover
    authorLink: '',     // author <a> element
    dialog: '',         // popup dialog panel
    loadMore: '',       // load more button wrapper
    emptyState: '',     // empty/no-results div
  }}
/>
```

### `slots` (render overrides)

```tsx
<ReactUnsplash
  slots={{
    // Custom empty state when no search yet
    emptyState: <div>Start typing to discover photos!</div>,
    
    // Custom empty state for no results
    noResults: <div>No photos found 😢</div>,
    
    // Custom loading spinner
    loadingState: <MySpinner />,
    
    // Custom "Load More" button (loadMode="button")
    loadMoreButton: ({ onClick, loading }) => (
      <Button onClick={onClick} disabled={loading} variant="outline">
        {loading ? <Loader2 className="animate-spin" /> : 'Load more'}
      </Button>
    ),
    
    // Custom overlay on top of each image
    imageOverlay: (photo) => (
      <div className="absolute inset-0 flex items-end p-2 bg-gradient-to-t from-black/60">
        <Badge>{photo.likes} ♥</Badge>
      </div>
    ),
    
    // Custom search icon
    searchIcon: <MySearchIcon className="text-primary" />,
  }}
/>
```

---

## 🔌 Custom Renderers

### Using `next/image`

```tsx
import NextImage from 'next/image';
import NextLink from 'next/link';

<ReactUnsplash
  renderImage={(props) => (
    <NextImage
      {...props}
      // next/image requires these:
      unoptimized  // or configure remotePatterns for images.unsplash.com
      className="w-full h-auto"
    />
  )}
  renderLink={(props) => (
    <NextLink href={props.href} target={props.target} rel={props.rel}>
      {props.children}
    </NextLink>
  )}
/>
```

Add to your `next.config`:
```js
// next.config.mjs
const nextConfig = {
  images: {
    remotePatterns: [{ hostname: 'images.unsplash.com' }],
  },
};
```

---

## 🧩 Compound Component API

For maximum layout control, use the compound components:

```tsx
import {
  UnsplashRoot,
  UnsplashSearch,
  UnsplashGrid,
  UnsplashDialog,
  UnsplashEmptyState,
} from 'react-unsplash';

// ---- Normal layout with custom structure ----
<UnsplashRoot
  images={photos}
  onSelect={handleSelect}
  loading={isLoading}
  hasMore={hasNextPage}
  handleLoadMore={loadMore}
>
  <div className="flex flex-col border rounded-xl overflow-hidden">
    <UnsplashSearch className="border-b" />
    <UnsplashEmptyState>
      <p className="text-muted-foreground">Search for beautiful photos...</p>
    </UnsplashEmptyState>
    <UnsplashGrid
      cols={4}
      height={500}
      renderImage={(props) => <NextImage {...props} unoptimized />}
    />
  </div>
</UnsplashRoot>

// ---- Popup with compound components ----
<UnsplashRoot images={photos} onSelect={handleSelect} onClose={() => setOpen(false)}>
  <UnsplashDialog open={isOpen} onClose={() => setOpen(false)}>
    <UnsplashSearch />
    <UnsplashGrid />
  </UnsplashDialog>
</UnsplashRoot>
```

---

## 🎨 Theming

### shadcn/ui (automatic)

If your project uses shadcn/ui, `react-unsplash` automatically inherits your theme colors. No additional configuration needed. The component uses the same CSS variable names (`--background`, `--border`, `--primary`, etc.).

### Custom CSS Variables

Override any `--ru-*` variable on the root class or inline:

```css
/* globals.css */
.react-unsplash {
  --ru-primary:    #6366f1;  /* indigo */
  --ru-radius:     0.75rem;
  --ru-image-hover: brightness(0.75) saturate(1.2);
}
```

Or per-instance via the `style` prop:
```tsx
<ReactUnsplash
  style={{
    '--ru-primary': '#6366f1',
    '--ru-radius': '1rem',
  } as React.CSSProperties}
/>
```

### Dark Mode

Dark mode works automatically with:
- **shadcn**: `.dark` class on `<html>` (default shadcn behavior)
- **Manual**: `data-theme="dark"` attribute
- **System**: `@media (prefers-color-scheme: dark)` ← add your own CSS rule if needed

---

## 🌐 Setting Up the Unsplash API

`react-unsplash` is a **pure UI component** — you manage the API calls. Here's a recommended setup:

### Next.js (App Router)

**1. Create an API route** (keeps your key server-side):
```ts
// app/api/unsplash/route.ts
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  
  const res = await fetch(
    `https://api.unsplash.com/search/photos?${searchParams}`,
    {
      headers: { Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}` },
    }
  );
  
  return Response.json(await res.json());
}
```

**2. Fetch in your component**:
```tsx
const [photos, setPhotos] = useState([]);

const handleSearch = async (query: string) => {
  const res = await fetch(`/api/unsplash?query=${query}&per_page=20`);
  const data = await res.json();
  setPhotos(data.results);
};
```

Get your free API key at [unsplash.com/developers](https://unsplash.com/developers).

---

## 🔄 Migration Guide: v0.x → v1.0

### Breaking Changes

#### 1. Import stylesheet manually
```tsx
// v1.0 — add this import
import 'react-unsplash/styles';
```

#### 2. `onSelect` is now typed
```tsx
// v0.x
onSelect={(image: any) => ...}

// v1.0
import type { UnsplashPhoto } from 'react-unsplash';
onSelect={(photo: UnsplashPhoto) => ...}
```

#### 3. No more MUI ThemeProvider needed
```tsx
// v0.x — required MUI setup
import { ThemeProvider } from '@mui/material';
<ThemeProvider theme={theme}>
  <ReactUnsplash ... />
</ThemeProvider>

// v1.0 — no wrappers needed
<ReactUnsplash ... />
```

#### 4. `next/image` is opt-in
```tsx
// v0.x — automatically used next/image (broke in non-Next.js apps)

// v1.0 — opt-in via renderImage prop
<ReactUnsplash
  renderImage={(props) => <NextImage {...props} unoptimized />}
/>
```

### Non-Breaking Additions
All existing props (`initValue`, `onSearch`, `onCommit`, `hasMore`, `handleLoadMore`, `displayMode`, `open`, `onClose`, `cols`, `gap`, `width`, `height`) work identically.

---

## 📄 License

MIT © [thucne](https://github.com/thucne)

---

<p align="center">
  Made with ❤️ by <a href="https://thucde.dev">thucde.dev</a>
  &nbsp;•&nbsp;
  Powered by the <a href="https://unsplash.com/developers">Unsplash API</a>
</p>
