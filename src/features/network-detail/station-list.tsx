import { Station } from "@/types/network";

type StationListProps = {
  stations: Station[];
};

export const StationList = ({ stations }: StationListProps) => {
  if (stations.length === 0) {
    return <p className="text-sm text-gray-600 mb-4">No stations available.</p>;
  }

  return (
    <ul className="space-y-2">
      {stations.map((station) => (
        <li
          key={station.id}
          className="flex justify-between items-center border p-4 rounded-md"
        >
          <h3 className="w-1/2 font-medium">{station.name}</h3>
          <p className="w-1/4">{station.free_bikes}</p>
          <p className="w-1/4">{station.empty_slots}</p>
        </li>
      ))}
    </ul>
  );
};
