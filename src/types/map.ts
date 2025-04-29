export type MarkerData = {
  id: string;
  latitude: number;
  longitude: number;
  label?: string;
  freeBikes?: number;
  emptySlots?: number;
};

export type MapProps = {
  markers: MarkerData[];
  initialViewState?: {
    latitude: number;
    longitude: number;
    zoom: number;
  };
};
