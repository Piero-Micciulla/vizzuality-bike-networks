import { Station } from "@/types/network";
import { formatStationLabel } from "@/lib/utils";

type Props = {
  station: Station;
};

const StationCard = ({ station }: Props) => {
  return (
    <li
      className="flex justify-between items-center p-2 py-8 border-b border-dotted border-b-[1px] hover:pl-4 hover:bg-white/30
    transition-all duration-200"
    >
      <h3 className="w-1/2">{formatStationLabel(station.name)}</h3>
      {/* <h3 className="w-1/2">{station.name}</h3> */}
      <p className="w-1/4 font-bold">{station.free_bikes}</p>
      <p className="w-1/4 font-bold">{station.empty_slots}</p>
    </li>
  );
};

export default StationCard;
