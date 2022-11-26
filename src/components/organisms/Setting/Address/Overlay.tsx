import Overlay, { OverlayProps } from '@components/molecules/kit/Overlay';
import { useEffect, useRef, useState } from 'react';

import Box from '@mui/material/Box';
import BusinessServices from '@services/business';
import { Button } from '@mui/material';
import { CoordinateType } from '@typings/Map';
import Input from '@components/molecules/kit/Input';
import { Map as LeafletMap } from 'leaflet';
import Map from '@components/atoms/Map';
import MapServices from '@services/map';
import useBusiness from '@hooks/api/useBusiness';
import useToggle from '@hooks/useToggle';

const SettingAddressOverlay = ({ open, onClose }: Omit<OverlayProps, 'title' | 'children'>) => {
  const { data: business, refetch } = useBusiness();
  const { address: initialAddress, latitude, longitude, slug, id } = business || {};
  const [isLoadingAddress, toggleLoadingAddress] = useToggle(false);

  const [loading, toggleLoading] = useToggle(false);
  const [address, setAddress] = useState<string | undefined>(initialAddress);
  const [addressDetails, setAddressDetails] = useState<string>();
  const [mapMode, toggleMapMode] = useToggle(false);
  const [position, setPosition] = useState<CoordinateType>([latitude, longitude]);
  const mapRef = useRef<LeafletMap>(null);
  const [isEdited, setEdited] = useState<boolean>(false);
  const hasLocation = latitude && longitude;

  const handleSubmit = () => {
    if (mapMode) {
      const { lat, lng } = mapRef.current?.getCenter() || {};
      if (lat && lng) {
        setPosition([lat.toFixed(7), lng.toFixed(7)]);

        toggleLoadingAddress();
        MapServices.reverse(String(lat || ''), String(lng || ''))
          .then(({ last, neighbourhood, primary }) => {
            setAddress(`${neighbourhood}, ${primary}, ${last}`);
            toggleLoadingAddress();
            toggleMapMode();
            setEdited(true);
          })
          .catch(toggleLoadingAddress);
      }
    } else if (slug && id) {
      toggleLoading();
      BusinessServices.edit({
        address_details: addressDetails || undefined,
        latitude: position[0],
        longitude: position[1],
        address,
        slug,
        id
      })
        .then(() => {
          refetch();
          onClose();
            setEdited(false);
        })
        .finally(toggleLoading);
    }
  };

  useEffect(() => {
    if (mapMode) toggleMapMode();
  }, [open]);

  return (
    <Overlay
      title="ویرایش محدوده و آدرس"
      open={open}
      onClose={onClose}
      ctas={[
        {
          title: 'ثبت تغییرات',
          onClick: handleSubmit,
          loading: loading || isLoadingAddress,
          disabled: (!mapMode && (!address || !latitude || !longitude)) || !isEdited
        },
        {
          title: 'انصراف',
          onClick: onClose,
          variant: 'outlined'
        }
      ]}>
      <Box p={5} minHeight={500}>
        <Box
          height={mapMode ? 500 : 110}
          position="relative"
          onClick={() => {
            if (!isEdited) setEdited(true);

            if (!mapMode) toggleMapMode();
          }}>
          <Map
            mapRef={mapRef}
            key={`${mapMode}`}
            style={{ height: '100%', width: '100%' }}
            center={position}
            markers={hasLocation && !mapMode ? [{ position: position }] : []}
            dragging={mapMode}
            scrollWheelZoom={mapMode}
            doubleClickZoom={mapMode}
            editMode={mapMode}
          />
          {!mapMode ? (
            <Button
              variant="contained"
              sx={{
                width: 180,
                height: 36,
                zIndex: 401,
                left: 0,
                right: 0,
                bottom: 0,
                top: 0,
                m: 'auto',
                position: 'absolute'
              }}>
              ویرایش محدوده مکانی
            </Button>
          ) : null}
        </Box>
        {!mapMode ? (
          <>
            <Input
              sx={{ mt: 5 }}
              label="آدرس کسب‌وکار"
              placeholder="تهران، ونک، خیابان ولیعصر، کوچه شهید مرتضوی"
              fullWidth
              value={address}
              multiline
              onChange={({ target }) => {
                if (!isEdited) setEdited(true);

                setAddress(target.value || undefined);
              }}
            />

            <Input
              sx={{ mt: 5 }}
              label="جزییات کسب و کار"
              placeholder="پلاک، واحد..."
              fullWidth
              multiline
              onChange={({ target }) => {
                if (!isEdited) setEdited(true);

                setAddressDetails(target.value || '');
              }}
            />
          </>
        ) : null}
      </Box>
    </Overlay>
  );
};
export default SettingAddressOverlay;
