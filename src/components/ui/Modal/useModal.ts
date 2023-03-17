import React from "react";

export const useModal = () => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return { isOpen, open, close };
};