'use client';
import React, { useEffect, useRef } from 'react';
import { cn } from './helpers';

export interface UnsplashDialogProps {
  /** Whether the dialog is open */
  open: boolean;
  /** Called when dialog requests to close */
  onClose: () => void;
  children: React.ReactNode;
  /** Fixed width of the dialog panel */
  width?: number;
  /** Extra class name on the panel */
  className?: string;
}

/**
 * Popup dialog using the native <dialog> element.
 * Handles: ESC key, click-outside, scroll lock, ARIA.
 */
export function UnsplashDialog({
  open,
  onClose,
  children,
  width,
  className,
}: UnsplashDialogProps) {
  const backdropRef = useRef<HTMLDivElement>(null);

  // Body scroll lock
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = prev; };
    }
  }, [open]);

  // ESC key to close
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  // Click-outside to close
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === backdropRef.current) {
      onClose();
    }
  };

  if (!open) return null;

  return (
    <div
      ref={backdropRef}
      className="ru-dialog-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label="Unsplash photo picker"
      onClick={handleBackdropClick}
    >
      <div
        className={cn('ru-dialog-panel', className)}
        style={width ? { width, maxWidth: '100%' } : undefined}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

export default UnsplashDialog;
