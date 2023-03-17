import React from "react";
import { ModalPortal } from "./ModalPortal";
import { useModal } from "./useModal";
import { Button, ShowIf, Typography } from "@/components";

interface ModalProps {
  children: React.ReactElement;
  title: string;
}

interface OverlayProps {
  children: React.ReactElement;
}

const Overlay = (props: OverlayProps) => {
  return (
    <div className="absolute top-0 left-0 flex min-h-screen w-screen items-end justify-center bg-black opacity-70 lg:items-center">
      {props.children}
    </div>
  );
};

const Modal = React.forwardRef(function (props: ModalProps, ref) {
  const { isOpen, open, close } = useModal();

  React.useImperativeHandle(ref, () => {
    return {
      open,
      close,
    };
  });

  return (
    <ShowIf condition={isOpen}>
      <ModalPortal>
        <Overlay>
          <div className="flex flex-1 flex-col gap-y-3 rounded-t-xl bg-white p-5 lg:max-w-[600px] lg:rounded-md">
            <header className="flex justify-between">
              <Typography as="h4">{props.title}</Typography>
              <Button label="Закрыть" onClick={close} />
            </header>
            <main>{props.children}</main>
          </div>
        </Overlay>
      </ModalPortal>
    </ShowIf>
  );
});

Modal.displayName = "Modal";

export { Modal };
