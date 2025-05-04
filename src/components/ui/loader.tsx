import React from "react";
import { cn } from "@/lib/utils";

type LoaderProps = {
  className?: string;
  size?: number; // in pixels
  borderWidth?: number;
  label?: string;
};

const Loader = ({
  className,
  size = 24,
  borderWidth = 4,
  label = "Loading...",
}: LoaderProps) => {
  return (
    <div
      className="flex items-center justify-center"
      role="status"
      aria-label={label}
    >
      <div
        className={cn(
          "rounded-full animate-spin border-t-transparent",
          className
        )}
        style={{
          width: size,
          height: size,
          borderWidth: borderWidth,
        }}
      />
    </div>
  );
};

export default Loader;
