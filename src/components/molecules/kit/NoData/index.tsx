import { Box, Typography } from '@mui/material';

import { ReactComponent as NoDataSVG } from '@assets/svg/ic_no_data.svg';

type Props = { message?: string };
export function NoData(props: Props) {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="flex-start"
      pt={5}
      flexDirection="column">
      <Typography fontSize="12px">
        {props.message || 'تحلیلی برای کسب‌و‌کار شما در این بازه زمانی ثبت نشده است.'}
      </Typography>

      <Box pt={9}>
        <NoDataSVG />
      </Box>
    </Box>
  );
}
