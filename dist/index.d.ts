import React from "react";
import { Theme } from "@mui/material/styles";
import { Props } from "./Component";
interface ReactUnsplashProps extends Partial<Props> {
    theme?: Theme;
    onSelect: (image: any) => void;
}
declare const ReactUnsplash: ({ theme, displayMode, initValue, onSearch, onCommit, onSelect, images, loading, handleLoadMore, hasMore, open, onClose, width, height, cols, gap, }: ReactUnsplashProps) => React.JSX.Element;
export default ReactUnsplash;
//# sourceMappingURL=index.d.ts.map