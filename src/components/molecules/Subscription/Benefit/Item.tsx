import { Box, Typography } from '@mui/material';

type Props = { imageSrc: string; title: string; details: string };
export function BenefitItem({ imageSrc, details, title }: Props) {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      ml={{ md: 4 }}
      mb={{ xs: 6, md: 0 }}>
      <Box display="flex" justifyContent="center" alignItems="center" height="169px">
        <img src={imageSrc} height="100%" style={{ maxWidth: '169px', objectFit: 'contain' }} />
      </Box>

      <Typography
        color="secondary"
        lineHeight="38px"
        fontSize={18}
        fontWeight={500}
        sx={{ mt: { xs: -2, md: 4 } }}>
        {title}
      </Typography>

      <Typography sx={{ mt: { md: 3 } }} textAlign="center">
        {details}
      </Typography>
    </Box>
  );
}
