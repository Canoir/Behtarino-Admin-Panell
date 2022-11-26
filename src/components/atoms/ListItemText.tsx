import MUIListItemText, {
  ListItemTextProps as MUIListItemTextProps
} from '@mui/material/ListItemText';

type ListItemTextProps = MUIListItemTextProps & {
  active?: boolean;
};

const ListItemText = ({ active = false, ...props }: ListItemTextProps) => {
  return (
    <MUIListItemText
      {...props}
      primaryTypographyProps={{
        ...props.primaryTypographyProps,
        color: active ? 'primary' : undefined
      }}
    />
  );
};
export default ListItemText;
