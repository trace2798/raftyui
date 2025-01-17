import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import { cva } from "class-variance-authority";
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";
import { classNames } from "../utils";

// ScrollArea component
export type ScrollArea = ComponentPropsWithoutRef<
  typeof ScrollAreaPrimitive.Root
>;

export const ScrollArea = forwardRef<
  ElementRef<typeof ScrollAreaPrimitive.Root>,
  ScrollArea
>(({ className, children, ...props }, forwardedref) => (
  <ScrollAreaPrimitive.Root
    ref={forwardedref}
    className={classNames("relative overflow-hidden", className)}
    {...props}
  >
    <ScrollAreaPrimitive.Viewport className="h-full w-full rounded-[inherit]">
      {children}
    </ScrollAreaPrimitive.Viewport>
    <ScrollBar />
    <ScrollAreaPrimitive.Corner />
  </ScrollAreaPrimitive.Root>
));
ScrollArea.displayName = "ScrollArea";

// ScrollBar component
export const scrollAreaScrollbarClasses = cva(
  "flex touch-none select-none transition-colors",
  {
    variants: {
      orientation: {
        vertical: "h-full w-2.5 p-px",
        horizontal: "h-2.5 p-px",
      },
    },
    defaultVariants: {
      orientation: "vertical",
    },
  },
);

export type ScrollBar = ComponentPropsWithoutRef<
  typeof ScrollAreaPrimitive.ScrollAreaScrollbar
>;

export const ScrollBar = forwardRef<
  ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  ScrollBar
>(({ className, orientation = "vertical", ...props }, forwardedref) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    ref={forwardedref}
    orientation={orientation}
    className={classNames(
      scrollAreaScrollbarClasses({ orientation }),
      className,
    )}
    {...props}
  >
    <ScrollAreaPrimitive.ScrollAreaThumb className="bg-secondary-200 dark:bg-secondary-800 relative flex-1 rounded-full" />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
));
ScrollBar.displayName = "ScrollBar";
