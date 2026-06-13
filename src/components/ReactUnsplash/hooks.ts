import { useEffect, useLayoutEffect, useRef, useState } from 'react';

// SSR-safe layout effect
const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

/**
 * Observe an element's dimensions using ResizeObserver.
 * Falls back gracefully in SSR environments.
 */
export function useResizeObserver(
  ref: React.RefObject<Element | null>
): { width: number; height: number } {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Initial measurement
    const rect = el.getBoundingClientRect();
    setSize({ width: rect.width, height: rect.height });

    if (typeof ResizeObserver === 'undefined') return;

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);

  return size;
}

/**
 * Call `onIntersect` when the observed element enters the viewport.
 * Used for infinite scroll "load more" triggering.
 */
export function useIntersectionObserver(
  ref: React.RefObject<Element | null>,
  onIntersect: () => void,
  options: {
    threshold?: number;
    rootMargin?: string;
    enabled?: boolean;
  } = {}
): void {
  const { threshold = 0.1, rootMargin = '0px', enabled = true } = options;
  const callbackRef = useRef(onIntersect);
  callbackRef.current = onIntersect;

  useEffect(() => {
    if (!enabled) return;
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          callbackRef.current();
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, threshold, rootMargin, enabled]);
}
