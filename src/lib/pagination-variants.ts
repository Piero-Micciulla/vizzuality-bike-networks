import type { PaginationVariant } from "@/types/pagination";

export function getPaginationStyles(variant: PaginationVariant) {
  switch (variant) {
    case "secondary":
      return {
        button:
          "bg-transparent border-none text-white hover:bg-torea-200 hover:text-torea-950",
        active:
          "bg-torea-200 border border-torea-100 text-torea-950 hover:bg-torea-200",
        navigation:
          "bg-transparent text-white hover:bg-torea-300 hover:text-torea-950",
        dots: "text-white",
      };
    case "primary":
    default:
      return {
        button: "bg-transparent border-none text-torea-900 hover:bg-torea-50",
        active:
          "bg-torea-100 border border-torea-200 text-torea-900 hover:bg-torea-50",
        navigation: "bg-transparent text-torea-950 hover:bg-torea-50",
        dots: "text-torea-950",
      };
  }
}
