import React from "react";
import * as MenubarPrimitive from "@radix-ui/react-menubar";
import { ComponentProps, forwardRef } from "react";
import { classNames } from "@rhinobase/utils";
import { MenuBarProvider, MenuBarContext, useMenuBarContext } from "./context";

//MenuBar Component
type Root = ComponentProps<(typeof MenubarPrimitive)["Root"]> & MenuBarContext;
export const Root = forwardRef<HTMLDivElement, Root>(
  ({ children, className, size = "base", ...props }, forwardedRef) => {
    return (
      <MenuBarProvider value={{ size }}>
        <MenubarPrimitive.Root
          className={classNames("flex w-full", className)}
          {...props}
          ref={forwardedRef}
        >
          {children}
        </MenubarPrimitive.Root>
      </MenuBarProvider>
    );
  },
);

//MenuBar Menu Component
type Menu = ComponentProps<(typeof MenubarPrimitive)["Menu"]>;
export const Menu = forwardRef<HTMLDivElement, Menu>(
  ({ children, ...props }) => {
    return <MenubarPrimitive.Menu {...props}>{children}</MenubarPrimitive.Menu>;
  },
);

//MenuBar Button Component
type Trigger = ComponentProps<(typeof MenubarPrimitive)["MenubarTrigger"]>;
export const Trigger = forwardRef<HTMLButtonElement, Trigger>(
  ({ children, className, ...props }, forwardedRef) => {
    const { size } = useMenuBarContext();
    return (
      <MenubarPrimitive.Trigger
        className={classNames(
          size == "sm" && "text-xs py-1 px-2",
          size == "base" && "text-sm py-2 px-3",
          size == "lg" && "text-base py-3 px-4",
          "data-[highlighted]:bg-secondary-200 data-[state=open]:bg-secondary-200 dark:text-secondary-100 dark:hover:bg-secondary-800 dark:data-[highlighted]:bg-secondary-800 dark:data-[state=open]:bg-secondary-800 flex select-none items-center justify-between gap-2 rounded-md text-sm font-semibold outline-none",
          className,
        )}
        {...props}
        ref={forwardedRef}
      >
        {children}
      </MenubarPrimitive.Trigger>
    );
  },
);

//MenuBarContent Component

type Content = ComponentProps<(typeof MenubarPrimitive)["Content"]>;
export const Content = forwardRef<HTMLDivElement, Content>(
  ({ children, className, ...props }, forwardedRef) => {
    return (
      <MenubarPrimitive.Portal>
        <MenubarPrimitive.Content
          className={classNames(
            "p-base dark:bg-secondary-800 min-w-[220px] rounded-md bg-white shadow-[0px_10px_38px_0px_rgba(22,23,24,0.05),0px_-5px_38px_0px_rgba(22,23,24,0.05)]",
            className,
          )}
          {...props}
          sideOffset={5}
          ref={forwardedRef}
        >
          {children}
        </MenubarPrimitive.Content>
      </MenubarPrimitive.Portal>
    );
  },
);

// MenuGroup Component
type Group = { children?: React.ReactNode; title: string };
export const Group = ({ children, title }: Group) => {
  return (
    <>
      <Label>{title}</Label>
      {children}
    </>
  );
};

//MenuBar Label Component
type Label = ComponentProps<(typeof MenubarPrimitive)["Label"]>;
export const Label = forwardRef<HTMLDivElement, Label>(
  ({ children, className, ...props }, forwardedRef) => {
    const { size } = useMenuBarContext();
    return (
      <MenubarPrimitive.Label
        className={classNames(
          size == "sm" && "text-[10px] py-1",
          size == "base" && "text-[11px] py-1",
          size == "lg" && "text-xs py-1.5",
          "px-lg text-secondary-400 dark:text-secondary-400 select-none font-semibold uppercase tracking-wide",
          className,
        )}
        {...props}
        ref={forwardedRef}
      >
        {children}
      </MenubarPrimitive.Label>
    );
  },
);

