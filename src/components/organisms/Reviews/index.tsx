import { Box, MenuItem, Select } from '@mui/material';

import Card from '@components/molecules/kit/Card';
import { Responsive } from '@components/molecules/kit/Responsive';
import ReviewItem from '@components/molecules/Review';
import useReview from '@hooks/api/useReview';
import { useState } from 'react';

function Reviews() {
  const [orderValue, setOrderValue] = useState<string>('-created_at');
  const { data, fetchNextPage, isLoading, refetch } = useReview(orderValue);

  return (
    <Card title="دیدگاه ها">
      <Responsive containedKey="md">
        <Box my={3}>
          <Select fullWidth value={orderValue} onChange={(e) => setOrderValue(e.target.value)}>
            <MenuItem value="-created_at">آخرین دیدگاه‌های ثبت‌ شده</MenuItem>
            <MenuItem value="rate">کم‌ترین ستاره</MenuItem>
            <MenuItem value="-rate">بیش‌ترین ستاره</MenuItem>
          </Select>
        </Box>
      </Responsive>

      <Box>
        {data?.map((comments, parentIndex) => {
          return comments.data.map((review, index) => (
            <ReviewItem
              refetch={refetch}
              key={review.id}
              review={review}
              isLastReplyItem={
                index >= comments.data.length - 1 && parentIndex >= data.length - 1 && !isLoading
                  ? fetchNextPage
                  : undefined
              }
            />
          ));
        })}
      </Box>
    </Card>
  );
}

export default Reviews;
