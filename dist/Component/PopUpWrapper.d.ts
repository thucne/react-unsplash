import React, { PropsWithChildren } from "react";
import { DialogProps } from "@mui/material";
export interface PopUpWrapperProps extends DialogProps, PropsWithChildren {
    width?: number;
}
declare const PopUpWrapper: (props: PopUpWrapperProps) => React.JSX.Element;
export default PopUpWrapper;
//# sourceMappingURL=PopUpWrapper.d.ts.map