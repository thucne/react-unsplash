import React from "react";

import {
  TextField,
  InputAdornment,
  CircularProgress,
  Typography,
  useTheme,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/SearchRounded";
import Image from "next/image";
import UnsplashFull from "./Unsplash_Logo_Full.svg";

export interface SearchInputProps {
  search: string;
  setSearch: (value: string) => void;
  loading: boolean;
  isPopUp?: boolean;
  handleClose?: () => void;
  onCommit?: (value: string) => void;
}

const SearchInput = ({
  search,
  setSearch,
  loading,
  isPopUp,
  handleClose = () => {},
  onCommit,
}: SearchInputProps) => {
  const theme = useTheme();

  return (
    <TextField
      autoFocus
      fullWidth
      variant="outlined"
      size="medium"
      placeholder="Search photos"
      value={search}
      onChange={(e) => {
        const val = e.target.value;
        // allow max 64 characters
        if (val?.length > 64) {
          return;
        }
        setSearch(val);
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          onCommit?.(search);
        }
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment
            position="start"
            sx={{
              mr: 2,
              display: "flex",
              alignItems: "center",
              gap: 2,
              "&.MuiInputAdornment-root": {
                height: "auto",
                minWidth: "fit-content",
              },
            }}
          >
            {loading ? (
              <CircularProgress
                color="primary"
                size={20}
                sx={{
                  "& svg": {
                    width: 20,
                    height: 20,
                  },
                }}
              />
            ) : (
              <SearchIcon color="primary" />
            )}
            <Image
              src={UnsplashFull}
              alt="Unsplash Logo"
              width={search ? 20 : 87.63}
              height={20}
              style={{
                objectFit: "cover",
                objectPosition: "left",
                height: 20,
                width: search ? 20 : 87.63,
                transition: "width 0.3s",
                // white
                filter:
                  theme.palette.mode === "dark"
                    ? "brightness(0) invert(1)"
                    : "none",
              }}
            />
          </InputAdornment>
        ),
        endAdornment: isPopUp ? (
          <InputAdornment position="end">
            <Typography
              variant="caption"
              component="p"
              sx={{
                border: (theme) => `1px solid ${theme.palette.divider}`,
                borderRadius: "0.5rem",
                px: 1,
                py: 0.5,
                backgroundColor: (theme) =>
                  theme.palette.mode === "light"
                    ? theme.palette.grey[100]
                    : theme.palette.grey[800],
                cursor: "pointer",
                // on hover or focus, change border color
                "&:hover, &:focus": {
                  borderColor: "primary.main",
                  // disable focus ring
                  outline: "none",
                },
              }}
              onClick={handleClose}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" && isPopUp) {
                  e.preventDefault();
                  handleClose();
                }
              }}
            >
              esc
            </Typography>
          </InputAdornment>
        ) : null,
      }}
      sx={{
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
          input: {
            width: "auto",
          },
        },
      }}
    />
  );
};

export default SearchInput;
