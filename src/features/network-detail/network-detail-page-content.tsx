"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { getNetworkById } from "@/lib/api";
import { Map } from "@/components/Map";
import { Pagination } from "@/components/Pagination";
import { StationSorting } from "@/features/network-detail/station-sorting";
import { StationList } from "@/features/network-detail/station-list";

import { NetworkDetail } from "@/types/network";
import { MarkerData } from "@/types/map";
import { SortKey, SortOrder } from "@/types/station";

const itemsPerPage = 7;

export const NetworkDetailPageContent = () => {
  const { id } = useParams();
  const [network, setNetwork] = useState<NetworkDetail | null>(null);
  const [sortKey, setSortKey] = useState<SortKey>("free_bikes");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function fetchNetwork() {
      if (!id || Array.isArray(id)) return;
      const fetchedNetwork = await getNetworkById(id);
      setNetwork(fetchedNetwork);
    }

    fetchNetwork();
  }, [id]);

  if (!network) {
    return <div>Loading network...</div>;
  }

  const markers: MarkerData[] = network.stations.map((station) => ({
    id: station.id,
    latitude: station.latitude,
    longitude: station.longitude,
    label: station.name,
    freeBikes: station.free_bikes,
    emptySlots: station.empty_slots,
  }));

  const sortedStations = [...network.stations].sort((a, b) => {
    const valueA = a[sortKey] ?? 0;
    const valueB = b[sortKey] ?? 0;
    return sortOrder === "asc" ? valueA - valueB : valueB - valueA;
  });

  const totalPages = Math.ceil(sortedStations.length / itemsPerPage);

  const paginatedStations = sortedStations.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSortChange = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortOrder("desc");
    }
    setCurrentPage(1);
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-2">{network.name}</h1>

      <p className="text-sm text-gray-600 mb-2">
        {network.location.city}, {network.location.country}
      </p>

      {network.company.length > 0 && (
        <p className="text-sm mb-4">
          <span className="font-semibold">Companies:</span>{" "}
          {network.company.join(", ")}
        </p>
      )}

      {markers.length > 0 ? (
        <Map
          markers={markers}
          initialViewState={{
            latitude: markers[0].latitude,
            longitude: markers[0].longitude,
            zoom: 12,
          }}
          showPopups
        />
      ) : (
        <div className="w-full h-[400px] bg-gray-200 flex items-center justify-center">
          Loading map...
        </div>
      )}

      <h2 className="text-xl font-semibold mt-8 mb-2">Stations</h2>

      {network.stations.length > 0 ? (
        <>
          <p className="text-sm text-gray-600 mb-4">
            All {network.stations.length} stations
          </p>

          <StationSorting
            sortField={sortKey}
            sortDirection={sortOrder}
            onSortChange={handleSortChange}
          />

          <StationList stations={paginatedStations} />

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </>
      ) : (
        <p className="text-sm text-gray-600 mb-4">No stations available.</p>
      )}
    </>
  );
};
