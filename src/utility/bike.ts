import { get } from "./api";
import {
  stationAvailabilityType,
  stationType,
  constructedStationType,
} from "../types/bike";

const BIKE_STATION_URL =
  "https://gbfs.urbansharing.com/trondheimbysykkel.no/station_information.json";

const BIKE_AVAILABLE_URL =
  "https://gbfs.urbansharing.com/trondheimbysykkel.no/station_status.json";

export const getStatations = async (): Promise<stationType[]> => {
  const response = await get({
    url: BIKE_STATION_URL,
    headers: {
      "Client-Identifier": "appkom-chrome-exstension",
    },
  });
  const json = await response.json();
  return json.data.stations as stationType[];
};

export const getAvailablity = async (): Promise<stationAvailabilityType[]> => {
  const response = await get({
    url: BIKE_AVAILABLE_URL,
    headers: {
      "Client-Identifier": "appkom-chrome-exstension",
    },
  });
  const json = await response.json();
  return json.data.stations as stationAvailabilityType[];
};

export const getFavoriteStation = async (): Promise<constructedStationType> => {
  const favorite = "14";
  let favoriteConstructedStations: constructedStationType;

  const availablity = await getAvailablity();
  const stations = await getStatations();

  const favoriteAvailability = availablity.filter(
    (obj) => favorite == obj.station_id
  );

  const favoriteStation = stations.filter((obj) => favorite == obj.station_id);

  favoriteConstructedStations = {
    name: favoriteStation[0].name,
    capacity: favoriteStation[0].capacity,
    station_id: favoriteStation[0].station_id,
    num_bikes_available: favoriteAvailability[0].num_bikes_available,
  };

  return favoriteConstructedStations;
};
