"use client";
import React from "react";
import Component from "./Component";
var ReactUnsplash = function (_a) {
    var _b = _a.displayMode, displayMode = _b === void 0 ? "normal" : _b, _c = _a.initValue, initValue = _c === void 0 ? "" : _c, onSearch = _a.onSearch, onCommit = _a.onCommit, onSelect = _a.onSelect, _d = _a.images, images = _d === void 0 ? [] : _d, loading = _a.loading, handleLoadMore = _a.handleLoadMore, hasMore = _a.hasMore, open = _a.open, onClose = _a.onClose, width = _a.width, height = _a.height, cols = _a.cols, gap = _a.gap;
    return (<Component displayMode={displayMode} initValue={initValue} onSearch={onSearch} onCommit={onCommit} images={images} loading={loading} onSelect={onSelect} handleLoadMore={handleLoadMore} hasMore={hasMore} open={open} onClose={onClose} width={width} height={height} cols={cols} gap={gap}/>);
};
export default ReactUnsplash;
