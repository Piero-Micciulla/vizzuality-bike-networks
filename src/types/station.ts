export type SortKey = "free_bikes" | "empty_slots";
export type SortOrder = "asc" | "desc";

export type StationSortingProps = {
  sortField: SortKey | null;
  sortDirection: SortOrder;
  onSortChange: (field: SortKey) => void;
  className?: string;
};
