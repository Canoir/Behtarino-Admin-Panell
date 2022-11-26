import { Box } from '@mui/material';
import { MAILS } from '@constants/test';
import { Mail } from '@typings/Mail';
import Overlay from '@components/molecules/kit/Overlay';
import WithLinkText from '@components/atoms/WithLinkText';

type Props = { open: boolean; onClose: () => void; mail: Mail };
function MailBoxMailOverlay(props: Props) {
  const { onClose, open, mail } = props;
  const { id, text } = mail;
  //
  return (
    <Overlay open={open} onClose={onClose} title={`پیام ${id}`}>
      <Box p={5} data-testId={MAILS.modal.details.container}>
        <WithLinkText data-testId={MAILS.modal.details.text}>{text}</WithLinkText>
      </Box>
    </Overlay>
  );
}

export default MailBoxMailOverlay;
