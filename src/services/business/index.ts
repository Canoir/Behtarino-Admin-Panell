import createBusinessMedia from './media/create';
import deleteBusinessMedia from './media/delete';
import editBusiness from './edit';
import getBusiness from './get';
import getBusinessMedias from './media/list';
import getBusinessReport from './report';
import getFullDetails from './fullDetails';
import getUnApprovedBusiness from './unapproved';

const BusinessServices = {
  get: getBusiness,
  unapproved: getUnApprovedBusiness,
  getFull: getFullDetails,
  edit: editBusiness,
  report: getBusinessReport,
  images: getBusinessMedias,
  createMedia: createBusinessMedia,
  deleteMedia: deleteBusinessMedia
};
export default BusinessServices;
