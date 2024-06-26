"use client";
import React from "react";
import {
  ThemeProvider,
  useTheme,
  Theme,
  StyledEngineProvider,
} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Component, { Props } from "./Component";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

const cache = createCache({
  key: "css",
  prepend: true,
});

interface ReactUnsplashProps extends Partial<Props> {
  theme?: Theme;
  onSelect: (image: any) => void;
}

const ReactUnsplash = ({
  theme,
  displayMode = "normal",
  initValue = "",
  onSearch,
  onCommit,
  onSelect,
  images = [],
  loading,
  handleLoadMore,
  hasMore,
  open,
  onClose,
  width,
  height,
  cols,
  gap,
}: ReactUnsplashProps) => {
  const defaultTheme = useTheme();
  return (
    <StyledEngineProvider injectFirst>
      <CacheProvider value={cache}>
        <ThemeProvider theme={theme || defaultTheme}>
          <CssBaseline />
          <Component
            displayMode={displayMode}
            initValue={initValue}
            onSearch={onSearch}
            onCommit={onCommit}
            images={images}
            loading={loading}
            onSelect={onSelect}
            handleLoadMore={handleLoadMore}
            hasMore={hasMore}
            open={open}
            onClose={onClose}
            width={width}
            height={height}
            cols={cols}
            gap={gap}
          />
        </ThemeProvider>
      </CacheProvider>
    </StyledEngineProvider>
  );
};

export default ReactUnsplash;
