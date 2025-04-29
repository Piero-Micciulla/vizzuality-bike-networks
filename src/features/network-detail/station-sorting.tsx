"use client";

import { StationSortingProps } from "@/types/station";

export const StationSorting = ({
  sortField,
  sortDirection,
  onSortChange,
}: StationSortingProps) => {
  const getLabel = (field: "free_bikes" | "empty_slots") => {
    if (sortField !== field) return "";
    return sortDirection === "asc" ? "↑" : "↓";
  };

  return (
    <div className="flex justify-between items-center font-semibold p-2 border-b mb-4">
      <div className="w-1/2">Station Name</div>
      <button
        onClick={() => onSortChange("free_bikes")}
        className="w-1/4 text-left"
      >
        Free Bikes {getLabel("free_bikes")}
      </button>
      <button
        onClick={() => onSortChange("empty_slots")}
        className="w-1/4 text-left"
      >
        Empty Slots {getLabel("empty_slots")}
      </button>
    </div>
  );
};
