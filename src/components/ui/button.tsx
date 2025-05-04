import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center gap-2 justify-center text-sm transition-colors focus-visible:outline-none disabled:pointer-events-none rounded-full cursor-pointer",
  {
    variants: {
      variant: {
        primary: "bg-torea-800 text-white hover:bg-torea-700",
        secondary:
          "bg-transparent text-torea-800 border border-torea-200 hover:bg-torea-100",
      },
      size: {
        default: "px-8 py-3",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isSelected?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      isSelected = false,
      type = "button",
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        ref={ref}
        data-slot="button"
        className={cn(
          buttonVariants({ variant, size }),
          isSelected && "ring-1 ring-primary ring-offset-1",
          className
        )}
        type={asChild ? undefined : type}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
