"use client";

import Link from "next/link";
import { Network } from "@/types/network";

type Props = {
  networks: Network[];
};

export const NetworkList = ({ networks }: Props) => {
  if (networks.length === 0) {
    return <p className="text-center text-gray-500 mt-6">No networks found.</p>;
  }

  return (
    <ul className="space-y-4 mt-6">
      {networks.map((network) => (
        <li key={network.id} className="p-4 border rounded-md">
          <Link href={`/network/${network.id}`}>
            <h2 className="text-lg font-semibold">{network.name}</h2>
            <p className="text-sm text-gray-600">
              {network.location.city}, {network.location.country}
            </p>
            <p className="text-sm text-gray-500">
              {network.company?.join(", ")}
            </p>
          </Link>
        </li>
      ))}
    </ul>
  );
};
