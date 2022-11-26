import { WeekDayId } from '@constants/weekDays';

export interface WorkingHoursType {
  [WeekDayId.SATURDAY]: CustomTupleSize;
  [WeekDayId.SUNDAY]: CustomTupleSize;
  [WeekDayId.MONDAY]: CustomTupleSize;
  [WeekDayId.TUESDAY]: CustomTupleSize;
  [WeekDayId.WEDNESDAY]: CustomTupleSize;
  [WeekDayId.THURSDAY]: CustomTupleSize;
  [WeekDayId.FRIDAY]: CustomTupleSize;
}

type CustomTupleSize = null | [] | WorkingHoursDayType[];

export interface WorkingHoursDayType {
  to?: string;
  from?: string;
}
