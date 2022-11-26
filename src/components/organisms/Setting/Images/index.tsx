import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@components/molecules/kit/Card';
import EditOutlined from '@mui/icons-material/EditOutlined';
import { ImageType } from '@typings/Image';
import { ModalTypes } from '@constants/business';
import SettingImagesOverlay from '@components/organisms/Setting/Images/Overlay';
import Typography from '@mui/material/Typography';
import UploaderButton from '@components/atoms/UploaderButton';
import useBusinessImages from '@hooks/api/useBusinessImages';
import { useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import useToggle from '@hooks/useToggle';

const SettingImages = () => {
  const modalType = useSearchParams()[0].get('modal');

  const { data: images = [] } = useBusinessImages();
  const [isOverlayOpen, toggleOverlayOpen] = useToggle(modalType === ModalTypes.Video);
  const imageWrapper = useRef<HTMLElement>(null);
  return (
    <>
      <SettingImagesOverlay open={isOverlayOpen} onClose={toggleOverlayOpen} />
      <Card
        title="تصاویر و ویدئوها"
        actionIcons={[
          // MUI Bug for not adding error color to Slider Colors!
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          { icon: <EditOutlined color={'text.primary' as any} />, onClick: toggleOverlayOpen }
        ]}>
        <Typography mt={2} color="text.secondary">
          با اضافه کردن تصویر/ویدئو مرتبط با کسب‌و‌کارتان، شانس دیده شدن آن را حداقل ۳ برابر کنید.
        </Typography>
        <Box
          ref={imageWrapper}
          display="flex"
          gap={2}
          maxHeight={70}
          overflow="hidden"
          flexWrap="wrap"
          mt={3}>
          {!images?.length ? <UploaderButton onClick={toggleOverlayOpen} /> : null}
          {images.map(({ thumbnail_url, title }: ImageType, index) => {
            const firstRowLastItemIndex = Math.floor(
              (imageWrapper.current?.clientWidth || 0) / 78 - 1
            );
            return (
              <Button
                key={index}
                onClick={toggleOverlayOpen}
                sx={{
                  width: 70,
                  height: 70,
                  overflow: 'hidden',
                  p: 0,
                  position: 'relative'
                }}>
                {index === firstRowLastItemIndex ? (
                  <Box
                    width="100%"
                    height="100%"
                    position="absolute"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    sx={{ background: 'rgba(0, 0, 0, 0.35)' }}>
                    <Typography color="bg.primary" fontSize="10px">
                      نمایش بیشتر
                    </Typography>
                  </Box>
                ) : null}
                <img
                  style={{ objectFit: 'cover' }}
                  width="100%"
                  height="100%"
                  src={thumbnail_url}
                  alt={title || 'business-image'}
                />
              </Button>
            );
          })}
        </Box>
      </Card>
    </>
  );
};
export default SettingImages;
