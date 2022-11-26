export enum MEDIA_TYPES {
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO',
  UNKNOWN = 'UNKNOWN'
}

export enum MEDIA_FOLDERS {
  BUSINESS_IMAGES = 'business_images',
  PROFILE_IMAGES = 'profile_images'
}
export enum MEDIA_EXTENSIONS {
  ICO = 'ico',
  JPEG = 'jpeg',
  JPG = 'jpg',
  JFIF = 'jfif',
  TIFF = 'tiff',
  SVG = 'svg',
  PNG = 'png',
  WEBP = 'webp',
  THREE_GP = '3gp',
  MKV = 'mkv',
  MOV = 'mov',
  MP4 = 'mp4',
  MPEG = 'mpeg',
  WEBM = 'webm',
  DEFAULT = 'DEFAULT'
}

export const MEDIA_CONTENT_TYPES = {
  [MEDIA_EXTENSIONS.ICO]: 'image/vnd.microsoft.icon',
  [MEDIA_EXTENSIONS.JPEG]: 'image/jpeg',
  [MEDIA_EXTENSIONS.JPG]: 'image/jpeg',
  [MEDIA_EXTENSIONS.JFIF]: 'image/jpeg',
  [MEDIA_EXTENSIONS.TIFF]: 'image/tiff',
  [MEDIA_EXTENSIONS.SVG]: 'image/svg+xml',
  [MEDIA_EXTENSIONS.PNG]: 'image/png',
  [MEDIA_EXTENSIONS.WEBP]: 'image/webp',
  [MEDIA_EXTENSIONS.THREE_GP]: 'video/3gpp',
  [MEDIA_EXTENSIONS.MKV]: 'video/x-matroska',
  [MEDIA_EXTENSIONS.MOV]: 'video/quicktime',
  [MEDIA_EXTENSIONS.MP4]: 'video/mp4',
  [MEDIA_EXTENSIONS.MPEG]: 'video/mpeg',
  [MEDIA_EXTENSIONS.WEBM]: 'video/webm',
  [MEDIA_EXTENSIONS.WEBM]: 'video/webm',
  [MEDIA_EXTENSIONS.DEFAULT]: 'application/octet-stream'
};
export const MEDIA_EXTENSIONS_TYPES = {
  [MEDIA_TYPES.IMAGE]: [
    MEDIA_EXTENSIONS.ICO,
    MEDIA_EXTENSIONS.JPEG,
    MEDIA_EXTENSIONS.JPG,
    MEDIA_EXTENSIONS.JFIF,
    MEDIA_EXTENSIONS.TIFF,
    MEDIA_EXTENSIONS.SVG,
    MEDIA_EXTENSIONS.PNG,
    MEDIA_EXTENSIONS.WEBP
  ],
  [MEDIA_TYPES.VIDEO]: [
    MEDIA_EXTENSIONS.THREE_GP,
    MEDIA_EXTENSIONS.MKV,
    MEDIA_EXTENSIONS.MOV,
    MEDIA_EXTENSIONS.MP4,
    MEDIA_EXTENSIONS.MPEG,
    MEDIA_EXTENSIONS.WEBM
  ],
  [MEDIA_TYPES.UNKNOWN]: ['']
};
