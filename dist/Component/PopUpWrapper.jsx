var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React from "react";
import { Dialog } from "@mui/material";
var PopUpWrapper = function (props) {
    var _a;
    var children = props.children, rest = __rest(props, ["children"]);
    return (<Dialog maxWidth={false} sx={{
            width: "100%",
            ".MuiPaper-root": {
                width: (_a = props.width) !== null && _a !== void 0 ? _a : "auto",
                maxWidth: '100%'
            },
        }} {...rest}>
      {children}
    </Dialog>);
};
export default PopUpWrapper;
