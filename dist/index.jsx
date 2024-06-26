"use client";
import React from "react";
import { ThemeProvider, useTheme, StyledEngineProvider, } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Component from "./Component";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
var cache = createCache({
    key: "css",
    prepend: true,
});
var ReactUnsplash = function (_a) {
    var theme = _a.theme, _b = _a.displayMode, displayMode = _b === void 0 ? "normal" : _b, _c = _a.initValue, initValue = _c === void 0 ? "" : _c, onSearch = _a.onSearch, onCommit = _a.onCommit, onSelect = _a.onSelect, _d = _a.images, images = _d === void 0 ? [] : _d, loading = _a.loading, handleLoadMore = _a.handleLoadMore, hasMore = _a.hasMore, open = _a.open, onClose = _a.onClose, width = _a.width;
    var defaultTheme = useTheme();
    return (<StyledEngineProvider injectFirst>
      <CacheProvider value={cache}>
        <ThemeProvider theme={theme || defaultTheme}>
          <CssBaseline />
          <Component displayMode={displayMode} initValue={initValue} onSearch={onSearch} onCommit={onCommit} images={images} loading={loading} onSelect={onSelect} handleLoadMore={handleLoadMore} hasMore={hasMore} open={open} onClose={onClose} width={width}/>
        </ThemeProvider>
      </CacheProvider>
    </StyledEngineProvider>);
};
export default ReactUnsplash;
