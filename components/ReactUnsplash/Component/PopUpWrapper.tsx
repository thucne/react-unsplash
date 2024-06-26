import React, { PropsWithChildren } from "react";

import { Dialog, DialogProps } from "@mui/material";

export interface PopUpWrapperProps extends DialogProps, PropsWithChildren {
  width?: string | number;
}

const PopUpWrapper = (props: PopUpWrapperProps) => {
  const { children, ...rest } = props;
  return (
    <Dialog
      className="w-full"
      maxWidth={false}
      sx={{
        ".MuiPaper-root": {
          width: props.width ?? "auto",
          maxWidth: '100%'
        },
      }}
      {...rest}
    >
      {children}
    </Dialog>
  );
};

export default PopUpWrapper;
