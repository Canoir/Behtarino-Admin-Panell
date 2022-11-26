import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme
} from '@mui/material';
import { DoneOutlined, RemoveOutlined } from '@mui/icons-material';
import { Else, If, Then } from 'react-if';

import Card from '@components/molecules/kit/Card';
import { Responsive } from '@components/molecules/kit/Responsive';
import { SubscriptionCompareTableData } from '@constants/subscription';

export function SubscriptionCompareTable() {
  const theme = useTheme();

  return (
    <Card title="امکانات" sx={{ px: 0, pb: 0 }}>
      <TableContainer
        component={Box}
        sx={{
          mt: 5,
          border: '1px solid ' + theme.palette.grey[500],
          borderRadius: 1,
          width: 'auto',
          maxWidth: { xs: '85vw', sm: 'unset' },
          overflow: 'auto'
        }}>
        <Table>
          <TableHead>
            <TableRow
              sx={{
                '& th:nth-of-type(2n)': { background: '#FAFAFA' },
                '& td, & th': { borderBottom: '1px solid ' + theme.palette.grey[500] },
                '& th': { fontSize: '16px', color: 'text.secondary' }
              }}>
              <TableCell>ویژگی</TableCell>
              <TableCell align="center">ساده</TableCell>
              <TableCell align="center">پیشرفته</TableCell>
              <TableCell align="center">VIP</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {SubscriptionCompareTableData.map(({ feat, secondary, pro, VIP, normal }, index) => (
              <TableRow
                key={index}
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                  '& td:nth-of-type(2n)': { background: '#FAFAFA' }
                }}>
                <TableCell sx={{ width: { xs: '55%', md: '55%' } }}>
                  <Typography fontWeight={500}>{feat}</Typography>

                  <Responsive.Desktop>
                    <Typography color="text.secondary" sx={{ mt: 1 }} fontSize="12px">
                      {secondary}
                    </Typography>
                  </Responsive.Desktop>
                </TableCell>
                <TableCell sx={{ width: '15%' }} align="center">
                  <If condition={typeof normal === 'string'}>
                    <Then>{normal}</Then>

                    <Else>
                      {normal ? (
                        <DoneOutlined color="success" />
                      ) : (
                        <RemoveOutlined color="disabled" />
                      )}
                    </Else>
                  </If>
                </TableCell>
                <TableCell sx={{ width: '15%' }} align="center">
                  <If condition={typeof pro === 'string'}>
                    <Then>{pro}</Then>

                    <Else>
                      {pro ? <DoneOutlined color="success" /> : <RemoveOutlined color="disabled" />}
                    </Else>
                  </If>
                </TableCell>
                <TableCell sx={{ width: '15%' }} align="center">
                  <If condition={typeof VIP === 'string'}>
                    <Then>{VIP}</Then>

                    <Else>
                      {VIP ? <DoneOutlined color="success" /> : <RemoveOutlined color="disabled" />}
                    </Else>
                  </If>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
}

