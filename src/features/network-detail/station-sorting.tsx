"use client";

import { StationSortingProps } from "@/types/station";
import { cn } from "@/lib/utils";
import { ArrowDownUp, ArrowUpDown } from "lucide-react";

export const StationSorting = ({
  sortField,
  sortDirection,
  onSortChange,
  className = "",
}: StationSortingProps) => {
  const getLabel = (field: "free_bikes" | "empty_slots") => {
    if (sortField !== field)
      return <ArrowUpDown className="inline size-4 ml-1" />;
    return sortDirection === "asc" ? (
      <ArrowUpDown className="inline size-4 ml-1" />
    ) : (
      <ArrowDownUp className="inline size-4 ml-1" />
    );
  };

  return (
    <div
      className={cn(
        "flex justify-between items-center font-medium text-sm p-2 border-b uppercase",
        className
      )}
    >
      <div className="w-1/2">Station Name</div>
      <button
        onClick={() => onSortChange("free_bikes")}
        className="w-1/4 text-left uppercase cursor-pointer flex flex-col lg:flex-row items-start lg:items-center gap-1"
      >
        Free Bikes {getLabel("free_bikes")}
      </button>
      <button
        onClick={() => onSortChange("empty_slots")}
        className="w-1/4 text-left uppercase cursor-pointer flex flex-col lg:flex-row items-start lg:items-center gap-1"
      >
        Empty Slots {getLabel("empty_slots")}
      </button>
    </div>
  );
};
