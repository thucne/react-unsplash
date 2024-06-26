import React from "react";
import { TextField, InputAdornment, CircularProgress, Typography, useTheme, } from "@mui/material";
import SearchIcon from "@mui/icons-material/SearchRounded";
import Image from "next/image";
import UnsplashFull from "./Unsplash_Logo_Full.svg";
var SearchInput = function (_a) {
    var search = _a.search, setSearch = _a.setSearch, loading = _a.loading, isPopUp = _a.isPopUp, _b = _a.handleClose, handleClose = _b === void 0 ? function () { } : _b, onCommit = _a.onCommit;
    var theme = useTheme();
    return (<TextField autoFocus fullWidth variant="outlined" size="medium" placeholder="Search photos" value={search} onChange={function (e) {
            var val = e.target.value;
            // allow max 64 characters
            if ((val === null || val === void 0 ? void 0 : val.length) > 64) {
                return;
            }
            setSearch(val);
        }} onKeyDown={function (e) {
            if (e.key === "Enter") {
                e.preventDefault();
                onCommit === null || onCommit === void 0 ? void 0 : onCommit(search);
            }
        }} InputProps={{
            startAdornment: (<InputAdornment position="start" sx={{
                    mr: 2,
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                }}>
            {loading ? (<CircularProgress color="primary" size={20} sx={{
                        "& svg": {
                            width: 20,
                            height: 20,
                        },
                    }}/>) : (<SearchIcon />)}
            <Image src={UnsplashFull} alt="Unsplash Logo" width={search ? 20 : 87.63} height={20} style={{
                    objectFit: "cover",
                    objectPosition: "left",
                    height: 20,
                    width: search ? 20 : 87.63,
                    transition: "width 0.3s",
                    // white
                    filter: theme.palette.mode === "dark"
                        ? "brightness(0) invert(1)"
                        : "none",
                }}/>
          </InputAdornment>),
            endAdornment: isPopUp ? (<InputAdornment position="end">
            <Typography variant="caption" component="p" sx={{
                    border: function (theme) { return "1px solid ".concat(theme.palette.divider); },
                    borderRadius: "0.5rem",
                    px: 1,
                    py: 0.5,
                    backgroundColor: function (theme) {
                        return theme.palette.mode === "light"
                            ? theme.palette.grey[100]
                            : theme.palette.grey[800];
                    },
                    cursor: "pointer",
                    // on hover or focus, change border color
                    "&:hover, &:focus": {
                        borderColor: "primary.main",
                        // disable focus ring
                        outline: "none",
                    },
                }} onClick={handleClose} tabIndex={0} onKeyDown={function (e) {
                    if (e.key === "Enter" && isPopUp) {
                        e.preventDefault();
                        handleClose();
                    }
                }}>
              esc
            </Typography>
          </InputAdornment>) : null,
        }} sx={{
            "& fieldset": {
                border: "none !important",
            },
            "&& input:valid + fieldset": {
                border: "none !important",
            },
            "&& input:valid:focus + fieldset": {
                border: "none !important",
            },
            "& .MuiInputBase-root": {
                fontSize: "1.2rem",
                paddingLeft: 0,
            },
        }}/>);
};
export default SearchInput;
