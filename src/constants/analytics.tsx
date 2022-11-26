import {
  BarChartOutlined,
  LanguageOutlined,
  PercentOutlined,
  PhoneOutlined,
  PhotoOutlined,
  TouchAppOutlined,
  VisibilityOutlined,
  WhatsApp
} from '@mui/icons-material';

export const AnalyticsOverallItems = {
  pageViews: {
    title: 'بازدید کسب‌وکار',
    icon: <VisibilityOutlined color="secondary" />
  },
  rankClicks: {
    title: 'کلیک روی کارت کسب‌وکار',
    icon: <TouchAppOutlined color="secondary" />
  },
  callRequests: {
    title: 'کلیک روی دکمه تماس',
    icon: <PhoneOutlined color="secondary" />
  },
  callRequestsOnPageClick: {
    title: 'نسبت تماس به کلیک روی کارت',
    icon: <PercentOutlined color="secondary" />
  },
  whatsappClicks: {
    title: 'کلیک روی چت',
    icon: <WhatsApp color="secondary" />
  },
  imageviewClicks: {
    title: 'کلیک روی تصاویر',
    icon: <PhotoOutlined color="secondary" />
  },
  websiteClicks: {
    title: 'کلیک روی وب‌سایت',
    icon: <LanguageOutlined color="secondary" />
  },
  averagePositions: {
    title: 'میانگین جایگاه',
    icon: <BarChartOutlined color="secondary" />
  }
};

export const AnalyticsChartsItems: Record<string, { title: string }> = {
  pageViews: {
    title: 'بازدید کسب‌وکار'
  },
  rankClicks: {
    title: 'کلیک روی کارت کسب‌وکار'
  },
  callRequests: {
    title: 'کلیک روی دکمه تماس'
  },
  callRequestsOnPageClick: {
    title: 'نسبت تماس به کلیک روی کارت'
  },
  whatsappClicks: {
    title: 'کلیک روی چت'
  },
  imageviewClicks: {
    title: 'کلیک روی تصاویر'
  },
  websiteClicks: {
    title: 'کلیک روی وب‌سایت'
  },
  averagePositions: {
    title: 'میانگین جایگاه'
  },
  pageRouteClicks: {
    title: 'کلیک روی مسیریابی'
  }
};

export type AnalyticsAvailableKeys = keyof typeof AnalyticsOverallItems;

export type AnalyticsChartsKeys = keyof typeof AnalyticsChartsItems;
