import React from "react";
import { IShowIfProps } from "./showIfTypes";

export const ShowIf = (props: IShowIfProps): React.ReactElement | null => {
  if (!props.condition) return null;

  return props.children;
};
