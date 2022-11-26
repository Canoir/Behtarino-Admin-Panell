import Card from '@components/molecules/kit/Card';
import { CardActionArea } from '@mui/material';
import EditOutlined from '@mui/icons-material/EditOutlined';
import Map from '@components/atoms/Map';
import { ModalTypes } from '@constants/business';
import SettingAddressOverlay from '@components/organisms/Setting/Address/Overlay';
import Typography from '@mui/material/Typography';
import useBusiness from '@hooks/api/useBusiness';
import { useSearchParams } from 'react-router-dom';
import useToggle from '@hooks/useToggle';

const SettingAddress = () => {
  const modalType = useSearchParams()[0].get('modal');

  const [isOverlayOpen, toggleOverlayOpen] = useToggle(modalType === ModalTypes.Address);
  const { data: business } = useBusiness();
  const { latitude, longitude, address } = business || {};
  const hasLocation = latitude && longitude;

  return (
    <>
      <SettingAddressOverlay open={isOverlayOpen} onClose={toggleOverlayOpen} />

      <Card
        title="محدوده و آدرس کسب‌و‌کار"
        actionIcons={[
          // MUI Bug for not adding error color to Slider Colors!
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          { icon: <EditOutlined color={'text.primary' as any} />, onClick: toggleOverlayOpen }
        ]}>
        <Typography mt={2} color="text.secondary">
          آدرس کسب‌و‌کارتان به مراجعه حضوری مشتری‌ها کمک می‌کند.
        </Typography>
        <CardActionArea sx={{ my: 3 }} onClick={toggleOverlayOpen}>
          <Map
            key={`${latitude}, ${longitude}`}
            style={{ height: 110, width: '100%' }}
            center={[latitude, longitude]}
            markers={hasLocation ? [{ position: [latitude, longitude] }] : []}
            dragging={false}
            scrollWheelZoom={false}
            doubleClickZoom={false}
          />
        </CardActionArea>
        <Typography mt={3}>{address}</Typography>
      </Card>
    </>
  );
};
export default SettingAddress;
