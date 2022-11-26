import { GlobalStyle } from "@typings/_Global";

const lookProStyle = {
  firstImageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    mt: {
      xs: -9,
      md: 6
    }
  } as GlobalStyle,
  bottomBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: { md: 'start', xs: 'center' },
    flexDirection: 'column',
    mt: { xs: 4, md: 0 },
    pl: { md: 18 }
  } as GlobalStyle
};

export default lookProStyle;
