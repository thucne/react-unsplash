import React from "react";
export interface ImageListProps {
    images: any[];
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