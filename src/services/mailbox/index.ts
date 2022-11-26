import { getMailFromId } from './item';
import { getMailUnreadCounts } from './unread';
import { getMailsFromSlug } from './list';

const MailBoxServices = {
  list: getMailsFromSlug,
  get: getMailFromId,
  countUnread: getMailUnreadCounts
};
export default MailBoxServices;
