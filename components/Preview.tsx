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
    <div className="w-screen flex pb-10 pt-4 px-4 justify-center">
      <div className="w-full max-w-[720px] flex items-center flex-col gap-4">
        {/* Mode toggle */}
        <div className="flex items-center gap-2 text-sm font-medium">
          <span className="text-gray-600">Display Mode:</span>
          {(["normal", "popup"] as const).map((m) => (
            <button
              key={m}
              onClick={() => setModeSwitch(m)}
              style={{
                padding: "0.35rem 0.9rem",
                borderRadius: "0.5rem",
                border: "1px solid",
                borderColor: modeSwitch === m ? "#18181b" : "#e4e4e7",
                backgroundColor: modeSwitch === m ? "#18181b" : "transparent",
                color: modeSwitch === m ? "#fafafa" : "#18181b",
                cursor: "pointer",
                textTransform: "capitalize",
              }}
            >
              {m}
            </button>
          ))}
        </div>

        {/* Popup trigger */}
        {modeSwitch === "popup" && (
          <button
            onClick={() => setOpen(true)}
            style={{
              width: "100%",
              padding: "0.5rem 1rem",
              borderRadius: "0.5rem",
              border: "1px solid #18181b",
              backgroundColor: "#18181b",
              color: "#fafafa",
              cursor: "pointer",
              fontSize: "0.875rem",
            }}
          >
            Open Photo Picker
          </button>
        )}

        {/* The library component */}
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
          width={700}
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

        {/* Selected image preview */}
        {selectedImage && (
          <div
            style={{
              marginTop: "1rem",
              border: "1px solid #e4e4e7",
              borderRadius: "0.5rem",
              overflow: "hidden",
              width: "100%",
            }}
          >
            <Image
              src={selectedImage.urls.regular}
              alt={selectedImage.alt_description ?? ""}
              width={700}
              height={Math.round(
                (700 * selectedImage.height) / selectedImage.width
              )}
              style={{ width: "100%", height: "auto", cursor: "pointer" }}
              onClick={() => setSelectedImage(null)}
              blurDataURL={
                selectedImage.blur_hash
                  ? blurHashToDataURL(selectedImage.blur_hash)
                  : undefined
              }
              placeholder={selectedImage.blur_hash ? "blur" : "empty"}
              unoptimized
            />
            <div
              style={{
                padding: "0.5rem 0.75rem",
                fontSize: "0.75rem",
                color: "#71717a",
                borderTop: "1px solid #e4e4e7",
              }}
            >
              Photo by{" "}
              <a
                href={selectedImage.user.links.html}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "underline" }}
              >
                {selectedImage.user.name}
              </a>{" "}
              on Unsplash · Click to deselect
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Preview;
