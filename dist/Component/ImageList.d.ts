import React from "react";
export interface ImageListProps {
    images: any[];
    onSelect: (image: any) => void;
    handleLoadMore?: () => void;
    hasMore?: boolean;
    loading?: boolean;
    allowLoadMore?: boolean;
    loadMode?: "scroll" | "button";
}
declare const _default: React.MemoExoticComponent<({ images, onSelect, handleLoadMore, hasMore, loading, allowLoadMore, loadMode, }: ImageListProps) => React.JSX.Element | null>;
export default _default;
//# sourceMappingURL=ImageList.d.ts.map