const endpoints = {
  analyticByEventName: (slug: string) => `/businesses/${slug}/analytics_by_event_name/`,
  averagePositions: (slug: string) => `/businesses/${slug}/analytics_avg_position_in_rank_pages`,
  businessEditItem: (id: number) => `/business_edits/${id}/`,
  businessInfo: (slug: string) => `/businesses/${slug}/for_behtarino/`,
  businessItem: (slug: string) => `/businesses/${slug}/`,
  createPackageTransaction: (slug: string) => `/businesses/${slug}/charge_advertise_transaction/`,
  getAdsReport: (slug: string) => `/businesses/jarchi/${slug}/`,
  getAdsSuggestedPackages: (slug: string) => `/businesses/jarchi/${slug}/`,
  getAveragePositionDetails: (slug: string) => `/businesses/${slug}/analytics_by_rank_page/`,
  getBusinessFullDetails: (slug: string) =>
    `https://fastapi.behtarino.com/api/v1/businesses/${slug}/full_details_on_elastic/`,
  getBusinessOverallReport: (slug: string) => `/businesses/jarchi/${slug}/aggregated_report/`,
  getBusinessPosts: (slug: string) => `/businesses/${slug}/get_images/`,
  getBusinessReport: (slug: string) => `/businesses/jarchi/${slug}/report/`,
  getClickRecommendation: (slug: string) =>
    `/businesses/jarchi/${slug}/click_price_recommendation/`,
  getContract: (id: string) => `/contracts/${id}/`,
  getContractFromInfo: (slug: string) => `/businesses/${slug}/subscription_transaction/`,
  getFileCDNUrl: '/get_minio_url/',
  getGatewayFromTransaction: (transaction_code: number) =>
    `/transactions/${transaction_code}/zibal_gateway/`,
  getMails: (slug: string) => `businesses/${slug}/messages`,
  getMail: (id: string, slug: string) => `businesses/${slug}/messages/${id}/`,
  getUnreadMessages: (slug: string) => `businesses/${slug}/messages/count_unread/`,
  getRecommendedClickPrice: (slug: string) =>
    `/businesses/jarchi/${slug}/click_price_recommendation`,
  getReviews: (slug: string) => `/reviews/review_documents/?business_slug=${slug}&is_deleted=false`,
  getSubscription: (slug: string) => `/businesses/${slug}/subscription/`,
  mapReverse: (lat: string, lon: string) => `https://map.ir/reverse?lat=${lat}&lon=${lon}`,
  posts: '/businesses/images/',
  postsItem: (id: number) => `/businesses/images/${id}/`,
  searchTags: '/businesses/tag_documents/',
  submitReviewReply: (review_number: number) => `reviews/${review_number}/reply/`,
  suggestBusinessEdit: '/business_edits/',
  unapprovedBusinessEdits: '/business_edits/unapproved_by_business/',
  updateAdsSettings: (slug: string) => `/businesses/jarchi/${slug}/`,
  userBusinesses: '/businesses/by_owner_for_behtarino/',
  userInfo: '/users/self/'
};
export default endpoints;
