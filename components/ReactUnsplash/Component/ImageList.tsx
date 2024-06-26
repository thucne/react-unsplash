import React, { useCallback, useRef } from "react";

import {
  ImageList as MuiImageList,
  ImageListItem,
  Typography,
  useTheme,
  useMediaQuery,
  Box,
  Button,
} from "@mui/material";
import Image from "next/image";
import { useElementDimensions } from "./hooks";
import Link from "next/link";
import { blurHashToBase64 } from "./helpers";

export interface ImageListProps {
  images: any[];
  onSelect: (image: any) => void;
  handleLoadMore?: () => void;
  hasMore?: boolean;
  loading?: boolean;
  allowLoadMore?: boolean;
  loadMode?: "scroll" | "button";
}

const ImageList = ({
  images,
  onSelect,
  handleLoadMore,
  hasMore,
  loading,
  allowLoadMore = true,
  loadMode = "scroll",
}: ImageListProps) => {
  const imgRef = useRef<any>(null);
  const { width: imgWidth } = useElementDimensions(imgRef);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const observer = useRef<IntersectionObserver | null>(null);

  const lastItemRef = useCallback(
    (node: any) => {
      if (loading) return;

      if (observer.current) {
        observer.current.disconnect();
      }

      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore) {
            handleLoadMore?.();
          }
        },
        { threshold: 1 }
      );

      if (node) {
        observer.current.observe(node);
      }
    },
    [hasMore, handleLoadMore, loading]
  );

  const getRef = (idx: number) => {
    if (idx === 0) {
      return imgRef;
    }

    if (idx === images.length - 1 && loadMode === "scroll") {
      return lastItemRef;
    }

    return null;
  };

  if (!images || !Array.isArray(images) || !images?.length) {
    return null;
  }

  return (
    <Box sx={{ height: 450, overflowY: "scroll" }}>
      <MuiImageList variant="masonry" cols={isMobile ? 2 : 3} gap={8}>
        {images.map((item, idx) => (
          <ImageListItem
            key={item.id}
            ref={getRef(idx)}
            sx={{
              height: `${
                ((imgWidth || 200) * item.height) / item.width
              }px !important`,
              overflow: "hidden",
            }}
          >
            <Image
              src={item.urls.small}
              alt={item.alt_description}
              width={imgWidth || 200}
              height={((imgWidth || 200) * item.height) / item.width}
              style={{
                width: "100%",
                height: ((imgWidth || 200) * item.height) / item.width,
              }}
              className="hover:brightness-75 transition-[filter] cursor-pointer"
              onClick={() => onSelect?.(item)}
              blurDataURL={blurHashToBase64(
                item.blur_hash,
                imgWidth || 200,
                ((imgWidth || 200) * item.height) / item.width
              )}
              placeholder="blur"
            />
            <Link href={item.user?.links?.html}>
              <Typography
                variant="body2"
                className="absolute bottom-1 left-2 text-white hover:underline underline-offset-4 cursor-pointer"
              >
                {item.user?.name}
              </Typography>
            </Link>
          </ImageListItem>
        ))}
      </MuiImageList>
      {loading && (
        <Box className="w-full flex justify-center mt-1">
          <Typography variant="body1" align="center">
            Loading...
          </Typography>
        </Box>
      )}
      {hasMore && allowLoadMore && loadMode === "button" && (
        <Box className="w-full flex justify-center mt-1">
          <Button
            disabled={loading}
            onClick={() => handleLoadMore?.()}
            sx={{
              textTransform: "none",
              "&:hover": {
                backgroundColor: "transparent",
              },
            }}
            fullWidth
            disableRipple
            title={loading ? "Loading..." : "Load more photos"}
          >
            {loading ? "Loading..." : "More photos"}
          </Button>
        </Box>
      )}
    </Box>
  );
};

// memoize the component
export default React.memo(ImageList);
