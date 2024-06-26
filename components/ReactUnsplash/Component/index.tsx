import React from "react";

import PopUpWrapper, { PopUpWrapperProps } from "./PopUpWrapper";
import Main, { MainProps } from "./Main";

export interface Props extends Partial<PopUpWrapperProps>, Partial<MainProps> {
  displayMode: "normal" | "popup";
  onClose?: () => void;
  onSelect: (image: any) => void;
  width?: string | number;
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
        />
      </PopUpWrapper>
    );
  }

  return (
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
    />
  );
};

export default Component;
