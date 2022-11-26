import React, { useRef } from 'react';

import Box from '@mui/material/Box';
import { MEDIA_TYPES } from '@constants/media';
import { UploaderFileType } from '@typings/Uploader';
import { SxProps } from '@mui/material';

interface UploaderInputProps {
  multiFile?: boolean;
  allowedMediaTypes: MEDIA_TYPES[];
  children: React.ReactNode;
  files?: UploaderFileType[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  sx?: SxProps;
}
export default function UploaderInput(props: UploaderInputProps) {
  const { sx, onChange, allowedMediaTypes, children } = props || {};

  const _inputRef = useRef<HTMLInputElement>(null);

  const accept = allowedMediaTypes
    .map((mediaType: MEDIA_TYPES) => `${mediaType.toLowerCase()}/*`)
    .join(', ');
  return (
    <Box
      onClick={() => {
        _inputRef?.current?.click();
      }}
      sx={{ cursor: 'pointer', ...sx }}>
      <input type="file" accept={accept} hidden ref={_inputRef} onChange={onChange} />
      {children}
    </Box>
  );
}
