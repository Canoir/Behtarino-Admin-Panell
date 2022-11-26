import { Avatar, Box, Button, Divider, Grid, Popover, Typography } from '@mui/material';
import { Else, If, Then } from 'react-if';
import { Fragment, useState } from 'react';

import { BusinessType } from '@typings/Business';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import PersonIcon from '@mui/icons-material/Person';
import useBusiness from '@hooks/api/useBusiness';
import useUser from '@hooks/api/useUser';

function SidebarAccountManager() {
  const [popOverOpener, setPopOverOpener] = useState<HTMLElement | null>(null);
  const { businesses } = useUser();
  const { data: selectedBusiness } = useBusiness();

  function AnchorToggle(el: HTMLElement) {
    if (!popOverOpener) setPopOverOpener(el);
    else setPopOverOpener(null);
  }

  return (
    <Box py={2}>
      <AccountsItem
        setAnchorToggle={AnchorToggle}
        id="behtarino--admin--menuBizSelect"
        data={selectedBusiness}
      />

      <Popover
        id="behtarino--admin--menuBizSelect"
        PaperProps={{ sx: { maxWidth: '32vh', minWidth: '32vh' } }}
        open={!!popOverOpener}
        anchorEl={popOverOpener}
        onClose={() => setPopOverOpener(null)}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}>
        {businesses?.map((business, index) => (
          <Fragment key={index}>
            <AccountsItem setAnchorToggle={AnchorToggle} data={business} />
            {businesses?.length - 1 > index && <Divider />}
          </Fragment>
        ))}
      </Popover>
    </Box>
  );
}
export default SidebarAccountManager;

type AccountsItemProps = {
  data: Partial<BusinessType & { main_image_thumbnail_url: string }> | undefined;
  setAnchorToggle: (el: HTMLElement) => void;
  id?: string;
};
const AccountsItem = ({ setAnchorToggle, id, data }: AccountsItemProps) => {
  const { setSelectedAccount } = useBusiness();

  const avatarImage = data?.main_image_thumbnail_url || data?.cover_image_url;

  return (
    <Button
      sx={{ width: '100%' }}
      onClick={(e) => {
        if (!id) setSelectedAccount(data?.slug || '');
        setAnchorToggle(e.currentTarget);
      }}
      id={id}>
      <Grid container>
        <Grid item xs={2} display="flex" alignItems="center" justifyContent="center">
          <If condition={avatarImage}>
            <Then>
              <Avatar src={avatarImage} />
            </Then>

            <Else>
              <PersonIcon htmlColor="white" />
            </Else>
          </If>
        </Grid>
        <Grid item xs pt={1} pl={2}>
          <Typography fontSize={16} lineHeight="24px" textAlign="left">
            {data?.title}
          </Typography>
        </Grid>
        {id ? (
          <Grid item xs={1} display="flex" alignItems="center" pr={4} justifyContent="flex-start">
            <KeyboardArrowDownIcon />
          </Grid>
        ) : null}
      </Grid>
    </Button>
  );
};
