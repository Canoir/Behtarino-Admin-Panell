export enum SOCIAL_TYPES {
  INSTAGRAM,
  TELEGRAM,
  WHATSAPP
}
export const SOCIAL_PREPENDING_TEXTS = {
  [SOCIAL_TYPES.INSTAGRAM]: [
    'https://instagram.com/',
    'https://www.instagram.com/',
    'http://instagram.com/',
    'http://www.instagram.com/',
    // with one slash
    'https:/instagram.com/',
    'https:/www.instagram.com/',
    'http:/instagram.com/',
    'http:/www.instagram.com/'
  ],
  [SOCIAL_TYPES.TELEGRAM]: [
    'https://t.me/',
    'https://www.t.me/',
    'http://t.me/',
    'http://www.t.me/',
    // with one slash
    'https:/t.me/',
    'https:/www.t.me/',
    'http:/t.me/',
    'http:/www.t.me/',
    '@'
  ],
  [SOCIAL_TYPES.WHATSAPP]: [
    'https://wa.me/+98',
    'https://www.wa.me/+98',
    'http://wa.me/+98',
    'http://www.wa.me/+98',
    'https://wa.me/98',
    'https://www.wa.me/98',
    'http://wa.me/98',
    'http://www.wa.me/98',
    // with one slash
    'https:/wa.me/+98',
    'https:/www.wa.me/+98',
    'http:/wa.me/+98',
    'http:/www.wa.me/+98',
    'https:/wa.me/98',
    'https:/www.wa.me/98',
    'http:/wa.me/98',
    'http:/www.wa.me/98'
  ]
};
