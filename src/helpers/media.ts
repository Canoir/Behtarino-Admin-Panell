import { MEDIA_EXTENSIONS, MEDIA_EXTENSIONS_TYPES, MEDIA_TYPES } from '@constants/media';

export default class MediaHelper {
  static getType(fileExtension: MEDIA_EXTENSIONS) {
    return (
      Object.values(MEDIA_TYPES).find((mediaType) =>
        MEDIA_EXTENSIONS_TYPES[mediaType].includes(fileExtension)
      ) || MEDIA_TYPES.UNKNOWN
    );
  }

  static getExtension(fileName: string) {
    return (
      Object.values(MEDIA_EXTENSIONS).find(
        (extension) => extension === fileName?.split('.')?.pop?.()
      ) || MEDIA_EXTENSIONS.DEFAULT
    );
  }
}
