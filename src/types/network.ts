export type Location = {
  city: string;
  country: string;
  latitude: number;
  longitude: number;
};

export type Network = {
  id: string;
  name: string;
  company: string[];
  href: string;
  location: Location;
};

export type Station = {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  free_bikes: number;
  empty_slots: number;
  extra?: any;
};

export type NetworkDetail = {
  id: string;
  name: string;
  company: string[];
  location: Location;
  stations: Station[];
};
