import { KeyboardArrowDownOutlined, KeyboardArrowUpOutlined } from '@mui/icons-material';
import { useEffect, useMemo, useRef } from 'react';

import Box from '@mui/material/Box';
import { DATE_PICKER } from '@constants/test';
import { IconButton } from '@mui/material';
import { Responsive } from '../Responsive';
import Typography from '@mui/material/Typography';
import __debounce from 'lodash/debounce';
import __range from 'lodash/range';

type ItemPickerProps = {
  items: (string | number)[];
  value: string | number;
  onChange: (index: number) => void;
};

const containerHeight = 120;
const itemHeight = 40;

const ItemPicker = ({ items, value, onChange }: ItemPickerProps) => {
  const sliderRef = useRef<HTMLElement>(null);
  const fillElements = __range(Math.floor(containerHeight / (itemHeight * 2))).map(() => '');

  const snapToItem = (index: number) => {
    sliderRef?.current?.scrollTo?.({
      top: index * itemHeight,
      behavior: 'smooth'
    });
  };

  const selectedItemIndex = useMemo(
    () => items.findIndex((index) => index === value),
    [items, value]
  );

  const onScroll = () => {
    const selectedIndex =
      Math.round(
        ((sliderRef.current?.scrollTop || 0) + (sliderRef.current?.clientHeight || 0)) / itemHeight
      ) -
      fillElements.length * 2 -
      1;
    onChange(selectedIndex);
    snapToItem(selectedIndex);
  };

  useEffect(() => {
    snapToItem(selectedItemIndex);
  }, [snapToItem]);

  return (
    <Box display="flex" flexDirection="column" justifyContent="space-between" alignItems="stretch">
      <Responsive.Desktop>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          data-testId={DATE_PICKER.upButton}>
          <IconButton
            sx={{ color: (theme) => theme.palette.text.secondary }}
            size="small"
            onClick={() => snapToItem(selectedItemIndex - 1)}>
            <KeyboardArrowUpOutlined />
          </IconButton>
        </Box>
      </Responsive.Desktop>

      <Box
        className="hidden-scrollbar"
        flex={1}
        overflow="auto"
        maxHeight={containerHeight}
        ref={sliderRef}
        onScroll={__debounce(onScroll, 200)}>
        {[...fillElements, ...items, ...fillElements].map((label, index) => {
          const selected = index - fillElements.length === selectedItemIndex;
          return (
            <Typography
              data-testId={selected ? DATE_PICKER.selected : 'not-selected'}
              key={index}
              color={selected ? 'secondary' : undefined}
              height={itemHeight}
              align="center"
              fontWeight={selected ? 'bold' : 'normal'}>
              {label}
            </Typography>
          );
        })}
      </Box>

      <Responsive.Desktop>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          data-testId={DATE_PICKER.downButton}>
          <IconButton
            sx={{ color: (theme) => theme.palette.text.secondary }}
            size="small"
            onClick={() => snapToItem(selectedItemIndex + 1)}>
            <KeyboardArrowDownOutlined />
          </IconButton>
        </Box>
      </Responsive.Desktop>
    </Box>
  );
};
export default ItemPicker;
