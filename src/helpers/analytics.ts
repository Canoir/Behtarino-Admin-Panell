import { BusinessReportDetailsPagePerKey, BusinessReportType } from '@typings/Business';

export const AnalyticsHelper = {
  businessReportReducer: (
    prevArr: BusinessReportDetailsPagePerKey,
    currentArray: BusinessReportType
  ): BusinessReportDetailsPagePerKey => {
    currentArray.details.forEach((currentReport) => {
      const result = Object.keys(prevArr).find((item) => item === currentReport.previous_page);

      if (result) {
        prevArr[result].count += currentReport.count;
        prevArr[result].cost += currentReport.cost;
      } else prevArr[currentReport.previous_page || currentReport.previous_page] = currentReport;
    });

    return prevArr;
  }
};
