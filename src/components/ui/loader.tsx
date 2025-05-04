import React from "react";
import { cn } from "@/lib/utils";

type LoaderProps = {
  className?: string;
};

const Loader = ({ className }: LoaderProps) => {
  return (
    <div className="flex items-center justify-center">
      <div
        className={cn("w-6 h-6 border-4 rounded-full animate-spin", className)}
      />
    </div>
  );
};

export default Loader;
