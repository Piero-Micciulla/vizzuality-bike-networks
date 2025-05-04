"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, MapPin, Briefcase } from "lucide-react";

import { getNetworkById } from "@/lib/api";
import { Map } from "@/components/Map";
import { Pagination } from "@/components/Pagination";
import { StationSorting } from "@/features/network-detail/station-sorting";
import StationList from "@/features/network-detail/station-list";
import Loader from "@/components/ui/loader";
import PageTransition from "@/components/ui/page-transition";

import { NetworkDetail } from "@/types/network";
import { MarkerData } from "@/types/map";
import { SortKey, SortOrder } from "@/types/station";

const itemsPerPage = 7;

export const NetworkDetailPageContent = () => {
  const { id } = useParams();
  const [network, setNetwork] = useState<NetworkDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [sortKey, setSortKey] = useState<SortKey>("free_bikes");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function fetchNetwork() {
      if (!id || Array.isArray(id)) return;

      setLoading(true);
      try {
        const fetchedNetwork = await getNetworkById(id);
        setNetwork(fetchedNetwork);
      } catch (error) {
        console.error("Failed to fetch network details:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchNetwork();
  }, [id]);

  const sortedStations = useMemo(() => {
    if (!network) return [];
    return [...network.stations].sort((a, b) => {
      const aVal = a[sortKey] ?? 0;
      const bVal = b[sortKey] ?? 0;
      return sortOrder === "asc" ? aVal - bVal : bVal - aVal;
    });
  }, [network, sortKey, sortOrder]);

  const paginatedStations = useMemo(() => {
    return sortedStations.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  }, [sortedStations, currentPage]);

  const markers: MarkerData[] = useMemo(() => {
    return (
      network?.stations.map((station) => ({
        id: station.id,
        latitude: station.latitude,
        longitude: station.longitude,
        label: station.name,
        freeBikes: station.free_bikes,
        emptySlots: station.empty_slots,
      })) ?? []
    );
  }, [network]);

  const totalPages = Math.ceil(sortedStations.length / itemsPerPage);

  const handleSortChange = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortOrder("desc");
    }
    setCurrentPage(1);
  };

  if (loading || !network) {
    return (
      <div className="flex items-center justify-center h-screen gap-2">
        <Loader className="border-torea-800 border-t-white" />
        <p className="text-white text-sm">Loading network details...</p>
      </div>
    );
  }

  return (
    <div className="page-outer-container--network-details">
      <div className="page-content-container">
        <PageTransition>
          <div className="page-inner-content-container--network-details">
            <div
              className="network-details-top-container"
              style={{ backgroundImage: "url('/bg-network-details.jpg')" }}
            >
              <Link href="/" aria-label="Back to homepage">
                <div className="w-10 h-10 bg-white text-grenadier-400 flex items-center justify-center rounded-full">
                  <ArrowLeft className="size-4" />
                </div>
              </Link>

              <h1 className="subheading mt-2">{network.name}</h1>

              <p className="network-details-data mb-2">
                <MapPin className="size-4" />
                <span>
                  {network.location.city}, {network.location.country}
                </span>
              </p>

              {network.company.length > 0 && (
                <p className="network-details-data mt-2">
                  <Briefcase className="size-4" />
                  <span>{network.company.join(", ")}</span>
                </p>
              )}

              <div className="pointer-events-none absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-torea-800 to-transparent" />
            </div>

            <div className="network-details-bottom-container">
              {network.stations.length > 0 ? (
                <>
                  <p className="mt-6">
                    All{" "}
                    <span className="network-details-count-container">
                      {network.stations.length}
                    </span>{" "}
                    stations
                  </p>

                  <StationSorting
                    sortField={sortKey}
                    sortDirection={sortOrder}
                    onSortChange={handleSortChange}
                    className="mt-4"
                  />

                  <StationList stations={paginatedStations} />

                  {totalPages > 1 && (
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={setCurrentPage}
                      variant="secondary"
                    />
                  )}
                </>
              ) : (
                <p className="text-sm text-gray-600 mb-4">
                  No stations available.
                </p>
              )}
            </div>
          </div>
        </PageTransition>
      </div>

      <div className="relative w-full h-[40vh] lg:basis-2/3 lg:h-[100vh]">
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
            <Loader />
            <p className="ml-3 text-sm text-zinc-500">Loading map...</p>
          </div>
        )}
      </div>
    </div>
  );
};
