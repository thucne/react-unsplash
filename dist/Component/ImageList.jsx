import React, { useCallback, useRef } from "react";
import { ImageList as MuiImageList, ImageListItem, Typography, useTheme, useMediaQuery, Box, Button, } from "@mui/material";
import Image from "next/image";
import { useElementDimensions } from "./hooks";
import Link from "next/link";
import { blurHashToBase64 } from "./helpers";
var useImageListCols = function (theme, width) {
    var isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    var isTablet = useMediaQuery(theme.breakpoints.down("md"));
    var isLarge = useMediaQuery(theme.breakpoints.down("lg"));
    var isExtraLarge = useMediaQuery(theme.breakpoints.down("xl"));
    if (width) {
        if (width < 400) {
            return 2;
        }
        else if (width < 600) {
            return 3;
        }
        else if (width < 800) {
            return 4;
        }
        else if (width < 1000) {
            return 5;
        }
        else {
            return 6;
        }
    }
    if (isMobile) {
        return 2;
    }
    else if (isTablet) {
        return 4;
    }
    else if (isLarge) {
        return 6;
    }
    else if (isExtraLarge) {
        return 8;
    }
    else {
        return 6;
    }
};
var ImageList = function (_a) {
    var images = _a.images, onSelect = _a.onSelect, handleLoadMore = _a.handleLoadMore, hasMore = _a.hasMore, loading = _a.loading, _b = _a.allowLoadMore, allowLoadMore = _b === void 0 ? true : _b, _c = _a.loadMode, loadMode = _c === void 0 ? "scroll" : _c, cols = _a.cols, gap = _a.gap, height = _a.height, width = _a.width;
    var imgRef = useRef(null);
    var imgWidth = useElementDimensions(imgRef).width;
    var theme = useTheme();
    var observer = useRef(null);
    var defaultCols = useImageListCols(theme, width);
    var lastItemRef = useCallback(function (node) {
        if (loading)
            return;
        if (observer.current) {
            observer.current.disconnect();
        }
        observer.current = new IntersectionObserver(function (entries) {
            if (entries[0].isIntersecting && hasMore) {
                handleLoadMore === null || handleLoadMore === void 0 ? void 0 : handleLoadMore();
            }
        }, { threshold: 1 });
        if (node) {
            observer.current.observe(node);
        }
    }, [hasMore, handleLoadMore, loading]);
    var getRef = function (idx) {
        if (idx === 0) {
            return imgRef;
        }
        if (idx === images.length - 1 && loadMode === "scroll") {
            return lastItemRef;
        }
        return null;
    };
    if (!images || !Array.isArray(images) || !(images === null || images === void 0 ? void 0 : images.length)) {
        return null;
    }
    return (<Box sx={{ height: height !== null && height !== void 0 ? height : 450, overflowY: "scroll" }}>
      <MuiImageList variant="masonry" cols={cols !== null && cols !== void 0 ? cols : defaultCols} gap={gap !== null && gap !== void 0 ? gap : 8}>
        {images.map(function (item, idx) {
            var _a, _b, _c;
            return (<ImageListItem key={item.id} ref={getRef(idx)} sx={{
                    height: "".concat(((imgWidth || 200) * item.height) / item.width, "px !important"),
                    overflow: "hidden",
                }}>
            <Image src={item.urls.small} alt={item.alt_description} width={imgWidth || 200} height={((imgWidth || 200) * item.height) / item.width} style={{
                    width: "100%",
                    height: ((imgWidth || 200) * item.height) / item.width,
                }} className="hover:brightness-75 transition-[filter] cursor-pointer" onClick={function () { return onSelect === null || onSelect === void 0 ? void 0 : onSelect(item); }} blurDataURL={blurHashToBase64(item.blur_hash, imgWidth || 200, ((imgWidth || 200) * item.height) / item.width)} placeholder="blur"/>
            <Link href={(_b = (_a = item.user) === null || _a === void 0 ? void 0 : _a.links) === null || _b === void 0 ? void 0 : _b.html}>
              <Typography variant="body2" className="absolute bottom-1 left-2 text-white hover:underline underline-offset-4 cursor-pointer">
                {(_c = item.user) === null || _c === void 0 ? void 0 : _c.name}
              </Typography>
            </Link>
          </ImageListItem>);
        })}
      </MuiImageList>
      {loading && (<Box className="w-full flex justify-center mt-1">
          <Typography variant="body1" align="center">
            Loading...
          </Typography>
        </Box>)}
      {hasMore && allowLoadMore && loadMode === "button" && (<Box className="w-full flex justify-center mt-1">
          <Button disabled={loading} onClick={function () { return handleLoadMore === null || handleLoadMore === void 0 ? void 0 : handleLoadMore(); }} sx={{
                textTransform: "none",
                "&:hover": {
                    backgroundColor: "transparent",
                },
            }} fullWidth disableRipple title={loading ? "Loading..." : "Load more photos"}>
            {loading ? "Loading..." : "More photos"}
          </Button>
        </Box>)}
    </Box>);
};
// memoize the component
export default React.memo(ImageList);
