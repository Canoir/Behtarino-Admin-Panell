import { getAveragePosition } from './getAvragePosition';
import { getAveragePositionDetails } from './getAveragePositionDetails';
import { getBizPageRequests } from './getPageRequests';
import { getClickRecommendation } from './getClickRecommendation';
import { getImageViews } from './getImageViews';
import { getPageRouteClick } from './getPageRouteClick';
import { getPageViews } from './getPageViews';
import { getRankPageCardClick } from './getRankPageClick';
import { getWebsiteClicked } from './getWebsiteClick';
import { getWhatsappClicks } from './getWhatsappClick';

const AnalyticsServices = {
  getBusinessPageView: getPageViews,
  getRankPageClicks: getRankPageCardClick,
  getCallRequests: getBizPageRequests,
  getWhatsappClicks: getWhatsappClicks,
  getWebsiteClicks: getWebsiteClicked,
  getImageClicks: getImageViews,
  getClickPriceRecommendation: getClickRecommendation,
  getAveragePositions: getAveragePosition,
  getPageRouteClick: getPageRouteClick,
  getAveragePositionsDetails: getAveragePositionDetails
};
export default AnalyticsServices;
