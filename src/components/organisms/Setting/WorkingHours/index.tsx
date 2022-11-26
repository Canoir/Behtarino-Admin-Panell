import Box from '@mui/material/Box';
import Card from '@components/molecules/kit/Card';
import EditOutlined from '@mui/icons-material/EditOutlined';
import { ModalTypes } from '@constants/business';
import SettingWorkingHoursOverlay from './Overlay';
import { Typography } from '@mui/material';
import { WEEK_DAYS } from '@constants/weekDays';
import { removeSeconds } from '@utils/time';
import useBusiness from '@hooks/api/useBusiness';
import { useSearchParams } from 'react-router-dom';
import useToggle from '@hooks/useToggle';

const SettingWorkingHours = () => {
  const { data: business } = useBusiness();
  const { working_hours: workingHours } = business || {};

  const modalType = useSearchParams()[0].get('modal');

  const [isOverlayOpen, toggleOverlayOpen] = useToggle(modalType === ModalTypes.Hour);

  return (
    <Card
      title="روزها و ساعت‌های کاری"
      actionIcons={[
        // MUI Bug for not adding error color to Slider Colors!
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        { icon: <EditOutlined color={'text.primary' as any} />, onClick: toggleOverlayOpen }
      ]}>
      <SettingWorkingHoursOverlay open={isOverlayOpen} onClose={toggleOverlayOpen} />

      <Typography color="text.secondary" py={3}>
        روزها و ساعت‌های کاری کسب‌و‌کارتان را وارد کنید تا مشتریان‌تان به‌راحتی مراجعه کنند.
      </Typography>

      <Box display="flex" flexDirection="column" gap={3}>
        {WEEK_DAYS.map(({ id, label }, index) => {
          const workingHoursDay = workingHours?.[id];
          const hasWorkingHour = workingHoursDay !== null;

          return (
            <Box key={index} display="flex" justifyContent="space-between">
              <Typography color={`text.${hasWorkingHour ? 'primary' : 'disabled'}`}>
                {label}
              </Typography>
              {hasWorkingHour ? (
                <Box display="flex" gap={4}>
                  {workingHoursDay?.map((item, _index) => (
                    <>
                      {item?.from && item?.to ? (
                        <Typography sx={{ mt: 1 }} key={_index}>
                          {removeSeconds(item.from || '')} تا {removeSeconds(item.to || '')}
                        </Typography>
                      ) : null}
                    </>
                  ))}
                </Box>
              ) : (
                <Typography color="text.disabled">تعطیل</Typography>
              )}
            </Box>
          );
        })}
      </Box>
    </Card>
  );
};

export default SettingWorkingHours;
