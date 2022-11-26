import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
  useTheme
} from '@mui/material';

import Card from '@components/molecules/kit/Card';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { FAQ_Questions } from '@constants/faq';
import { useState } from 'react';

const AdsSettingFAQ = () => {
  const [expandedAccordion, setExpandedAccordion] = useState<string>('none');
  const theme = useTheme();

  return (
    <Card title="سوالات پرتکرار">
      <Box mt={4}>
        {FAQ_Questions.map(({ answer, question }, index) => (
          <Box mb={3} key={index} id={'behtarino--admin--adsQuestion' + index}>
            <Accordion
              sx={{
                border: '1px solid ' + theme.palette.primary.main
              }}
              expanded={expandedAccordion === String(index)}
              onChange={(e, isExpanded) =>
                setExpandedAccordion(isExpanded ? String(index) : 'none')
              }>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography color="primary" fontWeight="500">
                  {question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography color="text.secondary" lineHeight="24px" whiteSpace="pre-line">
                  {answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Box>
        ))}
      </Box>
    </Card>
  );
};
export default AdsSettingFAQ;
