import { Box } from '@mui/material';
import { BuySubscriptionDurations } from '@components/molecules/Subscription/Durations';
import Card from '@components/molecules/kit/Card';
import { SubscriptionBuyNewItem } from '@components/molecules/Subscription/BuyBox';
import { SubscriptionCompareTable } from '@components/molecules/Subscription/Table';
import { useState } from 'react';

export function NewSuberSubscriptionChoices() {
  const [selectedDuration, setSelectedDuration] = useState(1);

  return (
    <Box>
      <Card title="انتخاب عضویت">
        <BuySubscriptionDurations
          selectedDuration={selectedDuration}
          setSelectedDuration={setSelectedDuration}
        />

        <Box mt={5}>
          <SubscriptionBuyNewItem selectedDuration={selectedDuration} />
        </Box>

        <Box mt={5}>
          <SubscriptionCompareTable />
        </Box>
      </Card>
    </Box>
  );
}
