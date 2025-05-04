import { Station } from "@/types/network";
import StationCard from "./station-card";

type StationListProps = {
  stations: Station[];
};

const StationList = ({ stations }: StationListProps) => {
  if (stations.length === 0) {
    return (
      <p className="text-sm text-zinc-500 mb-4" role="note" aria-live="polite">
        No stations available.
      </p>
    );
  }

  return (
    <ul
      className="max-h-[30vh] overflow-y-auto sm:max-h-none sm:overflow-visible"
      aria-label="List of bike stations"
    >
      {stations.map((station) => (
        <StationCard key={station.id} station={station} />
      ))}
    </ul>
  );
};

export default StationList;
