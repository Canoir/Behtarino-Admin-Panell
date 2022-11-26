import { BadgeOutlined, CommentOutlined } from '@mui/icons-material';

import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';
import GradingOutlinedIcon from '@mui/icons-material/GradingOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import { ROUTES } from './routes';
import StoreOutlinedIcon from '@mui/icons-material/StoreOutlined';

const tabNavigationRoutes = [
  { route: ROUTES.HOME, exact: true, label: 'خانه', icon: <HomeOutlinedIcon /> },
  { route: ROUTES.ADS, label: 'تبلیغات', icon: <CampaignOutlinedIcon /> },
  { route: ROUTES.ANALYTICS, label: 'تحلیل کسب‌وکار', icon: <StoreOutlinedIcon /> }
];
const sidebarRoutes = [
  {
    route: ROUTES.SUBSCRIPTION,
    label: 'عضویت ویژه',
    icon: <BadgeOutlined />
  },
  {
    route: ROUTES.SETTINGS,
    label: 'اطلاعات کسب‌وکار',
    icon: <GradingOutlinedIcon />
  },
  {
    route: ROUTES.REVIEW,
    label: 'دیدگاه ها',
    icon: <CommentOutlined />
  }
];
export { tabNavigationRoutes, sidebarRoutes };
