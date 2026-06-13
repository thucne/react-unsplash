"use client";

import { useState, useMemo, useCallback } from "react";
import ReactUnsplash from "../src/components/ReactUnsplash";
import type { UnsplashPhoto } from "../src/components/ReactUnsplash/types";
import "../src/styles/react-unsplash.css";
import { debounce } from "lodash";
import useSWR from "swr";
import Image from "next/image";
import NextLink from "next/link";
import { blurHashToDataURL } from "../src/components/ReactUnsplash/helpers";

const fetcher = (url: string) =>
  fetch(url, { cache: "force-cache" }).then((res) => res.json());

const API_URL = "/api/unsplash";

type UnsplashApiResponse = {
  results: UnsplashPhoto[];
  total_pages: number;
  total: number;
};

const Preview = () => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<UnsplashPhoto[]>([]);
  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(false);
  const [selectedImage, setSelectedImage] = useState<UnsplashPhoto | null>(null);
  const [modeSwitch, setModeSwitch] = useState<"normal" | "popup">("normal");
  const [currentSearch, setCurrentSearch] = useState("");

  const query = search
    ? new URLSearchParams({
        query: search,
        page: page.toString(),
        per_page: "20",
      }).toString()
    : null;

  const { data, isLoading } = useSWR<UnsplashApiResponse>(
    query ? `${API_URL}?${query}` : null,
    fetcher
  );

  const memoizedResults = useMemo(() => data?.results || [], [data]);

  // Accumulate pages
  useMemo(() => {
    if (!memoizedResults.length) return;
    if (page === 1) {
      setResults(memoizedResults);
    } else {
      setResults((prev) => [...prev, ...memoizedResults]);
    }
  }, [memoizedResults, page]);

  useMemo(() => {
    if (data?.total_pages) {
      setHasNext(data.total_pages > page);
    }
  }, [data, page]);

  const handleClose = () => setOpen(false);

  const searchNow = useCallback(
    (value: string) => {
      if (isLoading) return;
      if (value === currentSearch) return;
      setPage(1);
      setSearch(value);
      setCurrentSearch(value);
    },
    [currentSearch, isLoading]
  );

  const handleNextPage = () => setPage((prev) => prev + 1);

  const debounceSearch = useMemo(
    () => debounce(searchNow, 800),
    [searchNow]
  );

  const onSelect = (photo: UnsplashPhoto) => setSelectedImage(photo);

  return (
    <div className="w-full flex pb-12 pt-4 px-4 justify-center">
      <div className="w-full max-w-[700px] flex flex-col gap-6">
        {/* Controls row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
          {/* Mode toggle */}
          <div className="flex items-center gap-2 text-sm font-medium">
            <span className="text-muted-foreground mr-1">Display Mode:</span>
            <div className="inline-flex rounded-lg border border-border p-0.5 bg-muted/40">
              {(["normal", "popup"] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => {
                    setModeSwitch(m);
                    if (m === "normal") setOpen(false);
                  }}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all duration-200 capitalize cursor-pointer ${
                    modeSwitch === m
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          {/* Popup trigger */}
          {modeSwitch === "popup" && (
            <button
              onClick={() => setOpen(true)}
              className="px-4 py-2 rounded-lg border border-border bg-primary text-primary-foreground hover:bg-primary/90 font-medium text-sm transition-colors shadow-sm cursor-pointer"
            >
              Open Photo Picker
            </button>
          )}
        </div>

        {/* The library component */}
        <div className="w-full rounded-xl overflow-hidden border border-border bg-card shadow-sm">
          <ReactUnsplash
            open={open}
            loading={isLoading}
            onSearch={(v) => debounceSearch(v)}
            onCommit={searchNow}
            onSelect={onSelect}
            onClose={handleClose}
            images={results}
            handleLoadMore={handleNextPage}
            hasMore={hasNext}
            displayMode={modeSwitch}
            // Demonstrate renderImage with next/image
            renderImage={(props) => (
              <Image
                src={props.src}
                alt={props.alt}
                width={props.width}
                height={props.height}
                style={props.style}
                onClick={props.onClick}
                placeholder={props.placeholder ? "blur" : "empty"}
                blurDataURL={props.placeholder}
                unoptimized
              />
            )}
            // Demonstrate renderLink with next/link
            renderLink={(props) => (
              <NextLink
                href={props.href}
                target={props.target}
                rel={props.rel}
                className={props.className}
                onClick={(e) => e.stopPropagation()}
              >
                {props.children}
              </NextLink>
            )}
          />
        </div>

        {/* Selected image preview */}
        {selectedImage && (
          <div className="mt-4 border border-border rounded-xl overflow-hidden w-full bg-card shadow-sm hover:shadow-md transition-shadow">
            <div className="relative group overflow-hidden">
              <Image
                src={selectedImage.urls.regular}
                alt={selectedImage.alt_description ?? ""}
                width={700}
                height={Math.round(
                  (700 * selectedImage.height) / selectedImage.width
                )}
                style={{ width: "100%", height: "auto" }}
                className="transition-transform duration-300 group-hover:scale-[1.005] cursor-pointer"
                onClick={() => setSelectedImage(null)}
                blurDataURL={
                  selectedImage.blur_hash
                    ? blurHashToDataURL(selectedImage.blur_hash)
                    : undefined
                }
                placeholder={selectedImage.blur_hash ? "blur" : "empty"}
                unoptimized
              />
            </div>
            <div className="px-4 py-3 text-xs text-muted-foreground border-t border-border bg-muted/10 flex justify-between items-center">
              <span>
                Photo by{" "}
                <a
                  href={selectedImage.user.links.html}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-foreground hover:underline"
                >
                  {selectedImage.user.name}
                </a>{" "}
                on{" "}
                <a
                  href="https://unsplash.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-foreground hover:underline"
                >
                  Unsplash
                </a>
              </span>
              <button
                onClick={() => setSelectedImage(null)}
                className="text-muted-foreground hover:text-foreground font-medium transition-colors cursor-pointer"
              >
                Deselect
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Preview;