//MenuBar Item Component
type Item = ComponentProps<(typeof MenubarPrimitive)["Item"]>;
export const Item = forwardRef<HTMLDivElement, Item>(
  ({ children, className, ...props }, forwardedRef) => {
    const { size } = useMenuBarContext();
    return (
      <MenubarPrimitive.Item
        className={classNames(
          size == "sm" && "text-xs",
          size == "base" && "text-sm",
          size == "lg" && "text-base",
          "rounded-base py-1.5 text-secondary-600 focus:bg-secondary-200/70 data-[disabled]:text-secondary-300 dark:text-secondary-200 dark:focus:bg-secondary-700/60 data-[disabled]:dark:text-secondary-500 pl-2xl pr-md flex w-full cursor-pointer items-center gap-2  font-semibold focus:outline-none data-[disabled]:cursor-not-allowed data-[disabled]:hover:bg-transparent data-[disabled]:dark:hover:bg-transparent",
          className,
        )}
        {...props}
        ref={forwardedRef}
      >
        {children}
      </MenubarPrimitive.Item>
    );
  },
);

//MenuBar ChechboxGroup Component
export const CheckboxGroup = MenubarPrimitive.Group;

type CheckboxItem = ComponentProps<(typeof MenubarPrimitive)["CheckboxItem"]>;
export const CheckboxItem = forwardRef<HTMLDivElement, CheckboxItem>(
  ({ children, className, ...props }, forwardedRef) => {
    const { size } = useMenuBarContext();
    return (
      <MenubarPrimitive.CheckboxItem
        {...props}
        ref={forwardedRef}
        className={classNames(
          size == "sm" && "text-xs",
          size == "base" && "text-sm",
          size == "lg" && "text-base",
          "rounded-base py-1.5 px-2xl text-secondary-600 hover:bg-secondary-200/50 focus:bg-secondary-200 dark:text-secondary-200 dark:hover:bg-secondary-700 dark:focus:bg-secondary-700/50 relative flex w-full cursor-pointer items-center gap-1 font-semibold focus:outline-none",
          className,
        )}
      >
        {children}
        <MenubarPrimitive.ItemIndicator
          className={classNames(
            size == "sm" && "top-2",
            size == "base" && "top-2.5",
            size == "lg" && "top-3",
            "absolute left-1",
          )}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-3 w-3 stroke-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            />
          </svg>
        </MenubarPrimitive.ItemIndicator>
      </MenubarPrimitive.CheckboxItem>
    );
  },
);

//MenuBar RadioGroup Component
export const RadioGroup = MenubarPrimitive.RadioGroup;

type RadioItem = ComponentProps<(typeof MenubarPrimitive)["RadioItem"]>;
export const RadioItem = forwardRef<HTMLDivElement, RadioItem>(
  ({ children, className, ...props }, forwardedRef) => {
    const { size } = useMenuBarContext();
    return (
      <MenubarPrimitive.RadioItem
        {...props}
        ref={forwardedRef}
        className={classNames(
          size == "sm" && "text-xs",
          size == "base" && "text-sm",
          size == "lg" && "text-base",
          "rounded-base py-1.5 px-2xl text-secondary-600 hover:bg-secondary-200/50 focus:bg-secondary-200 dark:text-secondary-200 dark:hover:bg-secondary-700 dark:focus:bg-secondary-700/50 relative flex w-full cursor-pointer items-center gap-1 font-semibold focus:outline-none",
          className,
        )}
      >
        {children}
        <MenubarPrimitive.ItemIndicator
          className={classNames(
            size == "sm" && "top-2",
            size == "base" && "top-2.5",
            size == "lg" && "top-3",
            "absolute left-1",
          )}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            className="h-3 w-3"
          >
            <path d="M8 4c.367 0 .721.048 1.063.145a3.943 3.943 0 0 1 1.762 1.031 3.944 3.944 0 0 1 1.03 1.762c.097.34.145.695.145 1.062 0 .367-.048.721-.145 1.063a3.94 3.94 0 0 1-1.03 1.765 4.017 4.017 0 0 1-1.762 1.031C8.72 11.953 8.367 12 8 12s-.721-.047-1.063-.14a4.056 4.056 0 0 1-1.765-1.032A4.055 4.055 0 0 1 4.14 9.062 3.992 3.992 0 0 1 4 8c0-.367.047-.721.14-1.063a4.02 4.02 0 0 1 .407-.953A4.089 4.089 0 0 1 5.98 4.546a3.94 3.94 0 0 1 .957-.401A3.89 3.89 0 0 1 8 4z" />
          </svg>
        </MenubarPrimitive.ItemIndicator>
      </MenubarPrimitive.RadioItem>
    );
  },
);

