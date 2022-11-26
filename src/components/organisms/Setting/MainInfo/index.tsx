import { Alert, Chip, Grid, Typography } from '@mui/material';

import Box from '@mui/material/Box';
import { BusinessType } from '@typings/Business';
import Card from '@components/molecules/kit/Card';
import MainInfoItem from '@components/molecules/Setting/MainInfoItem';
import { ModalTypes } from '@constants/business';
import { SETTING } from '@constants/test';
import SettingDescriptionOverlay from '@components/organisms/Setting/MainInfo/Overlays/Description';
import SettingPhoneOverlay from '@components/organisms/Setting/MainInfo/Overlays/Phone';
import SettingTagsOverlay from '@components/organisms/Setting/MainInfo/Overlays/Tags';
import SettingTitleOverlay from '@components/organisms/Setting/MainInfo/Overlays/Title';
import SettingWebsiteOverlay from '@components/organisms/Setting/MainInfo/Overlays/Website';
import useBusiness from '@hooks/api/useBusiness';
import { useSearchParams } from 'react-router-dom';

type Props = { __test__?: { isUnApproved: boolean; data?: BusinessType } };
const SettingMainInfo = (props: Props) => {
  const { data: business, isUnApproved } = props.__test__ || useBusiness();
  const { title, phone_zero_starts: phone, description, website, tags } = business || {};

  const modalType = props.__test__ ? '' : useSearchParams()[0].get('modal');

  return (
    <>
      {isUnApproved ? (
        <Alert data-testId={SETTING.unApprovedStatus} severity="info">
          تغییرات شما برای کسب‌و‌کارتان ثبت شده و بعد از تایید کارشناسان بهترینو در سایت نمایش داده
          می‌شود.
        </Alert>
      ) : null}

      <Card title="اطلاعات کسب‌وکار">
        <Grid container>
          <MainInfoItem
            isDefaultOpen={modalType === ModalTypes.Title}
            title="اسم کسب‌وکار:"
            content={<Typography color="text.secondary">{title}</Typography>}
            Overlay={SettingTitleOverlay}
          />

          <MainInfoItem
            isDefaultOpen={modalType === ModalTypes.Phone}
            title="شماره تماس:"
            content={<Typography color="text.secondary">{phone || 'شماره تماس'}</Typography>}
            Overlay={SettingPhoneOverlay}
          />

          <MainInfoItem
            title="توضیحات:"
            content={
              <Typography color="text.secondary" maxHeight={24} overflow="hidden">
                {description || 'کسب‌وکار خود را معرفی کنید.'}
              </Typography>
            }
            isDefaultOpen={modalType === ModalTypes.Description}
            Overlay={SettingDescriptionOverlay}
          />

          <MainInfoItem
            isDefaultOpen={modalType === ModalTypes.Website}
            title="آدرس وبسایت:"
            content={<Typography color="text.secondary">{website || 'وبسایت'}</Typography>}
            Overlay={SettingWebsiteOverlay}
          />

          <MainInfoItem
            md={12}
            title="برچسب‌ها:"
            isDefaultOpen={modalType === ModalTypes.Tags}
            content={
              <Box display="flex" flexWrap="wrap" gap={2}>
                {tags?.slice(0, 3)?.map(({ title }, index) => (
                  <Chip key={index} size="small" label={title} />
                ))}
                <Chip key="last" size="small" label="بیشتر" color="primary" />
              </Box>
            }
            Overlay={SettingTagsOverlay}
            noDivider
          />
        </Grid>
      </Card>
    </>
  );
};

export default SettingMainInfo;
