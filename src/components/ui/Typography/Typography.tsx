import React, { ElementType } from "react";
import { variantsMap, Props } from "./types";
import { typographyStyle } from "./styles";

export const Typography = ({ children, as }: Props): React.ReactElement => {
  const Component = variantsMap[as];

  return <Component className={typographyStyle[as]}>{children}</Component>;
};
