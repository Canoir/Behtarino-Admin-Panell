import { Grid, IconButton } from '@mui/material';

import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import { ImageType } from '@typings/Image';

const SettingImagesItem = ({
  thumbnail_url,
  title,
  id,
  onDelete
}: ImageType & { onDelete: (id: number) => void }) => {
  return (
    <Grid item xs={4}>
      <Box borderRadius={1} overflow="hidden" display="flex" position="relative">
        <IconButton onClick={() => onDelete(id)} sx={{ position: 'absolute' }}>
          <DeleteIcon sx={{ color: 'white' }} fontSize="small" />
        </IconButton>
        <img
          style={{ objectFit: 'cover' }}
          width="100%"
          height="100%"
          src={thumbnail_url}
          alt={title || 'business-image'}
        />
      </Box>
    </Grid>
  );
};

export default SettingImagesItem;
