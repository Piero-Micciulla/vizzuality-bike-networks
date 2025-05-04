import { Network, NetworkDetail } from "@/types/network";

const BASE_URL = process.env.NEXT_PUBLIC_CITYBIKES_API;

if (!BASE_URL) {
  throw new Error("Missing environment variable: NEXT_PUBLIC_CITYBIKES_API");
}

/**
 * Fetches the list of all available networks.
 * @returns A list of Network objects.
 * @throws Error if the API call fails or response is malformed.
 */
export const getNetworks = async (): Promise<Network[]> => {
  const res = await fetch(`${BASE_URL}/networks`);
  if (!res.ok) throw new Error("Failed to fetch networks");

  const data = await res.json();

  if (!data?.networks) {
    throw new Error("Invalid response: 'networks' field missing.");
  }

  return data.networks;
};

/**
 * Fetches a specific network by its ID.
 * @param id - The unique ID of the network.
 * @returns A NetworkDetail object.
 * @throws Error if the API call fails or response is malformed.
 */
export const getNetworkById = async (id: string): Promise<NetworkDetail> => {
  const res = await fetch(`${BASE_URL}/networks/${id}`);
  if (!res.ok) throw new Error(`Failed to fetch network with id '${id}'`);

  const data = await res.json();

  if (!data?.network) {
    throw new Error("Invalid response: 'network' field missing.");
  }

  return data.network;
};