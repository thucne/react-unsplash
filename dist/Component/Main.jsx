import React, { useState, useEffect } from "react";
import { Paper, Unstable_Grid2 as Grid, Typography, Divider, Box, LinearProgress, } from "@mui/material";
import SearchInput from "./SearchInput";
import ImageList from "./ImageList";
var Main = function (_a) {
    var _b = _a.loading, loading = _b === void 0 ? false : _b, _c = _a.handleClose, handleClose = _c === void 0 ? function () { } : _c, _d = _a.isPopUp, isPopUp = _d === void 0 ? false : _d, initValue = _a.initValue, onSearch = _a.onSearch, onCommit = _a.onCommit, _e = _a.images, images = _e === void 0 ? [] : _e, onSelect = _a.onSelect, handleLoadMore = _a.handleLoadMore, hasMore = _a.hasMore, allowLoadMore = _a.allowLoadMore, loadMode = _a.loadMode, cols = _a.cols, gap = _a.gap, height = _a.height, width = _a.width;
    var _f = useState(""), search = _f[0], setSearch = _f[1];
    useEffect(function () {
        if (initValue) {
            setSearch(initValue);
            onSearch === null || onSearch === void 0 ? void 0 : onSearch(initValue);
        }
    }, [initValue, onSearch]);
    var handleSearch = function (search) {
        setSearch(search);
        onSearch === null || onSearch === void 0 ? void 0 : onSearch(search);
    };
    return (<Paper variant="outlined" sx={{ width: "100%" }}>
      <Grid container spacing={1} disableEqualOverflow>
        <Grid xs={12}>
          <Box pt={1} px={1}>
            <SearchInput search={search} setSearch={handleSearch} isPopUp={isPopUp} handleClose={handleClose} loading={loading} onCommit={onCommit}/>
          </Box>
        </Grid>
        <Grid xs={12}>
          <LinearProgress aria-label="loading" sx={{
            width: "100%",
            visibility: loading ? "visible" : "hidden",
        }}/>
          <Divider />
        </Grid>
        {search && !(images === null || images === void 0 ? void 0 : images.length) && !loading && (<Grid xs={12} mb={1}>
            <Typography variant="body1" align="center">
              No images found
            </Typography>
          </Grid>)}
        {!search && !(images === null || images === void 0 ? void 0 : images.length) && !loading && (<Grid xs={12} mb={1}>
            <Typography variant="body1" align="center">
              Try to search for something
            </Typography>
          </Grid>)}
        {images.length > 0 && (<Grid xs={12} mb={1}>
            <ImageList images={images} onSelect={onSelect} handleLoadMore={handleLoadMore} hasMore={hasMore} loading={loading} allowLoadMore={allowLoadMore} loadMode={loadMode} cols={cols} gap={gap} height={height} width={width}/>
          </Grid>)}
      </Grid>
    </Paper>);
};
export default Main;
