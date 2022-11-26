import { Box, LinearProgress, LinearProgressProps, ThemeProvider, Typography } from '@mui/material';

export function LinearProgressWithLabel(
  props: LinearProgressProps & { value: number; title?: string }
) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${
          props.title || Math.round(props.value / 10) + '%'
        }`}</Typography>
      </Box>
      <Box sx={{ width: '100%', mr: 1 }}>
        <ThemeProvider theme={(outerTheme) => ({ ...outerTheme, direction: 'ltr' })}>
          <LinearProgress variant="determinate" {...props} />
        </ThemeProvider>
      </Box>
    </Box>
  );
}
