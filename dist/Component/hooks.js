import { useEffect, useLayoutEffect, useState } from "react";
var defaultOptions = {
    revalidate: 1000,
    terminalCondition: function (_a) {
        var width = _a.width;
        return width !== 0;
    },
    falseCondition: function (_a) {
        var width = _a.width;
        return width === 0;
    },
};
var useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;
export function useElementDimensions(elRef, options) {
    if (options === void 0) { options = {}; }
    var _a = useState({ width: 0, height: 0 }), sizes = _a[0], setSizes = _a[1];
    var _b = (options || defaultOptions), revalidate = _b.revalidate, timeout = _b.timeout, falseCondition = _b.falseCondition, terminalCondition = _b.terminalCondition;
    useIsomorphicLayoutEffect(function () {
        function updateSize() {
            var _a, _b, _c, _d;
            setSizes({
                width: (_b = (_a = elRef === null || elRef === void 0 ? void 0 : elRef.current) === null || _a === void 0 ? void 0 : _a.clientWidth) !== null && _b !== void 0 ? _b : 0,
                height: (_d = (_c = elRef === null || elRef === void 0 ? void 0 : elRef.current) === null || _c === void 0 ? void 0 : _c.clientHeight) !== null && _d !== void 0 ? _d : 0,
            });
        }
        window.addEventListener("resize", updateSize);
        var loop;
        if (revalidate && typeof revalidate === "number") {
            loop = setInterval(function () {
                var _a, _b, _c, _d;
                var temp = {
                    width: (_b = (_a = elRef === null || elRef === void 0 ? void 0 : elRef.current) === null || _a === void 0 ? void 0 : _a.clientWidth) !== null && _b !== void 0 ? _b : 0,
                    height: (_d = (_c = elRef === null || elRef === void 0 ? void 0 : elRef.current) === null || _c === void 0 ? void 0 : _c.clientHeight) !== null && _d !== void 0 ? _d : 0,
                };
                if (falseCondition === null || falseCondition === void 0 ? void 0 : falseCondition(temp)) {
                    return;
                }
                updateSize();
                if (terminalCondition === null || terminalCondition === void 0 ? void 0 : terminalCondition(temp)) {
                    clearInterval(loop);
                }
            }, revalidate);
            if (timeout) {
                setTimeout(function () { return clearInterval(loop); }, timeout);
            }
        }
        updateSize();
        return function () {
            window && window.removeEventListener("resize", updateSize);
            if (loop) {
                clearInterval(loop);
            }
        };
    }, [elRef]);
    return sizes;
}
