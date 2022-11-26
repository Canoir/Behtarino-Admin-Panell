import { SOCIAL_PREPENDING_TEXTS, SOCIAL_TYPES } from '@constants/social';

import { WeekDayId } from '@constants/weekDays';
import { WorkingHoursType } from '@typings/WorkingHours';

const BusinessHelper = {
  social: {
    addPrependingText: (value: string, socialType: SOCIAL_TYPES) => {
      if (!value) return value;
      return SOCIAL_PREPENDING_TEXTS[socialType][0] + value;
    }
  },
  normalizeWorkingHours(workingHours: WorkingHoursType | undefined, id: WeekDayId): string {
    
    if (workingHours?.[id]) {
      if (Array.isArray(workingHours[id])) {
        return (
          workingHours[id]
            ?.filter((item) => !!item && !!item.from && !!item.to)
            ?.map((item) => {
              return `${item?.from?.slice(0, -3)} تا ${item?.to?.slice(0, -3)} \t`;
            })
            .reduce((acc, curr) => {
              return acc + curr;
            }, '') || ''
        );
      }
      return '';
    }

    return 'تعطیل';
  }
};

export default BusinessHelper;
