import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const inputVariants = cva(
  "text-sm focus-visible:outline-none disabled:pointer-events-none rounded-full w-full",
  {
    variants: {
      variant: {
        secondary:
          "bg-transparent text-torea-800 border border-torea-200 placeholder:text-torea-800 focus-visible:ring-1 focus-visible:ring-torea-800 focus-visible:ring-offset-1",
        tertiary:
          "bg-transparent text-zinc-500 placeholder:text-zinc-500",
      },
      size: {
        default: "px-8 py-3",
      },
    },
    defaultVariants: {
      variant: "secondary",
      size: "default",
    },
  }
);

type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size"
> &
  VariantProps<typeof inputVariants> & {
    icon?: React.ReactNode;
  };

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, size, icon, type = "text", ...props }, ref) => {
    return (
      <div className="relative w-full">
        {icon && (
          <span
            className={cn(
              "absolute top-1/2 -translate-y-1/2 pointer-events-none",
              variant === "secondary" && "left-8 text-torea-800",
              variant === "tertiary" && "left-4 text-zinc-500"
            )}
          >
            {icon}
          </span>
        )}
        <input
          type={type}
          ref={ref}
          className={cn(
            inputVariants({ variant, size }),
            icon && "pl-14",
            className
          )}
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };