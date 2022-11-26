import { GlobalStyle } from '@typings/_Global';

const withStepStyle = {
  stepContainer: {
    m: 5,
    p: 4,
    border: (theme) => '1px solid ' + theme?.palette.grey[400],
    borderRadius: 1,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  } as GlobalStyle
};

export default withStepStyle;
