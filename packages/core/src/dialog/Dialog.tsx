import * as DialogPrimitive from "@radix-ui/react-dialog";
import React, { ComponentProps, forwardRef } from "react";
import { classNames } from "@rhinobase/utils";
import { Button } from "../button";
import { DialogContext, DialogProvider, useDialogContext } from "./context";

// Dialog Component
export type Root = ComponentProps<(typeof DialogPrimitive)["Dialog"]> &
  DialogContext;
export const Root = ({ children, size = "md", ...props }: Root) => (
  <DialogProvider value={{ size }}>
    {/* TODO: Add reference to the below element */}
    <DialogPrimitive.Root {...props}>{children}</DialogPrimitive.Root>
  </DialogProvider>
);
Root.displayName = "Dialog.Root";

// Dialog Button Component
export type Trigger = ComponentProps<
  (typeof DialogPrimitive)["DialogTrigger"]
> &
  Button;
export const Trigger = React.forwardRef<HTMLButtonElement, Trigger>(
  (
    {
      children,
      className,
      variant,
      colorScheme,
      leftIcon = undefined,
      rightIcon = undefined,
      disabled = undefined,
      loading = undefined,
      active = undefined,
      ...props
    },
    forwardedRef,
  ) => {
    return (
      <DialogPrimitive.Trigger {...props} ref={forwardedRef} asChild>
        <Button
          variant={variant || "ghost"}
          colorScheme={colorScheme}
          className={className}
          leftIcon={leftIcon}
          rightIcon={rightIcon}
          loading={loading}
          disabled={disabled}
          active={active}
        >
          {children}
        </Button>
      </DialogPrimitive.Trigger>
    );
  },
);
Trigger.displayName = "Dialog.Trigger";

export type Overlay = ComponentProps<(typeof DialogPrimitive)["Overlay"]>;
export const Overlay = forwardRef<HTMLDivElement, Overlay>(
  ({ className, ...props }, forwardedRef) => {
    return (
      <DialogPrimitive.Overlay
        {...props}
        className={classNames(
          "animate-slide-down-fade fixed inset-0 z-40 h-full w-full bg-black/40 transition-opacity ease-in-out",
          className,
        )}
        ref={forwardedRef}
      ></DialogPrimitive.Overlay>
    );
  },
);
Overlay.displayName = "Dialog.Overlay";

// Dialog Content Component
export type Content = ComponentProps<(typeof DialogPrimitive)["Content"]> & {
  height?: string;
  width?: string;
};
export const Content = forwardRef<HTMLDivElement, Content>(
  ({ children, title, height, width, ...props }, forwardedRef) => {
    const { size } = useDialogContext();
    return (
      <DialogPrimitive.Portal>
        {/*zIndex one less than Toast */}
        <DialogPrimitive.Content
          {...props}
          style={{ height: height && height, maxWidth: width && width }}
          className={classNames(
            "fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 shadow-xl transition-all duration-200 focus-visible:outline-none",
            "dark:bg-secondary-800 dark:text-secondary-50 rounded-base min-w-[360px] bg-white text-left sm:w-full sm:align-middle",
            size == "xl" && "max-w-[80%] p-8",
            size == "lg" && "max-w-[60rem] p-8",
            size == "md" && "max-w-[40rem] p-7",
            size == "sm" && "max-w-[30rem] p-6",
            "overflow-y-auto overscroll-auto md:h-auto md:max-h-[inherit]",
            props.className,
          )}
          ref={forwardedRef}
        >
          {children}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    );
  },
);
Content.displayName = "Dialog.Content";

// Dialog Title Component
export type Title = ComponentProps<(typeof DialogPrimitive)["DialogTitle"]>;
export const Title = React.forwardRef<HTMLDivElement, Title>(
  ({ children, ...props }, forwardedRef) => {
    const { size } = useDialogContext();

    return (
      <DialogPrimitive.Title
        {...props}
        className={classNames(
          size == "lg" && "text-xl",
          size == "md" && "text-xl",
          size == "sm" && "text-lg",
          "mb-2 font-semibold",
        )}
        ref={forwardedRef}
      >
        {children}
      </DialogPrimitive.Title>
    );
  },
);
Title.displayName = "Dialog.Title";

// Dialog Body Component
export type Body = ComponentProps<
  (typeof DialogPrimitive)["DialogDescription"]
>;
export const Body = React.forwardRef<HTMLDivElement, Body>(
  ({ className, children, ...props }, forwardedRef) => {
    return (
      <DialogPrimitive.Description {...props} ref={forwardedRef} asChild>
        <div className={className}>{children}</div>
      </DialogPrimitive.Description>
    );
  },
);
Body.displayName = "Dialog.Body";

// Dialog Cross Button Component
export type CloseButton = ComponentProps<(typeof DialogPrimitive)["Close"]> &
  Button;
export const CloseButton = forwardRef<HTMLButtonElement, CloseButton>(
  ({ variant, className, ...props }, forwardedRef) => {
    return (
      <DialogPrimitive.Close ref={forwardedRef} asChild>
        {/* This will require the i18n string passed in */}
        <Button
          variant={variant ?? "ghost"}
          size="icon"
          {...props}
          className={classNames(
            "absolute top-5 right-5 rounded-full",
            className,
          )}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-6 w-6 stroke-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </Button>
      </DialogPrimitive.Close>
    );
  },
);
CloseButton.displayName = "Dialog.CloseButton";

export type Close = ComponentProps<(typeof DialogPrimitive)["Close"]>;
export const Close = ({ children, ...props }: Close) => {
  return <DialogPrimitive.Close {...props}>{children}</DialogPrimitive.Close>;
};
Close.displayName = "Dialog.Close";
