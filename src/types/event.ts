import { ArticleResponseImageType } from "./article";

export type eventResultType = {
  absolute_url: string;
  title: string;
  image: ArticleResponseImageType;
  attendance_event: {
    max_capacity: number;
    number_of_seats_taken: number;
    number_on_waitlist: number;
    waitlist: boolean;
  };
  organizer_name: string;
};

export type eventResponseType = {
  results: eventResultType[];
};
