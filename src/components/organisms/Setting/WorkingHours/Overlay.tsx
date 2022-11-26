import { Accordion, AccordionDetails, AccordionSummary, Divider, Typography } from '@mui/material';
import Overlay, { OverlayProps } from '@components/molecules/kit/Overlay';

import Box from '@mui/material/Box';
import BusinessHelper from '@helpers/business';
import BusinessServices from '@services/business';
import EditBusinessWorkingHoursOverlayShifts from '@components/molecules/Setting/WorkingHours/Shifts';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { WEEK_DAYS } from '@constants/weekDays';
import { When } from 'react-if';
import { WorkingHoursType } from '@typings/WorkingHours';
import useBusiness from '@hooks/api/useBusiness';
import { useState } from 'react';
import useToggle from '@hooks/useToggle';

const SettingWorkingHoursOverlay = ({
  open,
  onClose
}: Omit<OverlayProps, 'title' | 'children'>) => {
  const { data: business, refetch } = useBusiness();
  const { id, slug, working_hours: initialWorkingHours } = business || {};

  const [isLoading, toggleLoading] = useToggle(false);
  const [isEdited, setEdited] = useState<boolean>(false);
  const [expandedAccordion, setExpandedAccordion] = useState('');
  const [workingHours, setWorkingHours] = useState<WorkingHoursType | undefined>(
    initialWorkingHours
  );

  const handleSubmit = () => {
    if (slug && id) {
      toggleLoading();
      BusinessServices.edit({ working_hours: workingHours, slug, id })
        .then(() => {
          refetch();
          onClose();
        })
        .finally(toggleLoading);
    }
  };

  return (
    <Overlay
      title="روزها و ساعت‌های کاری"
      open={open}
      onClose={onClose}
      ctas={[
        { title: 'ثبت تغییرات', onClick: handleSubmit, loading: isLoading, disabled: !isEdited },
        { title: 'انصراف', color: 'primary', variant: 'outlined', onClick: onClose }
      ]}>
      <Box mb={4}>
        {WEEK_DAYS.map(({ id, label }, index) => (
          <>
            <Accordion
              disableGutters
              key={index}
              sx={{ boxShadow: 'none' }}
              expanded={expandedAccordion === String(index)}
              onChange={(e, isExpanded) => setExpandedAccordion(isExpanded ? String(index) : '')}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Box>
                  <Typography fontWeight="500">{label}</Typography>
                  <Typography color="text.secondary" whiteSpace="pre-wrap">
                    {BusinessHelper.normalizeWorkingHours(workingHours, id)}
                  </Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Typography color="text.secondary" lineHeight="24px">
                  <EditBusinessWorkingHoursOverlayShifts
                    shifts={workingHours?.[id] || []}
                    setShifts={(shifts) => {
                      if (!isEdited) setEdited(true);

                      setWorkingHours(workingHours ? { ...workingHours, [id]: shifts } : undefined);
                    }}
                  />
                </Typography>
              </AccordionDetails>
            </Accordion>

            <When condition={index < WEEK_DAYS.length - 1}>
              <Divider />
            </When>
          </>
        ))}
      </Box>
    </Overlay>
  );
};
export default SettingWorkingHoursOverlay;
