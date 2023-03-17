import React from "react";
import { createPortal } from "react-dom";

interface Props {
  children: React.ReactElement;
}

export const ModalPortal = ({ children }: Props) => {
  const modalRootRef = React.useRef<HTMLDivElement>();
  if (!modalRootRef.current) modalRootRef.current = document.createElement("div");

  React.useLayoutEffect(() => {
    const bodyEl = document.body;
    bodyEl.appendChild(modalRootRef.current as HTMLElement);

    return () => {
      bodyEl.removeChild(modalRootRef.current as HTMLElement);
    };
  }, []);

  return createPortal(children, modalRootRef.current);
};
