"use client";

import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const popoverVariants = cva(
  "z-50 text-sm origin-[--radix-popover-content-transform-origin] rounded-md border shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
  {
    variants: {
      variant: {
        default: "",
        secondary: "bg-white border-torea-200 text-torea-800",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

type PopoverContentProps = React.ComponentProps<
  typeof PopoverPrimitive.Content
> &
  VariantProps<typeof popoverVariants>;

const Popover = (props: React.ComponentProps<typeof PopoverPrimitive.Root>) => (
  <PopoverPrimitive.Root data-slot="popover" {...props} />
);
Popover.displayName = "Popover";

const PopoverTrigger = (
  props: React.ComponentProps<typeof PopoverPrimitive.Trigger>
) => <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />;
PopoverTrigger.displayName = "PopoverTrigger";

const PopoverContent = ({
  className,
  align = "center",
  sideOffset = 4,
  variant,
  ...props
}: PopoverContentProps) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      data-slot="popover-content"
      align={align}
      sideOffset={sideOffset}
      className={cn(popoverVariants({ variant }), className)}
      {...props}
    />
  </PopoverPrimitive.Portal>
);
PopoverContent.displayName = "PopoverContent";

const PopoverAnchor = (
  props: React.ComponentProps<typeof PopoverPrimitive.Anchor>
) => <PopoverPrimitive.Anchor data-slot="popover-anchor" {...props} />;
PopoverAnchor.displayName = "PopoverAnchor";

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor };
