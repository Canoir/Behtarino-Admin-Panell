import render, { screen } from '@helpers/test';

test('Run App', async () => {
  render(<h1 data-testid="amir">Hello World!</h1>);

  const counter = await screen.findByTestId('amir');

  expect(counter).toBeTruthy();
});
