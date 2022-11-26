import { SubscriptionType } from './Subscription';
import TagType from '@typings/Tag';
import { WorkingHoursType } from '@typings/WorkingHours';

export interface BusinessType {
  id: number;
  acception_state: number;
  address: string;
  aparat_url: string | null;
  cover_image_url: string;
  description: string;
  facebook_url: string | null;
  latitude: string | number;
  linkedin_url: string | null;
  longitude: string | number;
  phone_zero_starts: string;
  main_neighborhood_name?: string;
  main_image_thumbnail_url?: string;
  slug: string;
  title_slug: string;
  title: string;
  twitter_url: string | null;
  whatsapp_url: string | null;
  instagram_url: string | null;
  telegram_url: string | null;
  website: string | null;
  youtube_url: string | null;
  more_phone_numbers: string;
  subscription_type: SubscriptionType;
  working_hours: WorkingHoursType;
  tags: TagType[];
}

export interface BusinessTypePatch extends Partial<Omit<BusinessType, 'tags'>> {
  has_been_closed: boolean;
  cover_image: string;
  address_details: string;

  phone: string;
  images: number[];
  tags: number[];
}

export interface BusinessReportType {
  id: number;
  average_position: number;
  business_slug: string;
  click_cost: number;
  click_count: number;
  click_type: number;
  details: BusinessReportDetailsSingleType[];
  timestamp: number;
}

export type BusinessReportDetailsSingleType = {
  cost: number;
  count: number;
  previous_page: string;
  sum_position: number;
};

export enum BusinessReportClickType {
  CLICK_ON_CARD = 0,
  NAVIGATION = 1,
  CALL_REQUEST = 2
}

export interface BusinessFullDetails {
  id: number;
  reviews_count: number;
  score: number;
  score_quantity: number;
  main_tag: string | null;
}

export type BusinessReportDetailsPagePerKey = { [key: string]: BusinessReportDetailsSingleType };

export type BusinessOverallReport = OverallSingleReport[];

type OverallSingleReport = { click_count: number; click_type: string };
