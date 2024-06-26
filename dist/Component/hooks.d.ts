import React from "react";
type Options = {
    revalidate?: number;
    timeout?: number;
    falseCondition?: (temp: {
        width: number;
        height: number;
    }) => boolean;
    terminalCondition?: (temp: {
        width: number;
        height: number;
    }) => boolean;
};
export declare function useElementDimensions(elRef: React.RefObject<HTMLElement>, options?: Options): {
    width: number;
    height: number;
};
export {};
//# sourceMappingURL=hooks.d.ts.map