//MenuBar SubMenu Component
type Sub = ComponentProps<(typeof MenubarPrimitive)["Sub"]>;
export const Sub = forwardRef<HTMLDivElement, Sub>(({ children, ...props }) => {
  return <MenubarPrimitive.Sub {...props}>{children}</MenubarPrimitive.Sub>;
});

//MenuBar SubMenuButton Component
type SubTrigger = ComponentProps<(typeof MenubarPrimitive)["SubTrigger"]>;
export const SubTrigger = forwardRef<HTMLDivElement, SubTrigger>(
  ({ children, className, ...props }, forwardedRef) => {
    const { size } = useMenuBarContext();
    return (
      <MenubarPrimitive.SubTrigger
        {...props}
        ref={forwardedRef}
        className={classNames(
          size == "sm" && "text-xs",
          size == "base" && "text-sm",
          size == "lg" && "text-base",
          "rounded-base py-1.5 pl-2xl pr-md text-secondary-600 focus:bg-secondary-200/70 data-[state=open]:bg-secondary-200/70 dark:text-secondary-200 dark:focus:bg-secondary-700/60 dark:data-[state=open]:bg-secondary-700/60 flex w-full cursor-pointer items-center justify-between gap-2 font-semibold focus:outline-none",
          className,
        )}
      >
        {children}
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="Stroke-2 h-3 w-3"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </span>
      </MenubarPrimitive.SubTrigger>
    );
  },
);

//MenuBar SubContent Component

type SubContent = ComponentProps<(typeof MenubarPrimitive)["SubContent"]>;
export const SubContent = forwardRef<HTMLDivElement, SubContent>(
  ({ children, className, ...props }, forwardedRef) => {
    return (
      <MenubarPrimitive.Portal>
        <MenubarPrimitive.SubContent
          className={classNames(
            "data-[side=right]:animate-scale-in origin-top-left",
            "p-base dark:bg-secondary-800 min-w-[220px] rounded-md bg-white shadow-[0px_10px_38px_0px_rgba(22,23,24,0.05),0px_-5px_38px_0px_rgba(22,23,24,0.05)]",
            className,
          )}
          {...props}
          ref={forwardedRef}
          sideOffset={10}
        >
          {children}
        </MenubarPrimitive.SubContent>
      </MenubarPrimitive.Portal>
    );
  },
);

// MenuBarDivider Component
type Separator = ComponentProps<(typeof MenubarPrimitive)["Separator"]>;
export const Separator = forwardRef<HTMLDivElement, Separator>(
  ({ className, ...props }, forwardedRef) => {
    const { size } = useMenuBarContext();
    return (
      <MenubarPrimitive.Separator
        {...props}
        ref={forwardedRef}
        className={classNames(
          size == "sm" && "my-1",
          size == "base" && "my-[5px]",
          size == "lg" && "my-1.5",
          "bg-secondary-200 dark:bg-secondary-700 h-[1px] ",
          className,
        )}
      />
    );
  },
);
