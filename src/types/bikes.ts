export type stationAvailabilityType = {
  is_installed: number;
  is_renting: number;
  is_returning: number;
  last_reported: number;
  num_bikes_available: number;
  num_docks_available: number;
  station_id: string;
};

export type stationType = {
  address: string;
  capacity: number;
  lat: number;
  lon: number;
  name: string;
  station_id: string;
};

export type constructedStationType = {
  name: string;
  capacity: number;
  station_id: string;

  num_bikes_available: number;
};
