import { getAdsOverallReport } from './adsOverallReport';
import { getAdsReport } from './adsReport';
import { getAdsSuggestedPackages } from './packages';
import { getRecommendedClicks } from './recommendedClicks';
import { patchAdsSettings } from './updateAdsSetting';

const AdsServices = {
  packages: getAdsSuggestedPackages,
  report: getAdsReport,
  overAllReport: getAdsOverallReport,
  update: patchAdsSettings,
  recommendedClicks: getRecommendedClicks
};
export default AdsServices;
