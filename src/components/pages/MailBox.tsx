import Box from '@mui/material/Box';
import Card from '@components/molecules/kit/Card';
import MailBoxItems from '@components/organisms/MailBox/Mails';

const MailBox = () => {
  return (
    <Box>
      <Card title="صندوق پیام‌ها">
        <MailBoxItems />
      </Card>
    </Box>
  );
};
export default MailBox;
