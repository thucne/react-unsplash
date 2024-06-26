import React, { useEffect, useLayoutEffect, useState } from "react";

type Options = {
  revalidate?: number;
  timeout?: number;
  falseCondition?: (temp: { width: number; height: number }) => boolean;
  terminalCondition?: (temp: { width: number; height: number }) => boolean;
};

const defaultOptions = {
  revalidate: 1000,
  terminalCondition: ({ width }: { width: number }) => width !== 0,
  falseCondition: ({ width }: { width: number }) => width === 0,
};

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function useElementDimensions(
  elRef: React.RefObject<HTMLElement>,
  options: Options = {}
) {
  const [sizes, setSizes] = useState({ width: 0, height: 0 });
  const { revalidate, timeout, falseCondition, terminalCondition } =
    (options || defaultOptions) as Options;

  useIsomorphicLayoutEffect(() => {
    function updateSize() {
      setSizes({
        width: elRef?.current?.clientWidth ?? 0,
        height: elRef?.current?.clientHeight ?? 0,
      });
    }

    window.addEventListener("resize", updateSize);

    let loop: any;

    if (revalidate && typeof revalidate === "number") {
      loop = setInterval(() => {
        const temp = {
          width: elRef?.current?.clientWidth ?? 0,
          height: elRef?.current?.clientHeight ?? 0,
        };

        if (falseCondition?.(temp)) {
          return;
        }
        updateSize();

        if (terminalCondition?.(temp)) {
          clearInterval(loop);
        }
      }, revalidate);

      if (timeout) {
        setTimeout(() => clearInterval(loop), timeout);
      }
    }

    updateSize();

    return () => {
      window && window.removeEventListener("resize", updateSize);
      if (loop) {
        clearInterval(loop);
      }
    };
  }, [elRef]);

  return sizes;
}
