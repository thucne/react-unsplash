import React from "react";

import PopUpWrapper, { PopUpWrapperProps } from "./PopUpWrapper";
import Main, { MainProps } from "./Main";

export interface Props extends Partial<PopUpWrapperProps>, Partial<MainProps> {
  displayMode: "normal" | "popup";
  onClose?: () => void;
  onSelect: (image: any) => void;
}

const Component = ({
  displayMode,
  open = false,
  onClose = () => {},
  initValue,
  onSearch,
  onCommit,
  images,
  loading,
  onSelect,
  handleLoadMore,
  hasMore,
  width,
  height,
  cols,
  gap,
  ...rest
}: Props) => {
  if (displayMode === "popup") {
    return (
      <PopUpWrapper open={open} onClose={onClose} width={width} {...rest}>
        <Main
          handleClose={onClose}
          initValue={initValue}
          onSearch={onSearch}
          onCommit={onCommit}
          loading={loading}
          isPopUp={true}
          images={images}
          onSelect={onSelect}
          handleLoadMore={handleLoadMore}
          hasMore={hasMore}
          cols={cols}
          gap={gap}
          height={height}
          width={width}
        />
      </PopUpWrapper>
    );
  }

  return (
    <div style={{ width: width ?? "100%" }}>
      <Main
        handleClose={onClose}
        initValue={initValue}
        onSearch={onSearch}
        onCommit={onCommit}
        loading={loading}
        images={images}
        onSelect={onSelect}
        handleLoadMore={handleLoadMore}
        hasMore={hasMore}
        cols={cols}
        gap={gap}
        height={height}
        width={width}
      />
    </div>
  );
};

export default Component;
