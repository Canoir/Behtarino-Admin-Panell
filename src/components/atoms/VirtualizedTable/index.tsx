import { AutoSizer, Column, Table, TableCellProps, TableHeaderProps } from 'react-virtualized';

import { ReactNode } from 'react';
import TableCell from '@mui/material/TableCell';
import { VirtualizedTableStyle } from './style';
import clsx from 'clsx';
import { styled } from '@mui/material/styles';

interface Props {
  columns: readonly ColumnData[];
  headerHeight?: number;
  onRowClick?: () => void;
  rowCount: number;
  getRowData: (index: number) => unknown;
  rowHeight?: number;
}

interface ColumnData {
  dataKey: string;
  label: string;
  numeric?: boolean;
  render?: (data: unknown) => ReactNode;
  width: number;
}

interface Row {
  index: number;
}

const { classes, styles } = VirtualizedTableStyle;

function MuiVirtualizedTable(props: Props) {
  const { columns, rowHeight, headerHeight, getRowData, ...tableProps } = props;

  function getRowClassName({ index }: Row) {
    const { onRowClick } = props;

    return clsx(classes.tableRow, classes.flexContainer, {
      [classes.tableRowHover]: index !== -1 && onRowClick != null
    });
  }

  function cellRenderer({ cellData, columnIndex }: TableCellProps) {
    const { onRowClick } = props;
    return (
      <TableCell
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        component={'div' as any}
        className={clsx(classes.tableCell, classes.flexContainer, {
          [classes.noClick]: onRowClick == null
        })}
        variant="body"
        style={{ height: rowHeight }}
        align={(columnIndex != null && columns[columnIndex].numeric) || false ? 'right' : 'left'}>
        {columns[columnIndex]?.render?.(cellData) || cellData}
      </TableCell>
    );
  }

  function headerRenderer({ label, columnIndex }: TableHeaderProps & { columnIndex: number }) {
    return (
      <TableCell
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        component={'div' as any}
        className={clsx(
          classes.tableCell,
          classes.flexContainer,
          classes.noClick,
          classes.tableCellHeader
        )}
        variant="head"
        style={{ height: headerHeight }}
        align={columns[columnIndex].numeric || false ? 'right' : 'left'}>
        <span>{label as ReactNode}</span>
      </TableCell>
    );
  }

  return (
    <>
      <AutoSizer>
        {({ height, width }) => (
          <Table
            height={height}
            width={width}
            rowHeight={rowHeight || 0}
            gridStyle={{
              direction: 'inherit'
            }}
            headerHeight={headerHeight || 0}
            rowGetter={(row) => getRowData(row.index)}
            {...tableProps}
            rowClassName={getRowClassName}>
            {columns.map(({ dataKey, ...other }, index) => {
              return (
                <Column
                  key={dataKey}
                  headerRenderer={(headerProps) =>
                    headerRenderer({
                      ...headerProps,
                      columnIndex: index
                    })
                  }
                  className={classes.flexContainer}
                  cellRenderer={cellRenderer}
                  dataKey={dataKey}
                  {...other}
                />
              );
            })}
          </Table>
        )}
      </AutoSizer>
    </>
  );
}

export const VirtualizedTable = styled(MuiVirtualizedTable)(styles);
