var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React from "react";
import PopUpWrapper from "./PopUpWrapper";
import Main from "./Main";
var Component = function (_a) {
    var displayMode = _a.displayMode, _b = _a.open, open = _b === void 0 ? false : _b, _c = _a.onClose, onClose = _c === void 0 ? function () { } : _c, initValue = _a.initValue, onSearch = _a.onSearch, onCommit = _a.onCommit, images = _a.images, loading = _a.loading, onSelect = _a.onSelect, handleLoadMore = _a.handleLoadMore, hasMore = _a.hasMore, width = _a.width, height = _a.height, cols = _a.cols, gap = _a.gap, rest = __rest(_a, ["displayMode", "open", "onClose", "initValue", "onSearch", "onCommit", "images", "loading", "onSelect", "handleLoadMore", "hasMore", "width", "height", "cols", "gap"]);
    if (displayMode === "popup") {
        return (<PopUpWrapper open={open} onClose={onClose} width={width} {...rest}>
        <Main handleClose={onClose} initValue={initValue} onSearch={onSearch} onCommit={onCommit} loading={loading} isPopUp={true} images={images} onSelect={onSelect} handleLoadMore={handleLoadMore} hasMore={hasMore} cols={cols} gap={gap} height={height} width={width}/>
      </PopUpWrapper>);
    }
    return (<div style={{ width: width !== null && width !== void 0 ? width : "100%", maxWidth: "100%", position: "relative" }}>
      <Main handleClose={onClose} initValue={initValue} onSearch={onSearch} onCommit={onCommit} loading={loading} images={images} onSelect={onSelect} handleLoadMore={handleLoadMore} hasMore={hasMore} cols={cols} gap={gap} height={height} width={width}/>
    </div>);
};
export default Component;
