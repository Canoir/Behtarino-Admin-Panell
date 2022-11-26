import { useEffect, useState } from 'react';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import BusinessServices from '@services/business';
import CoverImageIcon from '@components/molecules/Setting/CoverImage/Icon';
import { MEDIA_TYPES } from '@constants/media';
import Uploader from '@components/molecules/kit/Uploader';
import { UploaderFileType } from '@typings/Uploader';
import useBusiness from '@hooks/api/useBusiness';

const imageSize = { xs: 95, md: 172 };

const SettingCoverImage = () => {
  const { data: business, refetch } = useBusiness();
  const { cover_image_url, slug, id } = business || {};

  const [image, setImage] = useState<UploaderFileType>();

  useEffect(() => {
    if (cover_image_url) {
      setImage({
        src: cover_image_url,
        thumbnail: cover_image_url,
        type: MEDIA_TYPES.IMAGE
      });
      refetch();
    }
  }, [cover_image_url]);

  return (
    <Uploader
      files={image ? [image] : undefined}
      setFiles={(images) => {
        setImage(images[0]);
        if (slug && images?.[0]?.address)
          BusinessServices.edit({ slug, cover_image: images[0].address, id });
      }}
      allowedMediaTypes={[MEDIA_TYPES.IMAGE]}>
      <Box position="relative">
        <Avatar
          alt="business-cover-image"
          src={image?.src || ''}
          sx={{
            width: imageSize,
            height: imageSize
          }}
        />
        <CoverImageIcon />
      </Box>
    </Uploader>
  );
};
export default SettingCoverImage;
