import { ElementType } from "react";

export type typographyVariant = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "body";

export const variantsMap: Record<typographyVariant, ElementType> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  body: "p",
};

export interface Props {
  children: React.ReactNode;
  as: keyof typeof variantsMap;
}