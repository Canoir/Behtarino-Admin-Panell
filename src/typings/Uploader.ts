import { MEDIA_TYPES } from '@constants/media';

export interface UploaderFileType {
  address?: string;
  path?: string;
  src: string | null;
  thumbnail: string | null;
  type: MEDIA_TYPES;
}
