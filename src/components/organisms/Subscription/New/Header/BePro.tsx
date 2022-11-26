import { Box, Button, Grid, Typography } from '@mui/material';

import FirstImage from '@assets/png/subscription/vector_1.png';
import style from './bePro.style';

export function NewSuberLookPro() {
  return (
    <Grid container>
      <Grid item xs={12} md={6} sx={style.firstImageContainer}>
        <Box
          component="img"
          maxHeight={{ xs: '144px', md: '310px' }}
          sx={{ objectFit: 'contain' }}
          width={{ xs: 'auto', md: '100%' }}
          src={FirstImage}
        />
      </Grid>

      <Grid item xs={12} md={6} sx={style.bottomBox}>
        <Typography fontSize={34} lineHeight="42px">
          حرفه‌ای‌تر دیده شوید.
        </Typography>

        <Typography fontSize={16} sx={{ mt: 7 }} textAlign={{ xs: 'center', md: 'left' }}>
          شما می‌توانید با خرید عضویت، از امکانات بیشتری بهره‌مند شوید و کسب‌و‌کارتان را کامل‌تر به
          نمایش بگذارید.
        </Typography>

        <Button
          variant="contained"
          sx={{ mt: { xs: 12, md: 9 }, minWidth: '250px' }}
          onClick={() => {
            const item = document.getElementById('subs');
            if (item) {
              item.scrollIntoView({ behavior: 'smooth' });
            }
          }}>
          خرید عضویت
        </Button>
      </Grid>
    </Grid>
  );
}
