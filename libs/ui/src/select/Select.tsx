"use client";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { cva } from "class-variance-authority";
import { OptionHTMLAttributes, SelectHTMLAttributes, forwardRef } from "react";
import { useFieldControlContext } from "../field-control";
import { classNames } from "../utils";

const selectClasses = cva(
  "w-full border appearance-none outline-none dark:text-secondary-200 transition-all",
  {
    variants: {
      size: {
        sm: "pl-2 pr-6 py-1 text-sm rounded",
        md: "pl-3 pr-8 py-1.5 rounded-md",
        lg: "pl-4 pr-10 py-2 text-lg rounded-md",
      },
      disabled: {
        true: "",
        false: "",
      },
      readonly: {
        true: "",
        false: "",
      },
      variant: {
        solid: "",
        outline: "",
        ghost: "",
      },
    },
    compoundVariants: [
      {
        variant: "solid",
        disabled: false,
        readonly: false,
        className: "bg-secondary-50 dark:bg-secondary-900",
      },
      {
        variant: ["solid", "outline", "ghost"],
        disabled: true,
        readonly: false,
        className: "bg-secondary-100 dark:bg-secondary-800 cursor-not-allowed",
      },
      {
        variant: ["solid", "outline", "ghost"],
        disabled: false,
        readonly: true,
        className: "bg-secondary-100 dark:bg-secondary-800",
      },
      {
        variant: ["solid", "outline"],
        disabled: false,
        readonly: false,
        className:
          "group-hover:border-primary-500 dark:group-hover:border-primary-400 focus:ring-primary-200 focus:border-primary-500 dark:focus:ring-primary-100/20 dark:focus:border-primary-400 focus:ring-2",
      },
      {
        variant: ["solid", "outline"],
        className: "border-secondary-300 dark:border-zinc-700",
      },
      {
        variant: ["solid", "outline", "ghost"],
        disabled: false,
        readonly: false,
        className: "cursor-pointer",
      },
      {
        variant: ["outline", "ghost"],
        disabled: false,
        readonly: false,
        className: "bg-transparent dark:bg-secondary-900",
      },
      {
        variant: "ghost",
        className: "border-transparent",
      },
    ],
    defaultVariants: {
      size: "md",
      variant: "outline",
      disabled: false,
      readonly: false,
    },
  },
);

const TRIGGER_ICON_CLASSES = {
  sm: "right-[7px] h-3 w-3",
  md: "right-2.5 h-3.5 w-3.5",
  lg: "right-[13px] h-4 w-4",
} as const;

export type Select = Omit<
  SelectHTMLAttributes<HTMLSelectElement>,
  "size" | "disabled" | "required"
> & {
  size?: "sm" | "md" | "lg";
  variant?: "solid" | "outline" | "ghost";
  isUnstyled?: boolean;
  isDisabled?: boolean;
  isRequired?: boolean;
  isReadOnly?: boolean;
};

export const Select = forwardRef<HTMLSelectElement, Select>(
  (
    {
      children,
      className,
      name,
      size = "md",
      variant = "outline",
      isDisabled = false,
      isRequired = false,
      isUnstyled = false,
      isReadOnly = false,
      ...props
    },
    forwardedRef,
  ) => {
    const context = useFieldControlContext() ?? {
      isDisabled: false,
      isLoading: false,
      isReadOnly: false,
      isRequired: false,
    };

    const field_name = name || context.name;
    const disabled = isDisabled || context.isDisabled || context.isLoading;
    const required = isRequired || context.isRequired;
    const readonly = isReadOnly || context.isReadOnly;

    return (
      <div className="group relative flex w-max items-center">
        <select
          {...props}
          name={field_name}
          disabled={disabled || readonly}
          required={required}
          className={
            isUnstyled
              ? className
              : classNames(
                  selectClasses({
                    size,
                    variant,
                    disabled,
                    readonly,
                  }),
                  className,
                )
          }
          ref={forwardedRef}
        >
          {children}
        </select>
        {!isUnstyled && (
          <ChevronDownIcon
            className={classNames(
              TRIGGER_ICON_CLASSES[size],
              "dark:stroke-secondary-300 pointer-events-none absolute cursor-pointer stroke-[2.5] opacity-60",
            )}
          />
        )}
      </div>
    );
  },
);

Select.displayName = "Select";

export type SelectItem = OptionHTMLAttributes<HTMLOptionElement>;

export const SelectItem = forwardRef<HTMLOptionElement, SelectItem>(
  (props, forwardedRef) => {
    return <option {...props} ref={forwardedRef} />;
  },
);

SelectItem.displayName = "SelectItem";
