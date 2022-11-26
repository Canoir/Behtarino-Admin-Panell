import BusinessServices from '.';
import { BusinessTypePatch } from '@typings/Business';
import Http from '@utils/Http';
import __uniq from 'lodash/uniq';
import endpoints from '@constants/endpoints';
import { toast } from 'react-toastify';

export default async function editBusiness(params: Partial<BusinessTypePatch>) {
  try {
    const { slug, id, ...data } = params;

    if (!slug) return null;

    const unapprovedBusinessEdits = await BusinessServices.unapproved(slug);

    const { id: unapprovedBusinessID, images: unapprovedImages = [] } =
      unapprovedBusinessEdits[0] || {};
    console.log({
      ...data,
      images: __uniq([...unapprovedImages, ...(data.images || [])]),
      business: id
    });

    if (unapprovedBusinessID) {
      return Http.patch({
        url: endpoints.businessEditItem(unapprovedBusinessID),
        data: {
          ...data,
          images: __uniq([...unapprovedImages, ...(data.images || [])]),
          business: id
        }
      })
        .then(() => toast.success('درخواست ویرایش شما با موفقیت ثبت شد.'))
        .catch(() => toast.error('درخواست ویرایش شما با خطا مواجه شد.'));
    }
    return Http.post({
      url: endpoints.suggestBusinessEdit,
      data: { ...data, business: id }
    })
      .then(() => toast.success('درخواست ویرایش شما با موفقیت ثبت شد.'))
      .catch(() => toast.error('درخواست ویرایش شما با خطا مواجه شد.'));
  } catch (e) {
    throw e;
  }
}
