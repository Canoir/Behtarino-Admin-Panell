import { Box, Button } from '@mui/material';

import { HeaderHeight } from '../../../organisms/Layout/Header';

export function BuySubscriptionDurations(props: {
  selectedDuration: number;
  setSelectedDuration: (duration: number) => void;
}) {
  const { setSelectedDuration, selectedDuration } = props || {};

  return (
    <Box
      display="flex"
      justifyContent="space-around"
      alignItems="center"
      py={3}
      mb={-3}
      px={4}
      mx={-4}
      bgcolor="white"
      position={{ xs: 'sticky', md: 'unset' }}
      zIndex={1200}
      top={`${HeaderHeight}px`}>
      <Box
        width={{ xs: '100%', md: '65%' }}
        display="flex"
        gap={3}
        justifyContent="space-between"
        alignItems="center">
        <DurationItem
          title="۳ ماهه"
          isSelected={selectedDuration === 0}
          onClick={() => setSelectedDuration(0)}
        />

        <DurationItem
          title="۶ ماهه"
          isSelected={selectedDuration === 1}
          onClick={() => setSelectedDuration(1)}
        />

        <DurationItem
          title="یک ساله"
          isSelected={selectedDuration === 2}
          onClick={() => setSelectedDuration(2)}
        />
      </Box>
    </Box>
  );
}

function DurationItem(props: { onClick: () => void; title: string; isSelected: boolean }) {
  const { isSelected, onClick, title } = props;

  return (
    <Button
      sx={{
        px: { xs: 0, md: 16 },
        width: { xs: '100%', md: 'auto' },
        py: { xs: 2, md: 4 },
        background: isSelected ? undefined : 'white'
      }}
      onClick={onClick}
      variant={isSelected ? 'contained' : 'outlined'}>
      {title}
    </Button>
  );
}
