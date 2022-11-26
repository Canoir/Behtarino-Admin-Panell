import { Else, If, Then } from 'react-if';
import { useEffect, useMemo } from 'react';

import { Box } from '@mui/material';
import { InfiniteData } from 'react-query';
import { Loader } from '@components/atoms/Loader';
import { MAILS } from '@constants/test';
import { MailBox } from '@typings/Mail';
import MailBoxMail from '@components/molecules/MailBox/Mail';
import { NoData } from '@components/molecules/kit/NoData';
import { Response } from '@typings/_Global';
import { useInView } from 'react-intersection-observer';
import useMailBox from '@hooks/api/useMailBox';

type Props = {
  __test__?: {
    data?: InfiniteData<Response<MailBox>>;
    isLoading: boolean;
    fetchNextPage?: () => false;
  };
};
function MailBoxItems(props: Props) {
  const { __test__ } = props || {};
  const { data, isLoading, fetchNextPage } = __test__ || useMailBox();
  const { pages } = data || {};
  //

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && !isLoading) fetchNextPage?.();
  }, [inView, isLoading]);

  const mails = useMemo(() => pages?.flatMap((type) => type.data), [pages, data, isLoading]);

  return (
    <If condition={isLoading}>
      <Then>
        <Loader />
      </Then>
      <Else>
        <Box>
          {mails?.length ? (
            <Box>
              {mails.map((item, i) => (
                <Box
                  key={i}
                  data-testId={MAILS.mail}
                  ref={i === mails.length - 1 ? ref : undefined}>
                  <MailBoxMail mail={item} />
                </Box>
              ))}
            </Box>
          ) : (
            <Box data-testId={MAILS.noData}>
              <NoData message="پیامی برای کسب‌و‌کار شما ثبت نشده است." />
            </Box>
          )}
        </Box>
      </Else>
    </If>
  );
}

export default MailBoxItems;
