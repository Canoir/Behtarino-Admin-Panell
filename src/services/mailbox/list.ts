import { Mail, MailBox } from '@typings/Mail';

import Http from '@utils/Http';
import { Response } from '@typings/_Global';
import endpoints from '@constants/endpoints';

export async function getMailsFromSlug(slug: string): Promise<Response<MailBox>> {
  try {
    return await Http.get<Mail[]>({
      url: endpoints.getMails(slug)
    });
  } catch (error) {
    throw error;
  }
}
