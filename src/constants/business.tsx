import {
  AccessTimeOutlined,
  EditOutlined,
  ImageOutlined,
  Instagram,
  LocationOnOutlined,
  PhoneAndroidOutlined,
  WebAssetOutlined
} from '@mui/icons-material';

import { Link } from 'react-router-dom';
import { ROUTES } from './routes';
import SettingAddressOverlay from '@components/organisms/Setting/Address/Overlay';
import SettingDescriptionOverlay from '@organs/Setting/MainInfo/Overlays/Description';
import SettingImagesOverlay from '@organs/Setting/Images/Overlay';
import SettingPhoneOverlay from '@organs/Setting/MainInfo/Overlays/Phone';
import SettingTagsOverlay from '@organs/Setting/MainInfo/Overlays/Tags';
import SettingTitleOverlay from '@organs/Setting/MainInfo/Overlays/Title';
import SettingWebsiteOverlay from '@organs/Setting/MainInfo/Overlays/Website';
import SettingWorkingHoursOverlay from '@organs/Setting/WorkingHours/Overlay';

export enum ModalTypes {
  Title = 'title',
  Description = 'desc',
  Website = 'website',
  Phone = 'phone',
  Address = 'adrs',
  CoverImage = 'cimg',
  Video = 'vid',
  Tags = 'tag',
  Hour = 'hour',
  Social = 'social'
}

export const stepsInfo = [
  {
    key: 'title',
    icon: <EditOutlined />,
    description: (
      <>
        لطفا{' '}
        <Link id="behtarino--admin--stepId" to={`${ROUTES.SETTINGS}?modal=${ModalTypes.Title}`}>
          عنوان کسب و کار
        </Link>{' '}
        خود را تکمیل کنید
      </>
    ),
    overlay: SettingTitleOverlay
  },
  {
    key: 'description',
    icon: <EditOutlined />,
    description: (
      <>
        لطفا به{' '}
        <Link
          id="behtarino--admin--stepId"
          to={`${ROUTES.SETTINGS}?modal=${ModalTypes.Description}`}>
          معرفی کسب و کار
        </Link>{' '}
        خود بپردازید
      </>
    ),
    overlay: SettingDescriptionOverlay
  },
  {
    key: 'website',
    icon: <WebAssetOutlined />,
    description: (
      <>
        لطفا{' '}
        <Link id="behtarino--admin--stepId" to={`${ROUTES.SETTINGS}?modal=${ModalTypes.Website}`}>
          آدرس وب سایت
        </Link>{' '}
        خود را ثبت کنید
      </>
    ),
    overlay: SettingWebsiteOverlay
  },
  {
    key: 'phone',
    icon: <PhoneAndroidOutlined />,
    description: (
      <>
        لطفا{' '}
        <Link id="behtarino--admin--stepId" to={`${ROUTES.SETTINGS}?modal=${ModalTypes.Phone}`}>
          شماره تلفن کسب و کار
        </Link>{' '}
        خود را وارد کنید
      </>
    ),
    overlay: SettingPhoneOverlay
  },
  {
    key: 'address',
    icon: <LocationOnOutlined />,
    description: (
      <>
        لطفا{' '}
        <Link id="behtarino--admin--stepId" to={`${ROUTES.SETTINGS}?modal=${ModalTypes.Address}`}>
          آدرس کسب و کار
        </Link>{' '}
        خود را وارد کنید
      </>
    ),
    overlay: SettingAddressOverlay
  },
  {
    key: 'cover_image',
    icon: <ImageOutlined />,
    description: (
      <>
        لطفا{' '}
        <Link
          id="behtarino--admin--stepId"
          to={`${ROUTES.SETTINGS}?modal=${ModalTypes.CoverImage}`}>
          عکس اصلی کسب و کار
        </Link>{' '}
        خود را آپلود کنید
      </>
    ),
    hasCoverImageUpload: true
  },
  {
    key: 'images',
    icon: <ImageOutlined />,
    description: (
      <>
        <Link id="behtarino--admin--stepId" to={`${ROUTES.SETTINGS}?modal=${ModalTypes.Video}`}>
          تصویرها و ویدئوهای کسب‌وکارتان
        </Link>{' '}
        را بارگذاری کنید
      </>
    ),
    overlay: SettingImagesOverlay
  },
  {
    key: 'tags',
    icon: <EditOutlined />,
    description: (
      <>
        لطفا{' '}
        <Link id="behtarino--admin--stepId" to={`${ROUTES.SETTINGS}?modal=${ModalTypes.Tags}`}>
          برچسب‌های کسب و کار
        </Link>{' '}
        خود را وارد کنید
      </>
    ),
    overlay: SettingTagsOverlay
  },
  {
    key: 'working_hours',
    icon: <AccessTimeOutlined />,
    description: (
      <>
        لطفا{' '}
        <Link id="behtarino--admin--stepId" to={`${ROUTES.SETTINGS}?modal=${ModalTypes.Hour}`}>
          ساعات کاری
        </Link>{' '}
        خود را وارد کنید
      </>
    ),
    overlay: SettingWorkingHoursOverlay
  },
  {
    key: 'social_links',
    icon: <Instagram />,
    description: (
      <>
        لطفا{' '}
        <Link id="behtarino--admin--stepId" to={`${ROUTES.SETTINGS}?modal=${ModalTypes.Social}`}>
          لینک‌ شبکه‌های اجتماعی
        </Link>{' '}
        خود را وارد کنید
      </>
    ),
    onClick: () => {
      const item = document.getElementById('socials');
      if (item) {
        item.scrollIntoView({ behavior: 'smooth' });
        item.style.transition = 'all 0.5s ease-in-out';
        item.style.border = '2px solid #0f197d';
        item.style.borderRadius = '8px';

        setTimeout(() => {
          item.style.borderColor = '#0f197d00';
        }, 1500);
      }
    }
  }
];