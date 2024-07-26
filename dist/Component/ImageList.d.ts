import React from "react";
import type { PartialDeep } from 'type-fest';
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
declare const _default: React.MemoExoticComponent<({ images, onSelect, handleLoadMore, hasMore, loading, allowLoadMore, loadMode, cols, gap, height, width, }: ImageListProps) => React.JSX.Element | null>;
export default _default;
//# sourceMappingURL=ImageList.d.ts.map