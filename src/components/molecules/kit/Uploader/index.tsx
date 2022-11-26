import { MEDIA_CONTENT_TYPES, MEDIA_FOLDERS, MEDIA_TYPES } from '@constants/media';
import React, { useRef } from 'react';

import Http from '@utils/Http';
import MediaHelper from '@helpers/media';
import MediaServices from '@services/media';
import { UploaderFileType } from '@typings/Uploader';
import UploaderInput from './Input';
import __cloneDeep from 'lodash/cloneDeep';
import CircularProgress from '@mui/material/CircularProgress';
import useToggle from '@hooks/useToggle';
import { SxProps } from '@mui/material';

type Props = {
  allowedMediaTypes?: MEDIA_TYPES[];
  children: React.ReactNode;
  files?: UploaderFileType[];
  folder?: string;
  multiFile?: boolean;
  onDelete?: (index: number, file: UploaderFileType) => void;
  setFiles: (files: UploaderFileType[]) => void;
  loading?: boolean;
  sx?: SxProps;
};

const Uploader: React.FC<Props> = (props) => {
  const {
    multiFile = false,
    folder = MEDIA_FOLDERS.BUSINESS_IMAGES,
    allowedMediaTypes = Object.values(MEDIA_TYPES),
    children,
    files = [],
    setFiles,
    sx
  } = props;

  const filesRef = useRef(files);
  const [isLoading, toggleIsLoading] = useToggle(false);
  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFile = e.target?.files?.[0];

    if (!newFile) return;
    toggleIsLoading();
    const index = 0;
    const mediaType = MediaHelper.getType(MediaHelper.getExtension(newFile.name));
    const newFiles = [
      {
        src: null,
        thumbnail: null,
        type: mediaType,
        path: `${folder}/${newFile.name}`
      },
      ...(multiFile ? filesRef.current : [])
    ];
    setFilesState(newFiles);

    const url = await MediaServices.getCDNUrl({
      fileName: newFile.name,
      folderName: folder
    });
    //todo move this to services
    await Http.put({
      url,
      data: newFile,
      headers: {
        'Content-Type': MEDIA_CONTENT_TYPES[MediaHelper.getExtension(newFile.name)]
      }
    });

    // check
    const _files = __cloneDeep(filesRef.current);
    _files[index].src = url?.split('?')?.[0];
    _files[index].thumbnail = url?.split('?')?.[0];
    _files[index].address = `${folder}/${url.substring(
      url.lastIndexOf('/') + 1,
      url.indexOf('?')
    )}`;
    setFilesState(_files);
    toggleIsLoading();
  };

  // an extra layer for updating state so we can update refs too
  const setFilesState = (newFiles: UploaderFileType[]) => {
    setFiles(newFiles);
    filesRef.current = newFiles;
  };

  if (isLoading) return <CircularProgress />;
  return (
    <UploaderInput sx={sx} allowedMediaTypes={allowedMediaTypes} onChange={onChange}>
      {children}
    </UploaderInput>
  );
};

export default Uploader;
