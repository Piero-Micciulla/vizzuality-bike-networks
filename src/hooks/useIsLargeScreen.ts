import { useEffect, useState } from "react";

/**
 * Hook that detects if the current screen size is large (≥1024px).
 * @returns `true` if the screen width is ≥ 1024px, otherwise `false`.
 */
export const useIsLargeScreen = (): boolean => {
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isLargeScreen;
};
