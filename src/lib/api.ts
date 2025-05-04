import { Network, NetworkDetail } from "@/types/network";
const BASE_URL = process.env.NEXT_PUBLIC_CITYBIKES_API;

export const getNetworks = async (): Promise<Network[]> => {
  const res = await fetch(`${BASE_URL}/networks`);
  if (!res.ok) throw new Error("Failed to fetch networks");
  const data = await res.json();
  return data.networks;
};

export const getNetworkById = async (id: string): Promise<NetworkDetail> => {
  const res = await fetch(`${BASE_URL}/networks/${id}`);
  if (!res.ok) throw new Error(`Failed to fetch network with id ${id}`);
  const data = await res.json();
  return data.network;
};
