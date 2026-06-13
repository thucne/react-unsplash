/**
 * Decode a BlurHash string to a base64-encoded PNG data URL.
 * SSR-safe: returns an empty string on the server.
 */
import * as blurhash from 'blurhash';

const PLACEHOLDER_SIZE = 32;

export function blurHashToDataURL(
  hash: string,
  width: number = PLACEHOLDER_SIZE,
  height: number = PLACEHOLDER_SIZE
): string {
  if (typeof document === 'undefined') return '';

  try {
    // Use a small size for the placeholder to keep it lightweight
    const w = Math.min(width, PLACEHOLDER_SIZE);
    const h = Math.min(height, PLACEHOLDER_SIZE);
    const pixels = blurhash.decode(hash, w, h);

    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');

    if (!ctx) return '';

    const imageData = ctx.createImageData(w, h);
    imageData.data.set(pixels);
    ctx.putImageData(imageData, 0, 0);

    return canvas.toDataURL();
  } catch {
    return '';
  }
}

/**
 * Compute responsive column count based on container width.
 */
export function getResponsiveCols(containerWidth: number): number {
  if (containerWidth < 320) return 1;
  if (containerWidth < 480) return 2;
  if (containerWidth < 720) return 3;
  if (containerWidth < 1024) return 4;
  return 5;
}

/**
 * Simple class name joiner (like clsx, without the dependency).
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}
