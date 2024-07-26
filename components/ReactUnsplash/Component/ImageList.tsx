import React, { useCallback, useRef } from "react";

import {
  ImageList as MuiImageList,
  ImageListItem,
  Typography,
  useTheme,
  useMediaQuery,
  Box,
  Button,
  Theme,
} from "@mui/material";
import Image from "next/image";
import { useElementDimensions } from "./hooks";
import Link from "next/link";
import { blurHashToBase64 } from "./helpers";
import type {PartialDeep} from 'type-fest'
import BrokenImage from "./image-broken.jpg";

const useImageListCols = (theme: Theme, width?: number) => {
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const isLarge = useMediaQuery(theme.breakpoints.down("lg"));
  const isExtraLarge = useMediaQuery(theme.breakpoints.down("xl"));

  if (width) {
    if (width < 400) {
      return 2;
    } else if (width < 600) {
      return 3;
    } else if (width < 800) {
      return 4;
    } else if (width < 1000) {
      return 5;
    } else {
      return 6;
    }
  }

  if (isMobile) {
    return 2;
  } else if (isTablet) {
    return 4;
  } else if (isLarge) {
    return 6;
  } else if (isExtraLarge) {
    return 8;
  } else {
    return 6;
  }
};

type AlternativeSlugs = {
  [key: string]: string;
};

type Breadcrumb = {
  slug: string;
  title: string;
  index: number;
  type: string;
};

type Urls = {
  raw: string;
  full: string;
  regular: string;
  small: string;
  thumb: string;
  small_s3: string;
};

type Links = {
  self: string;
  html: string;
  download: string;
  download_location: string;
};

type ProfileImage = {
  small: string;
  medium: string;
  large: string;
};

type UserLinks = {
  self: string;
  html: string;
  photos: string;
  likes: string;
  portfolio: string;
  following: string;
  followers: string;
};

type UserSocial = {
  instagram_username: string | null;
  portfolio_url: string | null;
  twitter_username: string | null;
  paypal_email: string | null;
};

type User = {
  id: string;
  updated_at: string;
  username: string;
  name: string;
  first_name: string;
  last_name: string;
  twitter_username: string | null;
  portfolio_url: string | null;
  bio: string;
  location: string | null;
  links: UserLinks;
  profile_image: ProfileImage;
  instagram_username: string;
  total_collections: number;
  total_likes: number;
  total_photos: number;
  total_promoted_photos: number;
  total_illustrations: number;
  total_promoted_illustrations: number;
  accepted_tos: boolean;
  for_hire: boolean;
  social: UserSocial;
};

type TagAncestry = {
  type: {
    slug: string;
    pretty_slug: string;
  };
  category: {
    slug: string;
    pretty_slug: string;
  };
  subcategory?: {
    slug: string;
    pretty_slug: string;
  };
};

type TagSourceCoverPhoto = {
  id: string;
  slug: string;
  alternative_slugs: Record<string, string>;
  created_at: string;
  updated_at: string;
  promoted_at: string | null;
  width: number;
  height: number;
  color: string;
  blur_hash: string;
  description: string;
  alt_description: string;
  breadcrumbs: Breadcrumb[];
  urls: Urls;
  links: Links;
  likes: number;
  liked_by_user: boolean;
  current_user_collections: any[];
  sponsorship: any;
  topic_submissions: Record<string, any>;
  asset_type: string;
  premium: boolean;
  plus: boolean;
  user: User;
};

type TagSource = {
  ancestry: TagAncestry;
  title: string;
  subtitle: string;
  description: string;
  meta_title: string;
  meta_description: string;
  cover_photo: TagSourceCoverPhoto;
};

type Tag = {
  type: string;
  title: string;
  source?: TagSource;
};

type Photo = {
  id: string;
  slug: string;
  alternative_slugs: AlternativeSlugs;
  created_at: string;
  updated_at: string;
  promoted_at: string;
  width: number;
  height: number;
  color: string;
  blur_hash?: string;
  description: string;
  alt_description: string;
  breadcrumbs: PartialDeep<Breadcrumb>[];
  urls: PartialDeep<Urls>;
  links: PartialDeep<Links>;
  likes: number;
  liked_by_user: boolean;
  current_user_collections: any[];
  sponsorship: any;
  topic_submissions: Record<string, any>;
  asset_type: string;
  user: PartialDeep<User>;
  tags: PartialDeep<Tag>[];
};

export type UnsplashImage = Photo[];

export interface ImageListProps {
  images: UnsplashImage;
  onSelect: (image: any) => void;
  handleLoadMore?: () => void;
  hasMore?: boolean;
  loading?: boolean;
  allowLoadMore?: boolean;
  loadMode?: "scroll" | "button";
  cols?: number;
  gap?: number;
  height?: number;
  width?: number;
}

const ImageList = ({
  images,
  onSelect,
  handleLoadMore,
  hasMore,
  loading,
  allowLoadMore = true,
  loadMode = "scroll",
  cols,
  gap,
  height,
  width,
}: ImageListProps) => {
  const imgRef = useRef<any>(null);
  const { width: imgWidth } = useElementDimensions(imgRef);
  const theme = useTheme();
  const observer = useRef<IntersectionObserver | null>(null);
  const defaultCols = useImageListCols(theme, width);

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
    <Box sx={{ height: height ?? 450, overflowY: "scroll" }}>
      <MuiImageList variant="masonry" cols={cols ?? defaultCols} gap={gap ?? 8}>
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
            <Box
              sx={{
                cursor: "pointer",
                ":hover": {
                  filter: "brightness(0.75)",
                },
              }}
            >
              <Image
                src={item.urls.small ?? BrokenImage}
                alt={item.alt_description}
                width={imgWidth || 200}
                height={((imgWidth || 200) * item.height) / item.width}
                style={{
                  width: "100%",
                  height: ((imgWidth || 200) * item.height) / item.width,
                  objectFit: "contain",
                }}
                onClick={() => onSelect?.(item)}
                blurDataURL={
                  item?.blur_hash
                    ? blurHashToBase64(
                        item.blur_hash,
                        imgWidth || 200,
                        ((imgWidth || 200) * item.height) / item.width
                      )
                    : undefined
                }
                placeholder={item?.blur_hash ? "blur" : "empty"}
              />
            </Box>
            <Link href={item.user?.links?.html ?? '#'}>
              <Typography
                variant="body2"
                sx={{
                  position: "absolute",
                  bottom: 4,
                  left: 8,
                  color: "white",
                  cursor: "pointer",
                  ":hover": {
                    textDecoration: "underline",
                    textUnderlineOffset: "4px",
                  },
                }}
              >
                {item.user?.name}
              </Typography>
            </Link>
          </ImageListItem>
        ))}
      </MuiImageList>
      {loading && (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            mt: 4,
          }}
        >
          <Typography variant="body1" align="center">
            Loading...
          </Typography>
        </Box>
      )}
      {hasMore && allowLoadMore && loadMode === "button" && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 4,
            width: "100%",
          }}
        >
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
