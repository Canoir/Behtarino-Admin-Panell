import Http from '@utils/Http';
import { ListItemIconProps as MUIListItemIconProps } from '@mui/material/ListItemIcon/ListItemIcon';
import endpoints from '@constants/endpoints';

type paramsType = MUIListItemIconProps & {
  fileName: string;
  folderName: string;
};

export default async function getMediaCDNUrl(params: paramsType) {
  const { fileName, folderName } = params;
  try {
    const { url } = (
      await Http.get<{ url: string }>({
        url: endpoints.getFileCDNUrl,
        params: { file_name: fileName, folder_name: folderName }
      })
    ).data;
    return url;
  } catch (error) {
    throw error;
  }
}
