"use client";
import React from "react";
import Component, { Props } from "./Component";
interface ReactUnsplashProps extends Partial<Props> {
  onSelect: (image: any) => void;
}

const ReactUnsplash = ({
  displayMode = "normal",
  initValue = "",
  onSearch,
  onCommit,
  onSelect,
  images = [],
  loading,
  handleLoadMore,
  hasMore,
  open,
  onClose,
  width,
  height,
  cols,
  gap,
}: ReactUnsplashProps) => {
  return (
    <Component
      displayMode={displayMode}
      initValue={initValue}
      onSearch={onSearch}
      onCommit={onCommit}
      images={images}
      loading={loading}
      onSelect={onSelect}
      handleLoadMore={handleLoadMore}
      hasMore={hasMore}
      open={open}
      onClose={onClose}
      width={width}
      height={height}
      cols={cols}
      gap={gap}
    />
  );
};

export default ReactUnsplash;
