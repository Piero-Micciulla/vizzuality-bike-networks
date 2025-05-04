"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Map as ReactMap,
  Marker,
  NavigationControl,
  Popup,
} from "react-map-gl/mapbox-legacy";
import "mapbox-gl/dist/mapbox-gl.css";
import { MapProps, MarkerData } from "@/types/map";
import { formatStationLabel } from "@/lib/utils";
import mapboxgl from "mapbox-gl";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export const Map = ({
  markers,
  nearMeMarker,
  initialViewState,
  useUserLocation = false,
  showPopups = false,
  mapRef,
}: MapProps & {
  nearMeMarker?: MarkerData | null;
  useUserLocation?: boolean;
  showPopups?: boolean;
  mapRef?: React.MutableRefObject<mapboxgl.Map | null>;
}) => {
  const [selectedMarker, setSelectedMarker] = useState<MarkerData | null>(null);

  const validMarkers = useMemo(
    () =>
      markers.filter(
        (m) =>
          typeof m.latitude === "number" &&
          !isNaN(m.latitude) &&
          typeof m.longitude === "number" &&
          !isNaN(m.longitude)
      ),
    [markers]
  );

  useEffect(() => {
    if (
      typeof window === "undefined" ||
      !useUserLocation ||
      !("geolocation" in navigator)
    )
      return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        mapRef?.current?.easeTo({
          center: [position.coords.longitude, position.coords.latitude],
          zoom: 12,
          duration: 1000,
        });
      },
      (error) => {
        console.warn("Geolocation error:", error.message);
      },
      { enableHighAccuracy: true }
    );
  }, [useUserLocation, mapRef]);

  useEffect(() => {
    if (!mapRef?.current || validMarkers.length === 0) return;

    const bounds = new mapboxgl.LngLatBounds();
    validMarkers.forEach((marker) => {
      bounds.extend([marker.longitude, marker.latitude]);
    });

    mapRef.current.fitBounds(bounds, {
      padding: 60,
      duration: 1000,
    });
  }, [validMarkers, mapRef]);

  useEffect(() => {
    if (nearMeMarker && mapRef?.current) {
      mapRef.current.easeTo({
        center: [nearMeMarker.longitude, nearMeMarker.latitude],
        zoom: 12,
        duration: 1000,
      });
    }
  }, [nearMeMarker, mapRef]);

  const renderPopup = () => {
    if (!showPopups || !selectedMarker) return null;

    const totalCapacity =
      (selectedMarker.freeBikes || 0) + (selectedMarker.emptySlots || 0);

    const bikePercent = Math.min(
      ((selectedMarker.freeBikes || 0) / (totalCapacity || 1)) * 100,
      100
    );

    const slotPercent = Math.min(
      ((selectedMarker.emptySlots || 0) / (totalCapacity || 1)) * 100,
      100
    );

    return (
      <Popup
        latitude={selectedMarker.latitude}
        longitude={selectedMarker.longitude}
        onClose={() => setSelectedMarker(null)}
        closeOnClick={false}
        anchor="bottom"
      >
        <div
          className="relative bg-white rounded-md shadow-lg px-4 py-3 text-sm text-black w-[260px] -translate-x-5 translate-y-4"
          role="tooltip"
        >
          <h3 className="font-semibold text-torea-800 mb-2">
            {formatStationLabel(selectedMarker.label || "")}
          </h3>

          <div className="mb-2">
            <div className="flex justify-between mb-1">
              <span>Bikes</span>
              <span className="font-bold">{selectedMarker.freeBikes ?? 0}</span>
            </div>
            <div className="h-2 rounded bg-gray-200">
              <div
                className="h-2 rounded bg-lime-500"
                style={{ width: `${bikePercent}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <span>Slots</span>
              <span className="font-bold">
                {selectedMarker.emptySlots ?? 0}
              </span>
            </div>
            <div className="h-2 rounded bg-gray-200">
              <div
                className="h-2 rounded bg-grenadier-800"
                style={{ width: `${slotPercent}%` }}
              />
            </div>
          </div>

          <div className="absolute bottom-[-6px] left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white rotate-45 shadow-lg" />
        </div>
      </Popup>
    );
  };

  return (
    <div className="w-full h-full">
      <ReactMap
        ref={(instance) => {
          if (instance && mapRef) {
            mapRef.current = instance.getMap();
          }
        }}
        mapboxAccessToken={MAPBOX_TOKEN}
        initialViewState={initialViewState}
        mapStyle="mapbox://styles/mapbox/light-v10"
      >
        <NavigationControl showZoom showCompass={false} position="top-right" />

        {validMarkers.map((marker) => (
          <Marker
            key={marker.id}
            latitude={marker.latitude}
            longitude={marker.longitude}
            onClick={() => showPopups && setSelectedMarker(marker)}
          >
            <div className="map-marker">
              <div className="map-marker-ping" />
              <div className="map-marker-dot" />
            </div>
          </Marker>
        ))}

        {nearMeMarker && (
          <Marker
            latitude={nearMeMarker.latitude}
            longitude={nearMeMarker.longitude}
          >
            <div className="map-marker">
              <div className="map-marker-ping" />
              <div className="map-marker-dot" />
            </div>
          </Marker>
        )}

        {renderPopup()}
      </ReactMap>
    </div>
  );
};
