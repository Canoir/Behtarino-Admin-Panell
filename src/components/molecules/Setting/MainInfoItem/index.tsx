import { CardActionArea, Grid } from '@mui/material';
import { FC, ReactElement } from 'react';

import ArrowBackIosNewOutlined from '@mui/icons-material/ArrowBackIosNewOutlined';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { OverlayProps } from '@components/molecules/kit/Overlay';
import Typography from '@mui/material/Typography';
import useToggle from '@hooks/useToggle';

type Props = {
  id?: string;
  title: string;
  content: ReactElement;
  md?: number;
  isDefaultOpen?: boolean;
  xs?: number;
  disabled?: boolean;
  Overlay?: FC<Omit<OverlayProps, 'title' | 'children'>>;
  noDivider?: boolean;
};
const MainInfoItem = ({
  id,
  title,
  content,
  md = 6,
  xs = 12,
  Overlay,
  isDefaultOpen = false,
  noDivider = false,
  disabled = false
}: Props) => {
  const [isOverlayOpen, toggleOverlay] = useToggle(isDefaultOpen);
  //
  return (
    <>
      {Overlay ? <Overlay open={!disabled && isOverlayOpen} onClose={toggleOverlay} /> : null}
      <Grid onClick={toggleOverlay} item xs={xs} md={md}>
        <CardActionArea
          id={id}
          sx={{ px: 3, cursor: disabled ? 'not-allowed' : undefined }}
          disabled={disabled}>
          <Box py={3} display="flex" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography color={disabled ? 'text.secondary' : 'text.primary'}>{title}</Typography>
              <Box mt={2} maxWidth="75vw">
                {content}
              </Box>
            </Box>

            <ArrowBackIosNewOutlined fontSize="small" color={disabled ? 'disabled' : 'primary'} />
          </Box>
          {!noDivider ? <Divider /> : null}
        </CardActionArea>
      </Grid>
    </>
  );
};
export default MainInfoItem;
