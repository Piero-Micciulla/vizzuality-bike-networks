"use client";

import { Network } from "@/types/network";
import NetworkCard from "./network-card";

type Props = {
  networks: Network[];
};

const NetworkList = ({ networks }: Props) => {
  if (networks.length === 0) {
    return <p className="text-center text-zinc-500 mt-6">No networks found.</p>;
  }

  return (
    <ul
      className="flex flex-col max-h-[30vh] overflow-y-auto sm:max-h-none sm:overflow-visible"
      aria-label="List of available bike networks"
    >
      {networks.map((network) => (
        <NetworkCard key={network.id} network={network} />
      ))}
    </ul>
  );
};

export default NetworkList;
