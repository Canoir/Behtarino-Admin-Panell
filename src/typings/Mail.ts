import moment from 'moment-jalaali';

export type MailBox = Mail[];

export interface Mail {
  id: number;
  label: string;
  text: string;
  created_at: string | moment.Moment;
  is_read: boolean;
}
