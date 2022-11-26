import App from 'App';
import { ReactElement } from 'react';
import { render as _render } from '@testing-library/react';

function render(child: ReactElement) {
  return _render(<App>{child}</App>);
}

export * from '@testing-library/react';
export default render;
