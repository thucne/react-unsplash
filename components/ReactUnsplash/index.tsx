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
  width?: string | number;
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
  width
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
          />
        </ThemeProvider>
      </CacheProvider>
    </StyledEngineProvider>
  );
};

export default ReactUnsplash;
