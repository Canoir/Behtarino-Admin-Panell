import { Box, Button, Chip, Typography } from '@mui/material';

import { MAILS } from '@constants/test';
import { Mail } from '@typings/Mail';
import MailBoxMailOverlay from './Overlay';
import MailBoxServices from '@services/mailbox';
import moment from 'moment-jalaali';
import useBusiness from '@hooks/api/useBusiness';
import useToggle from '@hooks/useToggle';

type Props = { mail: Mail };
function MailBoxMail(props: Props) {
  const { mail } = props;
  const {
    data: { slug }
  } = useBusiness();
  const [overlayVisibility, toggleOverlayVisibility] = useToggle(false);
  const [isRead, toggleIsRead] = useToggle(mail.is_read);
  //
  const onCardClick = async () => {
    toggleOverlayVisibility();
    //
    if (!isRead) {
      await MailBoxServices.get(String(mail.id), slug);
      toggleIsRead();
    }
  };
  //
  return (
    <>
      <Box
        border={(theme) => '1px solid ' + theme.palette.divider}
        my={3}
        borderRadius={1}
        sx={{ background: (theme) => (isRead ? theme.bg.light : '#FFF') }}>
        <Button data-testId={MAILS.card} sx={Styles.cardUnRipple} onClick={onCardClick}>
          <Chip
            label={
              <Typography fontSize="10px" fontWeight="500">
                {mail.label}
              </Typography>
            }
            sx={{
              backgroundColor: (theme) => theme.assistive.info.light,
              color: (theme) => theme.assistive.info.main,
              mb: 3,
              height: '20px'
            }}
          />

          <Box
            color={(theme) => (isRead ? theme.palette.text.disabled : theme.palette.text.primary)}>
            <Typography whiteSpace="pre-line" data-testId={MAILS.description}>
              {mail.text.slice(0, 64) + ' ...'}
            </Typography>
          </Box>

          <Box display="flex" justifyContent="flex-end" gap={10} data-testId={MAILS.dateContainer}>
            <Typography color="text.secondary" fontSize="12px" data-testId={MAILS.hour}>
              {moment(mail.created_at).format('HH:mm')}
            </Typography>

            <Typography color="text.secondary" fontSize="12px" data-testId={MAILS.date}>
              {moment(mail.created_at).format('jYYYY/jMM/jDD')}
            </Typography>
          </Box>
        </Button>
      </Box>

      <MailBoxMailOverlay open={overlayVisibility} mail={mail} onClose={toggleOverlayVisibility} />
    </>
  );
}

export default MailBoxMail;

const Styles = {
  cardUnRipple: {
    p: 3,
    display: 'block',
    width: '100%',
    textAlign: 'unset',
    font: 'unset',
    padding: '12px',
    color: 'unset'
  }
};
