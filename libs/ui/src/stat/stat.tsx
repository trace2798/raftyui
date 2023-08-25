import React from "react";
import { StatContext, StatProvider, useStatContext } from "./context";
import { classNames } from "@rafty/utils";

// Stat Component
export type Stat = React.HTMLAttributes<HTMLDivElement> & StatContext;
export const Stat = React.forwardRef<HTMLDivElement, Stat>(
  ({ children, className, type = "normal", ...props }, forwardedRef) => {
    return (
      <StatProvider value={{ type }}>
        <div
          {...props}
          className={classNames("flex flex-col gap-0.5", className)}
          ref={forwardedRef}
        >
          {children}
        </div>
      </StatProvider>
    );
  }
);
Stat.displayName = "Stat";

// StatLabel Component
export type StatLabel = React.HTMLAttributes<HTMLDivElement>;
export const StatLabel = React.forwardRef<HTMLDivElement, StatLabel>(
  ({ children, className, ...props }, forwardedRef) => {
    return (
      <div
        {...props}
        className={classNames(
          "text-secondary-600 dark:text-secondary-400 text-sm font-semibold",
          className
        )}
        ref={forwardedRef}
      >
        {children}
      </div>
    );
  }
);
StatLabel.displayName = "StatLabel";

// StatValue Component
export type StatValue = React.HTMLAttributes<HTMLDivElement>;
export const StatValue = React.forwardRef<HTMLDivElement, StatValue>(
  ({ className, children, ...props }, forwardedRef) => {
    return (
      <div
        {...props}
        className={classNames(
          "text-2xl font-semibold dark:text-white",
          className
        )}
        ref={forwardedRef}
      >
        {children}
      </div>
    );
  }
);
StatValue.displayName = "StatValue";

// StatHelpText Component
const statHelpTextClasses = {
  type: {
    increase: "text-success-600 dark:text-success-400",
    decrease: "text-error-600 dark:text-error-400",
    normal: "dark:text-secondary-300",
  },
};

export type StatHelpText = JSX.IntrinsicElements["div"];
export const StatHelpText = React.forwardRef<HTMLDivElement, StatHelpText>(
  ({ className, children, ...props }, forwardedRef) => {
    const { type } = useStatContext();
    return (
      <div
        {...props}
        className={classNames(
          statHelpTextClasses.type[type],
          "flex items-center gap-1.5 text-sm font-medium",
          className
        )}
        ref={forwardedRef}
      >
        {children}
      </div>
    );
  }
);
StatHelpText.displayName = "StatHelpText";

// StatIcon Component
export type StatIcon = React.SVGProps<SVGSVGElement>;
export const StatIcon = React.forwardRef<SVGSVGElement, StatIcon>(
  ({ className, height = "14", width = "14", ...props }, forwardedRef) => {
    const { type } = useStatContext();
    if (type === "increase")
      return (
        <svg
          {...props}
          width={width}
          height={height}
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
          className={classNames("text-success-500", className)}
          fill="currentColor"
          ref={forwardedRef}
        >
          <path d="M14 10.44l-.413.56H2.393L2 10.46 7.627 5h.827L14 10.44z" />
        </svg>
      );
    return (
      <svg
        {...props}
        width={width}
        height={height}
        viewBox="0 0 16 16"
        xmlns="http://www.w3.org/2000/svg"
        className={classNames("text-error-500", className)}
        fill="currentColor"
        ref={forwardedRef}
      >
        <path d="M2 5.56L2.413 5h11.194l.393.54L8.373 11h-.827L2 5.56z" />
      </svg>
    );
  }
);

StatIcon.displayName = "StatIcon";