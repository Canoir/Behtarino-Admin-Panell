import { Grid, Typography } from '@mui/material';

import { ReactElement } from 'react';

const HeaderStyle = { fontWeight: 500, color: 'primary', fontSize: '14px' };
function PaymentStatusContainer(props: { children: ReactElement[] | ReactElement | null }) {
  return (
    <Grid container p={2} rowGap={2}>
      <Grid item xs={3}></Grid>

      <Grid item xs={3}>
        <Typography {...HeaderStyle}>مبلغ قسط</Typography>
      </Grid>

      <Grid item xs={3}>
        <Typography {...HeaderStyle}>تاریخ سررسید</Typography>
      </Grid>

      <Grid item xs={2}>
        <Typography {...HeaderStyle}>وضعیت پرداخت</Typography>
      </Grid>

      <Grid item xs={1}></Grid>

      <Grid item xs={12}>
        {props.children}
      </Grid>
    </Grid>
  );
}

export default PaymentStatusContainer;
