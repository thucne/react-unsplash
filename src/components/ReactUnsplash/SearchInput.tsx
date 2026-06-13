'use client';
import React, { useEffect, useRef, useState } from 'react';
import { useUnsplashContext } from './context';
import { cn } from './helpers';

// Inline SVG for search icon
const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

// Inline SVG spinner for loading state
const SpinnerIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ animation: 'ru-spin 0.8s linear infinite' }}
    aria-hidden="true"
  >
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
);

// Unsplash full logo as inline SVG (from official brand assets)
const UnsplashLogo = ({ collapsed }: { collapsed: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 20"
    fill="currentColor"
    aria-label="Unsplash"
    style={{
      height: '1.125rem',
      width: collapsed ? '1.125rem' : '5.5rem',
      transition: 'width 0.25s ease',
      overflow: 'hidden',
    }}
  >
    {/* U mark */}
    <path d="M 0,0 L 0,8 L 5,8 L 5,5 L 8,5 L 8,8 L 13,8 L 13,0 Z M 5,0 L 8,0 L 8,4 L 5,4 Z" />
    {/* "unsplash" wordmark — only visible when not collapsed */}
    {!collapsed && (
      <text x="16" y="8" fontSize="8" fontFamily="inherit" fontWeight="600">
        Unsplash
      </text>
    )}
  </svg>
);

export interface UnsplashSearchProps {
  /** Extra class name on the wrapper */
  className?: string;
}

export function UnsplashSearch({ className }: UnsplashSearchProps) {
  const {
    loading,
    isPopUp,
    onClose,
    onSearch,
    onCommit,
    initValue,
    autoFocus,
    maxSearchLength,
    searchPlaceholder,
    slots,
    classNames,
  } = useUnsplashContext();

  const [value, setValue] = useState(initValue ?? '');
  const inputRef = useRef<HTMLInputElement>(null);

  // Set initial value and trigger search
  useEffect(() => {
    if (initValue) {
      setValue(initValue);
      onSearch?.(initValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Auto-focus
  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val.length > maxSearchLength) return;
    setValue(val);
    onSearch?.(val);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onCommit?.(value);
    }
    if (e.key === 'Escape' && isPopUp) {
      e.preventDefault();
      onClose();
    }
  };

  return (
    <div
      className={cn('ru-search-wrapper', classNames.searchWrapper, className)}
      role="search"
    >
      {/* Search icon / spinner */}
      <span className="ru-search-icon">
        {slots.searchIcon ?? (loading ? <SpinnerIcon /> : <SearchIcon />)}
      </span>

      {/* Unsplash logo (collapses when user types) */}
      <span className="ru-unsplash-logo" aria-hidden="true">
        <UnsplashLogo collapsed={value.length > 0} />
      </span>

      {/* Search input */}
      <input
        ref={inputRef}
        type="search"
        role="searchbox"
        aria-label="Search Unsplash photos"
        placeholder={searchPlaceholder}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className={cn('ru-search-input', classNames.searchInput)}
        autoComplete="off"
        spellCheck={false}
        maxLength={maxSearchLength}
      />

      {/* ESC badge — only in popup mode */}
      {isPopUp && (
        <button
          type="button"
          className={cn('ru-esc-badge')}
          onClick={onClose}
          aria-label="Close photo picker"
          tabIndex={0}
        >
          esc
        </button>
      )}
    </div>
  );
}
