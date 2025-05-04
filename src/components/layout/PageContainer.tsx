import { cn } from "@/lib/utils";
import type { PageContainerProps } from "@/types/layout";

const PageContainer = ({ children, className }: PageContainerProps) => {
  return (
    <div className={cn("w-full px-4 sm:px-6 lg:px-0", className)}>
      {children}
    </div>
  );
};

export default PageContainer;
