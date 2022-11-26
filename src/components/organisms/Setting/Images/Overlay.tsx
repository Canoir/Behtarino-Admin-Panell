import Overlay, { OverlayProps } from '@components/molecules/kit/Overlay';

import Box from '@mui/material/Box';
import BusinessServices from '@services/business';
import { Grid } from '@mui/material';
import { ImageType } from '@typings/Image';
import { MEDIA_TYPES } from '@constants/media';
import SettingImagesItem from '@components/molecules/Setting/ImageItem';
import Uploader from '@components/molecules/kit/Uploader';
import UploaderButton from '@components/atoms/UploaderButton';
import { UploaderFileType } from '@typings/Uploader';
import useBusiness from '@hooks/api/useBusiness';
import useBusinessImages from '@hooks/api/useBusinessImages';
import { useCallback } from 'react';
import useToggle from '@hooks/useToggle';

const SettingImagesOverlay = ({ open, onClose }: Omit<OverlayProps, 'title' | 'children'>) => {
  const { data: images, refetch } = useBusinessImages();
  const { data: business } = useBusiness();
  const { id: businessId, slug: businessSlug } = business || {};
  const [isLoading, toggleLoading] = useToggle(false);
  const addBusinessImage = useCallback(
    async (files: UploaderFileType[]) => {
      toggleLoading();
      const file = files[0];
      const isImage = file.type === MEDIA_TYPES.IMAGE;
      if (businessId && file?.address) {
        const { id } = await BusinessServices.createMedia({
          businessId,
          [isImage ? 'image' : 'video']: file.address
        });
        await BusinessServices.edit({ images: [id], id: businessId, slug: businessSlug });
        await refetch();
      }
      toggleLoading();
    },
    [businessId, businessSlug]
  );
  return (
    <Overlay
      title="توضیحات"
      open={open}
      onClose={onClose}
      ctas={[{ title: 'ثبت تصاویر', onClick: onClose, loading: isLoading }]}>
      <Box p={3} minHeight={500}>
        <Grid container spacing={2} mt={3}>
          <Grid
            item
            xs={4}
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{ aspectRatio: '1/1' }}>
            <Uploader sx={{ width: '100%', height: '100%' }} setFiles={addBusinessImage}>
              <UploaderButton sx={{ width: '100%', height: '100%' }} />
            </Uploader>
          </Grid>
          {images?.map((item: ImageType, index) => (
            <SettingImagesItem
              key={index}
              {...item}
              onDelete={async (id) => {
                toggleLoading();
                await BusinessServices.deleteMedia(id);
                await refetch();
                toggleLoading();
              }}
            />
          ))}
        </Grid>
      </Box>
    </Overlay>
  );
};
export default SettingImagesOverlay;
