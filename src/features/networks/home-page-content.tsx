"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";

import { Map } from "@/components/Map";
import { SearchInput } from "@/features/networks/search-input";
import { CountryFilter } from "@/features/networks/country-filter";
import NetworkList from "@/features/networks/network-list";
import { Pagination } from "@/components/Pagination";
import Loader from "@/components/ui/loader";
import PageTransition from "@/components/ui/page-transition";
import { getNetworks } from "@/lib/api";

import { Network } from "@/types/network";
import { MarkerData } from "@/types/map";

import { Bike, LocateFixed } from "lucide-react";

export const HomePageContent = () => {
  const searchParams = useSearchParams();
  const [networks, setNetworks] = useState<Network[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [nearMeMarker, setNearMeMarker] = useState<MarkerData | null>(null);
  const [nearMeNetwork, setNearMeNetwork] = useState<Network | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  const itemsPerPage = 7;
  const search = searchParams.get("search")?.toLowerCase() || "";
  const country = searchParams.get("country") || "";

  useEffect(() => {
    async function fetchNetworks() {
      setLoading(true);
      try {
        const fetchedNetworks = await getNetworks();
        setNetworks(fetchedNetworks);
      } catch (error) {
        console.error("Failed to fetch networks:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchNetworks();
  }, []);

  const filteredNetworks = useMemo(() => {
    return networks.filter((network) => {
      const matchesSearch =
        !search ||
        network.name.toLowerCase().includes(search) ||
        network.company?.join(", ").toLowerCase().includes(search);

      const matchesCountry = !country || network.location.country === country;

      return matchesSearch && matchesCountry;
    });
  }, [networks, search, country]);

  const paginatedNetworks = useMemo(() => {
    return filteredNetworks.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  }, [filteredNetworks, currentPage]);

  const markers: MarkerData[] = useMemo(() => {
    return filteredNetworks.map((network) => ({
      id: network.id,
      latitude: network.location.latitude,
      longitude: network.location.longitude,
      label: network.name,
    }));
  }, [filteredNetworks]);

  useEffect(() => {
    setCurrentPage(1);
    setNearMeNetwork(null);
  }, [search, country]);

  const totalPages = Math.ceil(filteredNetworks.length / itemsPerPage);

  const handleNearMeClick = () => {
    if (!navigator.geolocation) {
      console.warn("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;

        const closest = networks
          .map((network) => {
            const dx = userLat - network.location.latitude;
            const dy = userLng - network.location.longitude;
            const distance = Math.sqrt(dx * dx + dy * dy);
            return { network, distance };
          })
          .sort((a, b) => a.distance - b.distance)[0];

        if (closest) {
          const { network } = closest;

          setNearMeMarker({
            id: network.id,
            latitude: network.location.latitude,
            longitude: network.location.longitude,
            label: network.name,
          });

          setNearMeNetwork(network);

          if (mapRef.current) {
            mapRef.current.easeTo({
              center: [network.location.longitude, network.location.latitude],
              zoom: 12,
              duration: 1000,
            });
          }
        }
      },
      (error) => {
        console.warn("Geolocation error:", error.message);
      },
      { enableHighAccuracy: true }
    );
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-2">
        <Loader className="border-white border-t-grenadier-400" />
        <p className="text-zinc-500 text-sm">Searching networks...</p>
      </div>
    );
  }

  return (
    <div className="page-outer-container">
      <div className="page-content-container">
        <PageTransition>
          <div className="page-inner-content-container">
            <h1 className="heading flex items-center gap-2">
              <Bike className="size-6" />
              CycleMap
            </h1>

            <h2 className="subheading text-torea-800 mt-4">
              Discover Bikes Network
            </h2>

            <p className="paragraph mt-2">
              Lorem ipsum dolor sit amet consectetur. A volutpat adipiscing
              placerat turpis magna sem tempor amet faucibus. Arcu praesent
              viverra pellentesque nisi quam in rhoncus.
            </p>

            <div className="flex flex-col">
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <SearchInput />
                <CountryFilter />
              </div>

              <div className="flex flex-col gap-2 mt-4">
                <NetworkList
                  networks={nearMeNetwork ? [nearMeNetwork] : paginatedNetworks}
                />

                {!nearMeNetwork && totalPages > 1 && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                )}
              </div>
            </div>
          </div>
          <div className="pointer-events-none absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-white to-transparent" />
        </PageTransition>
      </div>

      <div className="relative w-full h-[40vh] lg:basis-2/3 lg:h-[100vh]">
        <button
          onClick={handleNearMeClick}
          className="near-me-button"
          aria-label="Find nearest network"
        >
          <LocateFixed className="size-4" />
          Near Me
        </button>

        <Map
          markers={markers}
          nearMeMarker={nearMeMarker}
          initialViewState={{ latitude: 0, longitude: 0, zoom: 2 }}
          useUserLocation={false}
          showPopups={true}
          mapRef={mapRef}
        />
      </div>
    </div>
  );
};
