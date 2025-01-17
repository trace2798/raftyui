"use client";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { cva } from "class-variance-authority";
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";
import { Label } from "../label";
import { classNames } from "../utils";
import {
  RadioGroupContext,
  RadioGroupProvider,
  useRadioGroupContext,
} from "./context";

// RadioGroup Component
export const radioGroupClasses = cva(
  "flex flex-col disabled:cursor-not-allowed disabled:opacity-60",
  {
    variants: {
      size: {
        sm: "gap-2",
        md: "gap-3",
        lg: "gap-3",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export type RadioGroup = Omit<
  ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>,
  "disabled"
> &
  Partial<RadioGroupContext>;

export const RadioGroup = forwardRef<
  ElementRef<typeof RadioGroupPrimitive.Root>,
  RadioGroup
>(({ className, size = "md", isDisabled = false, ...props }, forwardedRef) => {
  return (
    <RadioGroupProvider value={{ size, isDisabled }}>
      <RadioGroupPrimitive.Root
        {...props}
        disabled={isDisabled}
        className={classNames(radioGroupClasses({ size }), className)}
        ref={forwardedRef}
      />
    </RadioGroupProvider>
  );
});
RadioGroup.displayName = "RadioGroup";

// RadioGroupItem Component
export const radioGroupItemClasses = cva(
  "border-secondary-400  dark:border-secondary-700 data-[state=checked]:border-primary-500 dark:data-[state=checked]:border-primary-300 ring-offset-background focus-visible:ring-ring aspect-square rounded-full border focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      size: {
        sm: "h-3.5 w-3.5",
        md: "h-5 w-5",
        lg: "h-6 w-6",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export const radioGroupItemIndicatorClasses = cva(
  "bg-primary-500 dark:bg-primary-300 rounded-full",
  {
    variants: {
      size: {
        sm: "h-2 w-2",
        md: "h-2.5 w-2.5",
        lg: "h-3.5 w-3.5",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export type RadioGroupItem = ComponentPropsWithoutRef<
  typeof RadioGroupPrimitive.Item
>;

export const RadioGroupItem = forwardRef<
  ElementRef<typeof RadioGroupPrimitive.Item>,
  RadioGroupItem
>(({ className, children, ...props }, forwardedref) => {
  const { size, isDisabled } = useRadioGroupContext();

  const disabled = isDisabled || props.disabled;

  const radioItem = (
    <RadioGroupPrimitive.Item
      {...props}
      className={classNames(radioGroupItemClasses({ size }), className)}
      ref={forwardedref}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <div className={radioGroupItemIndicatorClasses({ size })} />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );

  if (children)
    return (
      <div className="flex w-max items-center">
        {radioItem}
        <Label
          htmlFor={props.id}
          className={classNames(
            disabled && "cursor-not-allowed opacity-50",
            "pl-2",
          )}
        >
          {children}
        </Label>
      </div>
    );
  return radioItem;
});
RadioGroupItem.displayName = "RadioGroupItem";
