import { Button, Typography } from '@mui/material';
import { Else, If, Then } from 'react-if';
import { FC, ReactElement, useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import BusinessServices from '@services/business';
import { LinearProgressWithLabel } from '@components/atoms/LinearProgressWithLabel';
import { MEDIA_TYPES } from '@constants/media';
import { OverlayProps } from '@components/molecules/kit/Overlay';
import Uploader from '@components/molecules/kit/Uploader';
import { UploaderFileType } from '@typings/Uploader';
import { stepsInfo } from '@constants/business';
import useBusiness from '@hooks/api/useBusiness';
import { useCheckStep } from '@hooks/useCheckStep';
import useToggle from '@hooks/useToggle';

const SettingRegisterProgress = (): JSX.Element => {
  const { step } = useCheckStep();

  const { data: business } = useBusiness();
  const { cover_image_url, slug, id } = business || {};

  const [image, setImage] = useState<UploaderFileType>();

  useEffect(() => {
    if (cover_image_url)
      setImage({
        src: cover_image_url,
        thumbnail: cover_image_url,
        type: MEDIA_TYPES.IMAGE
      });
  }, [cover_image_url]);

  const stepLength = step?.length || 0;

  return (
    <Box mt={6}>
      <LinearProgressWithLabel
        value={stepLength * 10}
        title={`${stepLength}/10`}
        color="secondary"
      />

      <Typography sx={{ mt: 5 }}>
        با تکمیل {`${10 - stepLength}`} مرحله‌ی دیگر، بیشتر دیده شوید.
      </Typography>

      {stepLength < stepsInfo.length ? (
        <Box mt={2.5} mb={4} display="flex" gap="16px">
          {stepsInfo
            .filter((info) => !step?.some((completedStep) => completedStep === info.key))
            ?.slice(0, 2)
            ?.map((stepInfo, i) => (
              <If key={i} condition={stepInfo.hasCoverImageUpload}>
                <Then>
                  <Uploader
                    sx={{ width: '100%' }}
                    files={image ? [image] : undefined}
                    setFiles={(images) => {
                      setImage(images[0]);
                      if (slug && images?.[0]?.address)
                        BusinessServices.edit({ slug, cover_image: images[0].address, id });
                    }}
                    allowedMediaTypes={[MEDIA_TYPES.IMAGE]}>
                    <ProgressStepSingle {...stepInfo} key={stepInfo.key} />
                  </Uploader>
                </Then>

                <Else>
                  <ProgressStepSingle {...stepInfo} key={stepInfo.key} />
                </Else>
              </If>
            ))}
        </Box>
      ) : null}
    </Box>
  );
};
export default SettingRegisterProgress;

type Props = {
  icon: ReactElement;
  description: ReactElement;
  onClick?: () => void;
  overlay?: FC<Omit<OverlayProps, 'title' | 'children'>>;
};
function ProgressStepSingle(props: Props) {
  const { description, icon, overlay, onClick } = props;

  const [isOverlayOpen, toggleOverlay] = useToggle(false);

  return (
    <>
      {overlay?.({ open: isOverlayOpen, onClose: toggleOverlay })}

      <Button
        sx={{
          borderRadius: '8px',
          border: '1px solid #EEE',
          height: '78px',
          width: '100%',
          justifyContent: 'flex-start'
        }}
        onClick={onClick || toggleOverlay}>
        <Box p={2} display="flex" flexDirection="column">
          {icon}

          <Typography sx={{ mt: 2 }} fontSize="10px" color="text.secondary" textAlign="left">
            {description}
          </Typography>
        </Box>
      </Button>
    </>
  );
}
