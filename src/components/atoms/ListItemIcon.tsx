import MUIListItemIcon, {
  ListItemIconProps as MUIListItemIconProps
} from '@mui/material/ListItemIcon';

import useTheme from '@mui/material/styles/useTheme';

type ListItemIconProps = MUIListItemIconProps & {
  active?: boolean;
};

const ListItemIcon = ({ active = false, ...props }: ListItemIconProps) => {
  const theme = useTheme();
  return (
    <MUIListItemIcon
      {...props}
      sx={{
        ...props.sx,
        ...(active ? { '& .MuiSvgIcon-root': { color: theme.palette.primary.main } } : {})
      }}
    />
  );
};
export default ListItemIcon;
