import React from "react";
import { PopUpWrapperProps } from "./PopUpWrapper";
import { MainProps } from "./Main";
export interface Props extends Partial<PopUpWrapperProps>, Partial<MainProps> {
    displayMode: "normal" | "popup";
    onClose?: () => void;
    onSelect: (image: any) => void;
}
declare const Component: ({ displayMode, open, onClose, initValue, onSearch, onCommit, images, loading, onSelect, handleLoadMore, hasMore, width, height, cols, gap, ...rest }: Props) => React.JSX.Element;
export default Component;
//# sourceMappingURL=index.d.ts.map