import { Theme } from '@mui/material';

export const VirtualizedTableStyle = {
  classes: {
    flexContainer: 'ReactVirtualizedDemo-flexContainer',
    tableRow: 'ReactVirtualizedDemo-tableRow',
    tableRowColumn: 'ReactVirtualized__Table__rowColumn',
    tableRowHover: 'ReactVirtualizedDemo-tableRowHover',
    tableCell: 'ReactVirtualizedDemo-tableCell',
    tableCellHeader: 'ReactVirtualizedDemo-tableCell-Header',
    noClick: 'ReactVirtualizedDemo-noClick'
  },

  styles({ theme }: { theme: Theme }) {
    const { classes } = VirtualizedTableStyle;
    return {
      '& .ReactVirtualized__Table__headerRow': {
        ...(theme.direction === 'rtl' && {
          paddingLeft: '0 !important'
        }),
        ...(theme.direction !== 'rtl' && {
          paddingRight: undefined
        })
      },
      [`& .${classes.flexContainer}`]: {
        display: 'flex',
        alignItems: 'center',
        boxSizing: 'border-box'
      },
      [`& .${classes.tableRow}`]: {
        cursor: 'pointer'
      },
      [`& .${classes.tableRowHover}`]: {
        '&:hover': {
          backgroundColor: theme.palette.grey[200]
        }
      },
      [`& .${classes.tableCell}`]: {
        flex: 1
      },
      [`& .${classes.noClick}`]: {
        cursor: 'initial'
      },
      [`& .${classes.tableRowColumn},& .${classes.tableCellHeader} `]: {
        borderRight: '1px solid grey',
        borderBottom: '1px solid grey'
      },

      [`& .${classes.tableRowColumn},& .${classes.tableCellHeader} `]: {
        borderRight: '1px solid grey',
        borderBottom: '1px solid grey'
      }
    } as const;
  }
};
