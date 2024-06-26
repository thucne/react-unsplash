"use client";
import { useState, useMemo, useEffect, useCallback } from "react";
import ReactUnsplash from "./ReactUnsplash";
import {
  Button,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  CssBaseline
} from "@mui/material";
import { debounce } from "lodash";
import useSWR from "swr";
import Image from "next/image";
import { blurHashToBase64 } from "./ReactUnsplash/Component/helpers";
import { CacheProvider } from "@emotion/react";
import {
  ThemeProvider,
  useTheme,
  StyledEngineProvider,
} from "@mui/material/styles";
import createCache from "@emotion/cache";

const fetcher = (url: string) =>
  fetch(url, { cache: "force-cache" }).then((res) => res.json());

const URL = "/api/unsplash";

type UnsplashObj = {
  results: any[];
  total_pages: number;
  total: number;
};

const cache = createCache({
  key: "css",
  prepend: true,
});

const Preview = () => {
  const theme = useTheme();

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(false);
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [modeSwitch, setModeSwitch] = useState<"normal" | "popup">("normal");

  const query = search
    ? new URLSearchParams({
        query: search,
        page: page.toString(),
        per_page: "10",
      }).toString()
    : null;

  const { data, isLoading }: { data: UnsplashObj; isLoading: boolean } = useSWR(
    query ? `${URL}?${query}` : null,
    fetcher
  );

  const memoizedResults = useMemo(() => data?.results || [], [data]);

  useEffect(() => {
    if (page === 1) {
      setResults(memoizedResults || []);
    } else {
      setResults((prev) => [...prev, ...(memoizedResults || [])]);
    }
  }, [memoizedResults, page]);

  useEffect(() => {
    if (data?.total_pages) {
      setHasNext(data.total_pages > page);
    }
  }, [data, page]);

  const handleClose = () => {
    setOpen(false);
  };

  const searchNow = useCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, []);

  const handleNextPage = () => {
    setPage((prev) => prev + 1);
  };

  const debounceSearch = useMemo(() => debounce(searchNow, 1000), [searchNow]);

  const onSearch = (value: string) => {
    debounceSearch(value);
  };

  const onCommit = (value: string) => {
    searchNow(value);
  };

  const onSelect = (image: any) => {
    setSelectedImage(image);
  };

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    modeSwitch: "normal" | "popup"
  ) => {
    if (modeSwitch !== null) {
      setModeSwitch(modeSwitch);
    }
  };

  return (
    <StyledEngineProvider injectFirst>
      <CacheProvider value={cache}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="w-screen flex pb-10 pt-2 px-2 justify-center">
            <div className="w-full max-w-[700px] flex items-center flex-col">
              <Typography variant="h5" className="mb-4 font-semibold">
                Display Mode
              </Typography>
              <ToggleButtonGroup
                color="primary"
                value={modeSwitch}
                exclusive
                onChange={handleChange}
                aria-label="Display Mode"
                size="small"
                className="mb-4"
              >
                <ToggleButton value="normal">Normal</ToggleButton>
                <ToggleButton value="popup">Pop Up</ToggleButton>
              </ToggleButtonGroup>
              {modeSwitch === "popup" && (
                <Button
                  className="normal-case mb-4"
                  fullWidth
                  variant="contained"
                  onClick={() => setOpen(true)}
                >
                  Open
                </Button>
              )}
              <ReactUnsplash
                open={open}
                loading={isLoading}
                onSearch={onSearch}
                onCommit={onCommit}
                onSelect={onSelect}
                onClose={handleClose}
                images={results}
                handleLoadMore={handleNextPage}
                hasMore={hasNext}
                displayMode={modeSwitch}
                width={700}
              />

              {selectedImage && (
                <div className="mt-4 border w-full">
                  <Image
                    src={selectedImage.urls.regular}
                    alt={selectedImage.alt_description}
                    width={700}
                    height={(700 * selectedImage.height) / selectedImage.width}
                    className="hover:brightness-75 transition-[filter] cursor-pointer"
                    onClick={() => setSelectedImage(null)}
                    blurDataURL={blurHashToBase64(
                      selectedImage.blur_hash,
                      700,
                      (700 * selectedImage.height) / selectedImage.width
                    )}
                    placeholder="blur"
                  />
                </div>
              )}
            </div>
          </div>
        </ThemeProvider>
      </CacheProvider>
    </StyledEngineProvider>
  );
};

export default Preview;
