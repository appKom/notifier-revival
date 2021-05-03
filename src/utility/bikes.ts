import { get } from "./api";
import {
  stationAvailabilityType,
  stationType,
  constructedStationType,
} from "../types/bikes";

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

export const getFavoriteStations = async (): Promise<
  constructedStationType[]
> => {
  const favorite = ["14", "62"];
  let favoriteConstructedStations: constructedStationType[] = [];

  const availablity = await getAvailablity();
  const stations = await getStatations();

  const favoriteAvailability = availablity.filter((obj) =>
    favorite.includes(obj.station_id)
  );

  const favoriteStations = stations.filter((obj) =>
    favorite.includes(obj.station_id)
  );

  for (let i in favorite) {
    favoriteConstructedStations.push({
      name: favoriteStations[i].name,
      capacity: favoriteStations[i].capacity,
      station_id: favoriteStations[i].station_id,
      num_bikes_available: favoriteAvailability[i].num_bikes_available,
    });
  }
  return favoriteConstructedStations;
};
