"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { Map } from "@/components/Map";
import { SearchInput } from "@/features/networks/search-input";
import { CountryFilter } from "@/features/networks/country-filter";
import { NetworkList } from "@/features/networks/network-list";
import { Pagination } from "@/components/Pagination";
import { getNetworks } from "@/lib/api";

import { Network } from "@/types/network";
import { MarkerData } from "@/types/map";

const HomePage = () => {
  const searchParams = useSearchParams();
  const [networks, setNetworks] = useState<Network[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 7;
  const search = searchParams.get("search")?.toLowerCase() || "";
  const country = searchParams.get("country") || "";

  useEffect(() => {
    async function fetchNetworks() {
      const fetchedNetworks = await getNetworks();
      setNetworks(fetchedNetworks);
    }

    fetchNetworks();
  }, []);

  const filteredNetworks = networks.filter((network) => {
    const matchesSearch =
      !search ||
      network.name.toLowerCase().includes(search) ||
      network.company?.join(", ").toLowerCase().includes(search);

    const matchesCountry =
      !country || network.location.country === country;

    return matchesSearch && matchesCountry;
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [search, country]);

  const totalPages = Math.ceil(filteredNetworks.length / itemsPerPage);

  const paginatedNetworks = filteredNetworks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const markers: MarkerData[] = filteredNetworks.map((network) => ({
    id: network.id,
    latitude: network.location.latitude,
    longitude: network.location.longitude,
    label: network.name,
  }));

  return (
    <main className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Bicycle Networks</h1>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <SearchInput />
        <CountryFilter />
      </div>

      <Map
        markers={markers}
        initialViewState={{
          latitude: 0,
          longitude: 0,
          zoom: 2,
        }}
        useUserLocation
      />

      <NetworkList networks={paginatedNetworks} />

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </main>
  );
};

export default HomePage;