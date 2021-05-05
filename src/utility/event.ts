import { get, EVENT_URL } from "./api";
import { AJAXArguments } from "../types/api";
import { eventResponseType, eventResultType } from "../types/event";

const getJson = async ({ url }: AJAXArguments): Promise<eventResponseType> => {
  const response = await get({ url });
  return (await response.json()) as eventResponseType;
};

export const getLatestEvent = async (): Promise<eventResultType> => {
  const json = await getJson({ url: EVENT_URL });
  return json.results[0] as eventResultType;
};
