import { Breakpoint, useMediaQuery, useTheme } from '@mui/material';

import { ReactElement } from 'react';

export function Responsive(props: {
  children: ReactElement | (() => ReactElement);
  containedKey: Breakpoint;
}) {
  const theme = useTheme();

  const condition = useMediaQuery(theme.breakpoints.down(props.containedKey));

  return renderChildFromType(props.children, condition);
}

Responsive.Desktop = function Desktop(props: {
  children: ReactElement | (() => ReactElement);
}): ReactElement | null {
  return renderChildFromType(props.children, isDesktop());
};

Responsive.NotDesktop = function NotDesktop(props: {
  children: ReactElement | (() => ReactElement);
}): ReactElement | null {
  return renderChildFromType(props.children, !isDesktop());
};

Responsive.Mobile = function Mobile(props: {
  children: ReactElement | (() => ReactElement);
}): ReactElement | null {
  return renderChildFromType(props.children, isMobile());
};

Responsive.Tablet = function Tablet(props: {
  children: ReactElement | (() => ReactElement);
}): ReactElement | null {
  return renderChildFromType(props.children, isTablet());
};
export const isMobile = (): boolean => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.only('xs'));

  return isMobile;
};

export const isTablet = (): boolean => {
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.only('sm'));

  return isTablet;
};

export const isDesktop = (): boolean => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  return isDesktop;
};

function renderChildFromType(child: ReactElement | (() => ReactElement), condition?: boolean) {
  if (condition || process.env.REACT_APP_ENV === 'test') return render(child);

  return null;
}

function render(child: ReactElement | (() => ReactElement)) {
  if (typeof child === 'function') return child();
  else return child;
}