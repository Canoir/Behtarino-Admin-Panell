import { Box, Divider, IconButton, Paper, SxProps, Theme, Typography } from '@mui/material';
import { ReactElement, ReactNode } from 'react';

type Props = {
  id?: string;
  title?: string;
  children: ReactNode;
  sx?: SxProps<Theme>;
  actionId?: string;
  actionIcons?: { render?: ReactElement; icon?: ReactElement; onClick?: () => void }[];
};

function Card(props: Props): ReactElement {
  const { title, children, actionIcons, actionId, sx, id } = props;

  return (
    <Box id={id}>
      <Paper sx={{ px: 4, py: 3, ...sx }}>
        {title && (
          <>
            <Box display="flex" alignItems="center">
              <Box flex={1} pb={actionIcons ? 0 : 3}>
                <Typography color="secondary" fontWeight={500}>
                  {title}
                </Typography>
              </Box>

              {actionIcons?.map(({ icon, onClick, render }, mapIndex) => (
                <Box key={mapIndex}>
                  {render || (
                    <IconButton id={actionId} color="primary" component="span" onClick={onClick}>
                      {icon}
                    </IconButton>
                  )}
                </Box>
              ))}
            </Box>
            <Divider />
          </>
        )}

        <Box>{children}</Box>
      </Paper>
    </Box>
  );
}

export default Card;
