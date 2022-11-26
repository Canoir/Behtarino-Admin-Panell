import { BusinessReportClickType, BusinessReportType } from '@typings/Business';

import Http from '@utils/Http';
import endpoints from '@constants/endpoints';

export default async function getBusinessReport(
  slug: string,
  startDate: number,
  endDate: number,
  clickType: BusinessReportClickType
) {
  try {
    return (
      await Http.get<BusinessReportType[]>({
        url: endpoints.getBusinessReport(slug),
        params: {
          click_type: clickType,
          from_date: startDate,
          to_date: endDate
        }
      })
    ).data;
  } catch (error) {
    throw error;
  }
}
