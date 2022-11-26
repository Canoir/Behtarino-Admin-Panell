export enum WeekDayId {
  SATURDAY = '6',
  SUNDAY = '7',
  MONDAY = '1',
  TUESDAY = '2',
  WEDNESDAY = '3',
  THURSDAY = '4',
  FRIDAY = '5'
}

export const WEEK_DAYS = [
  { id: WeekDayId.SATURDAY, label: 'شنبه', english: 'Saturday' },
  { id: WeekDayId.SUNDAY, label: 'یک‌شنبه', english: 'Sunday' },
  { id: WeekDayId.MONDAY, label: 'دوشنبه', english: 'Monday' },
  { id: WeekDayId.TUESDAY, label: 'سه‌شنبه', english: 'Tuesday' },
  { id: WeekDayId.WEDNESDAY, label: 'چهارشنبه', english: 'Wednesday' },
  { id: WeekDayId.THURSDAY, label: 'پنج‌شنبه', english: 'Thursday' },
  { id: WeekDayId.FRIDAY, label: 'جمعه', english: 'Friday' }
];
