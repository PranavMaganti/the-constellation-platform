import { Dialog, Transition } from "@headlessui/react";
import classNames from "classnames";
import React, { Fragment, useCallback } from "react";

interface BaseDialogProps {
  children: React.ReactNode;
  size?: DialogSize;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  isLoading?: boolean;
}

export enum DialogSize {
  Small = "max-w-sm",
  Medium = "max-w-md",
  Large = "max-w-lg",
  ExtraLarge = "max-w-xl",
  ExtraExtraLarge = "max-w-2xl",
}

export default function BaseDialog(props: BaseDialogProps) {
  const { children, isOpen, setIsOpen, isLoading, size } = props;
  const closeModal = useCallback(() => setIsOpen(false), [setIsOpen]);

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-60" />
            </Transition.Child>
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-100"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div
                className={classNames(
                  "w-full p-6 my-8",
                  size?.toString() ?? "max-w-lg",
                  "inline-block align-middle overflow-hidden text-left transform",
                  " bg-white shadow-xl rounded-2xl"
                )}
              >
                {isLoading ? <span>Loading</span> : children}
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
