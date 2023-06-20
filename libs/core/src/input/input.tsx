import React, { forwardRef, useMemo, useRef, useState } from "react";
import { useFieldControlContext } from "../field/context";
import { classNames } from "@rafty/utils";
import { cva } from "class-variance-authority";
import {
  AriaNumberFieldProps,
  AriaSearchFieldProps,
  useLocale,
  useNumberField,
  useSearchField,
  useButton,
} from "react-aria";
import { useNumberFieldState, useSearchFieldState } from "react-stately";
import {
  ChevronUpIcon,
  ChevronDownIcon,
  XMarkIcon,
  EyeSlashIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";
import { Button } from "../button";
import { InputGroup, Suffix, RightAddon } from "./input-group";
import { useInputGroupContext } from "./context";

type InitialState = boolean | (() => boolean);

function useBoolean(initialState: InitialState = false) {
  const [value, setValue] = useState(initialState);
  const callbacks = useMemo(
    () => ({
      on: () => setValue(true),
      off: () => setValue(false),
      toggle: () => setValue((prev) => !prev),
    }),
    []
  );
  return [value, callbacks] as const;
}

const inputFieldClasses = cva(
  "w-full z-[1] appearance-none outline-none dark:text-secondary-200 transition-all disabled:bg-secondary-100 disabled:dark:bg-secondary-800 disabled:cursor-not-allowed",
  {
    variants: {
      size: {
        sm: "py-1 text-sm",
        md: "py-1.5",
        lg: "py-2 text-lg",
      },
      variant: {
        solid: "bg-secondary-50 dark:bg-secondary-800/20",
        outline:
          "read-only:focus:border-secondary-300 dark:read-only:focus:border-secondary-700 read-only:focus:ring-0",
        ghost: "border border-transparent",
      },
      invalid: {
        true: "border-error-500 focus:ring-error-200 dark:border-error-400 dark:focus:ring-error-100/20",
      },
      isLeftAddon: {
        true: "",
      },
      isRightAddon: {
        true: "",
      },
      isPrefix: {
        true: "",
      },
      isSuffix: {
        true: "",
      },
    },
    compoundVariants: [
      {
        variant: ["solid", "outline"],
        size: ["sm", "md", "lg"],
        className:
          "border border-secondary-300 dark:border-secondary-700 hover:border-primary-500 dark:hover:border-primary-400 focus:ring-primary-200 focus:border-primary-500 dark:focus:ring-primary-100/20 dark:focus:border-primary-400 focus:outline-none focus:ring-2 ",
      },
      {
        variant: ["outline", "ghost"],
        size: ["sm", "md", "lg"],
        className: "bg-transparent",
      },
      {
        size: "sm",
        isLeftAddon: false,
        className: "rounded-l",
      },
      {
        size: "sm",
        isRightAddon: false,
        className: "rounded-r",
      },
      {
        size: "sm",
        isPrefix: true,
        isSuffix: false,
        className: "pl-8 pr-2",
      },
      {
        size: "sm",
        isPrefix: false,
        isSuffix: true,
        className: "pl-2 pr-8",
      },
      {
        size: "sm",
        isPrefix: true,
        isSuffix: true,
        className: "px-8",
      },
      {
        size: "sm",
        isPrefix: false,
        isSuffix: false,
        className: "px-2",
      },
      {
        size: ["md", "lg"],
        isLeftAddon: false,
        className: "rounded-l-md",
      },
      {
        size: ["md", "lg"],
        isRightAddon: false,
        className: "rounded-r-md",
      },
      {
        size: "md",
        isPrefix: true,
        isSuffix: false,
        className: "pl-9 pr-3",
      },
      {
        size: "md",
        isPrefix: false,
        isSuffix: true,
        className: "pl-3 pr-9",
      },
      {
        size: "md",
        isPrefix: true,
        isSuffix: true,
        className: "px-9",
      },
      {
        size: "md",
        isPrefix: false,
        isSuffix: false,
        className: "px-3",
      },
      {
        size: "lg",
        isPrefix: true,
        isSuffix: false,
        className: "pl-10 pr-4",
      },
      {
        size: "lg",
        isPrefix: false,
        isSuffix: true,
        className: "pl-4 pr-10",
      },
      {
        size: "lg",
        isPrefix: true,
        isSuffix: true,
        className: "px-10",
      },
      {
        size: "lg",
        isPrefix: false,
        isSuffix: false,
        className: "px-4",
      },
    ],
  }
);

// Input Field
export type InputField = Omit<JSX.IntrinsicElements["input"], "size"> & {
  variant?: "solid" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
};

export const InputField = forwardRef<HTMLInputElement, InputField>(
  ({ className, variant = "outline", size = "md", ...props }, forwardedRef) => {
    const controls = useFieldControlContext() ?? {};
    const inputGroupProps = useInputGroupContext() ?? {
      isLeftAddon: false,
      isRightAddon: false,
      isPrefix: false,
      isSuffix: false,
    };

    return (
      <input
        {...controls}
        {...props}
        className={classNames(
          inputFieldClasses({
            size: size,
            variant,
            invalid: controls.isInvalid,
            isLeftAddon: inputGroupProps.isLeftAddon,
            isRightAddon: inputGroupProps.isRightAddon,
            isPrefix: inputGroupProps.isPrefix,
            isSuffix: inputGroupProps.isSuffix,
          }),
          className
        )}
        ref={forwardedRef}
      />
    );
  }
);
InputField.displayName = "InputField";

// Number Input Field
export type NumberField = Omit<AriaNumberFieldProps, "size"> & {
  className?: string;
  variant?: "solid" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
};

export const NumberField = ({
  variant = "outline",
  size = "md",
  className,
  ...props
}: NumberField) => {
  const { locale } = useLocale();
  const state = useNumberFieldState({ ...props, locale });
  const ref = React.useRef(null);
  const { inputProps, incrementButtonProps, decrementButtonProps } =
    useNumberField(props, state, ref);

  const IncrementButton = useButton(incrementButtonProps, ref);
  const DecrementButton = useButton(decrementButtonProps, ref);

  return (
    <InputGroup>
      <InputField
        {...inputProps}
        variant={variant}
        size={size}
        className={className}
        ref={ref}
      />
      <RightAddon
        data-cy="button"
        className={classNames(
          variant !== "ghost" &&
            "!border-secondary-300 dark:!border-secondary-700 !border !border-l-0",
          "flex-col !bg-transparent !px-0"
        )}
      >
        <Button
          {...IncrementButton.buttonProps}
          variant="ghost"
          size="sm"
          className="!rounded-none !rounded-tr-md !py-0"
        >
          <ChevronUpIcon
            className={classNames(
              size === "sm" && "h-[15px]",
              size === "md" && "h-[18px]",
              size === "lg" && "h-[22px]",
              "w-3 stroke-[3]"
            )}
          />
        </Button>
        <div
          className={classNames(
            variant !== "ghost" &&
              "bg-secondary-300 dark:bg-secondary-700 h-[1px] w-full"
          )}
        />
        <Button
          {...DecrementButton.buttonProps}
          variant="ghost"
          size="sm"
          className="!rounded-none !rounded-br-md !py-0"
        >
          <ChevronDownIcon
            className={classNames(
              size === "sm" && "h-[14px]",
              size === "md" && "h-[17px]",
              size === "lg" && "h-[21px]",
              "w-3 stroke-[3]"
            )}
          />
        </Button>
      </RightAddon>
    </InputGroup>
  );
};
NumberField.displayName = "NumberField";

// Search Field
export type SearchField = Omit<AriaSearchFieldProps, "size"> & {
  className?: string;
  variant?: "solid" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
};

export const SearchField = ({
  className,
  variant = "outline",
  size = "md",
  ...props
}: SearchField) => {
  const state = useSearchFieldState(props);
  const ref = useRef(null);
  const { inputProps, clearButtonProps } = useSearchField(props, state, ref);

  const { buttonProps } = useButton(clearButtonProps, ref);

  return (
    <InputGroup>
      <InputField
        {...inputProps}
        variant={variant}
        size={size}
        className={className}
        ref={ref}
      />
      <Suffix>
        <Button {...buttonProps} variant="ghost" size="icon" className="!z-[2]">
          <XMarkIcon className="h-3 w-3 stroke-[3]" />
        </Button>
      </Suffix>
    </InputGroup>
  );
};
SearchField.displayName = "SearchField";

// Password Field
export const PasswordField = forwardRef<HTMLInputElement, InputField>(
  ({ className, size = "md", variant = "outline", ...props }, forwardedRef) => {
    const [showPassword, { toggle }] = useBoolean();

    return (
      <InputGroup>
        <InputField
          {...props}
          type={showPassword ? "text" : "password"}
          variant={variant}
          size={size}
          className={className}
          ref={forwardedRef}
        />
        <Suffix>
          <Button
            type="button"
            size="icon"
            aria-label="show and hide password"
            variant="ghost"
            onClick={toggle}
            className="!z-[2]"
          >
            {showPassword ? (
              <EyeSlashIcon className="h-4 w-4 stroke-2" />
            ) : (
              <EyeIcon className="h-4 w-4 stroke-2" />
            )}
          </Button>
        </Suffix>
      </InputGroup>
    );
  }
);
PasswordField.displayName = "PasswordField";