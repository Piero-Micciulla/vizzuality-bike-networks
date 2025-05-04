import { cn } from "@/lib/utils";
import type { ReactNode, ElementType } from "react";

export type PageContainerProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
};

const PageContainer = ({
  children,
  className,
  as: Component = "div",
}: PageContainerProps) => {
  return (
    <Component className={cn("w-full px-4 sm:px-6 lg:px-0", className)}>
      {children}
    </Component>
  );
};

PageContainer.displayName = "PageContainer";

export default PageContainer;
