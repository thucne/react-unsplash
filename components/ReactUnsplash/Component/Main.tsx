import React, { useState, useEffect } from "react";

import {
  Paper,
  Unstable_Grid2 as Grid,
  Typography,
  Divider,
  Box,
  LinearProgress,
} from "@mui/material";
import SearchInput from "./SearchInput";
import ImageList, { ImageListProps } from "./ImageList";

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

const Main = ({
  loading = false,
  handleClose = () => {},
  isPopUp = false,
  initValue,
  onSearch,
  onCommit,
  images = [],
  onSelect,
  handleLoadMore,
  hasMore,
  allowLoadMore,
  loadMode,
  cols,
  gap,
  height,
  width,
}: MainProps) => {
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (initValue) {
      setSearch(initValue);
      onSearch?.(initValue);
    }
  }, [initValue, onSearch]);

  const handleSearch = (search: string) => {
    setSearch(search);
    onSearch?.(search);
  };

  return (
    <Paper variant="outlined" sx={{ width: width ?? "100%", maxWidth: "100%" }}>
      <Grid container spacing={1} disableEqualOverflow>
        <Grid xs={12}>
          <Box pt={1} px={1}>
            <SearchInput
              search={search}
              setSearch={handleSearch}
              isPopUp={isPopUp}
              handleClose={handleClose}
              loading={loading}
              onCommit={onCommit}
            />
          </Box>
        </Grid>
        <Grid xs={12}>
          <LinearProgress
            aria-label="loading"
            sx={{
              width: "100%",
              visibility: loading ? "visible" : "hidden",
            }}
          />
          <Divider />
        </Grid>
        {search && !images?.length && !loading && (
          <Grid xs={12} mb={1}>
            <Typography variant="body1" align="center">
              No images found
            </Typography>
          </Grid>
        )}
        {!search && !images?.length && !loading && (
          <Grid xs={12} mb={1}>
            <Typography variant="body1" align="center">
              Try to search for something
            </Typography>
          </Grid>
        )}
        {images.length > 0 && (
          <Grid xs={12} mb={1}>
            <ImageList
              images={images}
              onSelect={onSelect}
              handleLoadMore={handleLoadMore}
              hasMore={hasMore}
              loading={loading}
              allowLoadMore={allowLoadMore}
              loadMode={loadMode}
              cols={cols}
              gap={gap}
              height={height}
              width={width}
            />
          </Grid>
        )}
      </Grid>
    </Paper>
  );
};

export default Main;
