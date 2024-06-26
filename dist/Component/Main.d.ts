import React from "react";
import { ImageListProps } from "./ImageList";
export interface MainProps extends Partial<ImageListProps> {
    loading?: boolean;
    handleClose?: () => void;
    isPopUp?: boolean;
    initValue?: string;
    onSearch?: (value: string) => void;
    onCommit?: (value: string) => void;
    images?: any[];
    onSelect: (image: any) => void;
    handleLoadMore?: () => void;
    hasMore?: boolean;
}
declare const Main: ({ loading, handleClose, isPopUp, initValue, onSearch, onCommit, images, onSelect, handleLoadMore, hasMore, allowLoadMore, loadMode, }: MainProps) => React.JSX.Element;
export default Main;
//# sourceMappingURL=Main.d.ts.map