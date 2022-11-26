import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import SettingCoverImage from '@components/organisms/Setting/CoverImage';
import SettingRegisterProgress from '@components/organisms/Setting/Progress';
import SettingTitle from '@components/organisms/Setting/Title';
import { useCheckStep } from '@hooks/useCheckStep';

export default function SettingHeader() {
  const { step: checkStep } = useCheckStep();

  return (
    <Paper
      sx={{
        mt: { xs: '46px', md: '112px' },
        pt: { xs: '47px', md: '86px' },
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        p: 3
      }}>
      <Box
        position="absolute"
        display="inline-flex"
        sx={{
          top: { xs: '-47px', md: '-86px' },
          left: '50%',
          transform: 'translateX(-50%)'
        }}>
        <SettingCoverImage />
      </Box>
      <SettingTitle />
      {(checkStep?.length || 0) < 10 ? <SettingRegisterProgress /> : null}
    </Paper>
  );
}
