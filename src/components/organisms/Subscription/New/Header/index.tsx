import { Box, Paper } from '@mui/material';

import { NewSuberBenefits } from './Benefits';
import { NewSuberLookPro } from './BePro';

const HeaderBoxStyle = { pt: 6, px: { xs: 0, sm: 4 }, height: { md: '50%' } };
export function NewSubscriptionHeader() {
  return (
    <Paper sx={{ height: { md: '716px' } }}>
      <Box {...HeaderBoxStyle}>
        <NewSuberLookPro />
      </Box>

      <Box {...HeaderBoxStyle}>
        <NewSuberBenefits />
      </Box>
    </Paper>
  );
}
