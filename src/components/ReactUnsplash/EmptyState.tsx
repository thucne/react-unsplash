'use client';
import React from 'react';
import { useUnsplashContext } from './context';
import { cn } from './helpers';

export interface UnsplashEmptyStateProps {
  children?: React.ReactNode;
  className?: string;
}

export function UnsplashEmptyState({ children, className }: UnsplashEmptyStateProps) {
  return (
    <div className={cn('ru-empty-state', className)} role="status" aria-live="polite">
      {children}
    </div>
  );
}

/**
 * Auto empty state — reads context to determine which message to show.
 * Use this inside compound layouts for automatic behavior.
 */
export function UnsplashAutoEmptyState() {
  const { images, loading, slots, classNames } = useUnsplashContext();

  if (loading || images.length > 0) return null;

  return (
    <UnsplashEmptyState className={classNames.emptyState}>
      {slots.emptyState ?? (
        <span>🔍 Start typing to search for photos</span>
      )}
    </UnsplashEmptyState>
  );
}

export default UnsplashEmptyState;
