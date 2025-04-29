// "use client";

// import { useEffect, useRef, useState } from "react";
// import {
//   Map as ReactMap,
//   Marker,
//   NavigationControl,
// } from "react-map-gl/mapbox-legacy";
// import "mapbox-gl/dist/mapbox-gl.css";
// import { MapProps } from "@/types/map";
// import mapboxgl from "mapbox-gl";

// const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

// export const Map = ({
//   markers,
//   initialViewState,
//   useUserLocation = false,
// }: MapProps & { useUserLocation?: boolean }) => {
//   const mapRef = useRef<mapboxgl.Map | null>(null);
//   const [userLocationCentered, setUserLocationCentered] = useState(false); // 👈 NEW

//   useEffect(() => {
//     console.log("useUserLocation inside Map:", useUserLocation);

//     if (typeof window === "undefined") return;
//     if (!useUserLocation) return;
//     if (!("geolocation" in navigator)) {
//       console.log("Geolocation not available.");
//       return;
//     }

//     console.log("Attempting geolocation fetch...");

//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         console.log("Got location:", position.coords);

//         if (mapRef.current) {
//           mapRef.current.easeTo({
//             center: [position.coords.longitude, position.coords.latitude],
//             zoom: 12,
//             duration: 1000,
//           });
//           setUserLocationCentered(true);
//         }
//       },
//       (error) => {
//         if (process.env.NODE_ENV === "development") {
//           console.warn("Could not fetch user location:", error.message);
//         }
//         setUserLocationCentered(false);
//       },
//       { enableHighAccuracy: true }
//     );
//   }, [useUserLocation]);

//   useEffect(() => {
//     if (!mapRef.current || markers.length === 0) return;

//     if (userLocationCentered) return;

//     const bounds = new mapboxgl.LngLatBounds();

//     markers.forEach((marker) => {
//       bounds.extend([marker.longitude, marker.latitude]);
//     });

//     mapRef.current.fitBounds(bounds, {
//       padding: 60,
//       duration: 1000,
//     });
//   }, [markers, userLocationCentered]);

//   return (
//     <div className="w-full h-[400px]">
//       <ReactMap
//         ref={(instance) => {
//           if (instance) mapRef.current = instance.getMap();
//         }}
//         mapboxAccessToken={MAPBOX_TOKEN}
//         initialViewState={initialViewState}
//         mapStyle="mapbox://styles/mapbox/streets-v11"
//       >
//         <NavigationControl position="top-left" />
//         {markers.map((marker) => (
//           <Marker
//             key={marker.id}
//             latitude={marker.latitude}
//             longitude={marker.longitude}
//           >
//             <div className="text-2xl">📍</div>
//           </Marker>
//         ))}
//       </ReactMap>
//     </div>
//   );
// };

"use client";

import { useEffect, useRef, useState } from "react";
import {
  Map as ReactMap,
  Marker,
  NavigationControl,
  Popup,
} from "react-map-gl/mapbox-legacy";
import "mapbox-gl/dist/mapbox-gl.css";
import { MapProps, MarkerData } from "@/types/map";
import mapboxgl from "mapbox-gl";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export const Map = ({
  markers,
  initialViewState,
  useUserLocation = false,
  showPopups = false,
}: MapProps & { useUserLocation?: boolean; showPopups?: boolean }) => {
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [userLocationCentered, setUserLocationCentered] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState<MarkerData | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!useUserLocation) return;
    if (!("geolocation" in navigator)) {
      console.log("Geolocation not available.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        if (mapRef.current) {
          mapRef.current.easeTo({
            center: [position.coords.longitude, position.coords.latitude],
            zoom: 12,
            duration: 1000,
          });
          setUserLocationCentered(true);
        }
      },
      (error) => {
        if (process.env.NODE_ENV === "development") {
          console.warn("Could not fetch user location:", error.message);
        }
        setUserLocationCentered(false);
      },
      { enableHighAccuracy: true }
    );
  }, [useUserLocation]);

  useEffect(() => {
    if (!mapRef.current || markers.length === 0) return;
    if (userLocationCentered) return;

    const bounds = new mapboxgl.LngLatBounds();
    markers.forEach((marker) => {
      bounds.extend([marker.longitude, marker.latitude]);
    });

    mapRef.current.fitBounds(bounds, {
      padding: 60,
      duration: 1000,
    });
  }, [markers, userLocationCentered]);

  return (
    <div className="w-full h-[400px]">
      <ReactMap
        ref={(instance) => {
          if (instance) mapRef.current = instance.getMap();
        }}
        mapboxAccessToken={MAPBOX_TOKEN}
        initialViewState={initialViewState}
        mapStyle="mapbox://styles/mapbox/streets-v11"
      >
        <NavigationControl position="top-left" />

        {markers.map((marker) => (
          <Marker
            key={marker.id}
            latitude={marker.latitude}
            longitude={marker.longitude}
            onClick={() => showPopups && setSelectedMarker(marker)}
          >
            <div className="text-2xl cursor-pointer">📍</div>
          </Marker>
        ))}

        {showPopups && selectedMarker && (
          <Popup
            latitude={selectedMarker.latitude}
            longitude={selectedMarker.longitude}
            onClose={() => setSelectedMarker(null)}
            closeOnClick={false}
            anchor="top"
          >
            <div className="text-sm">
              <h3 className="font-semibold">{selectedMarker.label}</h3>
              {selectedMarker.freeBikes !== undefined && (
                <p>Free Bikes: {selectedMarker.freeBikes}</p>
              )}
              {selectedMarker.emptySlots !== undefined && (
                <p>Empty Slots: {selectedMarker.emptySlots}</p>
              )}
            </div>
          </Popup>
        )}
      </ReactMap>
    </div>
  );
};
