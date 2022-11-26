import moment from "moment-jalaali";

export interface Review {
  id: number;
  business_slug: string;
  comment: string;
  created_at: moment.Moment | null;
  creator_name: string;
  disliked: boolean;
  down_vote_last_update: moment.Moment | null;
  down_votes_count: number;
  liked: boolean;
  rate: number;
  reply: string | null;
  up_vote_last_update: moment.Moment | null;
  up_votes_count: number;
  images: string[];
}
