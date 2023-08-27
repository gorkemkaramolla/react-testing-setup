import { fireEvent, render, screen } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { handlers } from '../mockHandlers';
import Fetch from '@/components/Fetch';
import { rest } from 'msw';

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

it('should display greeting on successful API response', async () => {
  render(<Fetch url='/greeting' />);
  fireEvent.click(screen.getByText('Load Greeting'));
  await screen.findByRole('heading');
  expect(screen.getByRole('heading')).toHaveTextContent('Hello, world!');
  expect(screen.queryByRole('alert')).toBeNull();
  expect(screen.getByRole('button')).toBeDisabled();
});

it('handles server error', async () => {
  server.use(
    // override the initial "GET /greeting" request handler
    // to return a 500 Server Error
    rest.get('/greeting', (req, res, ctx) => {
      return res(ctx.status(500)); // Change the status to 500
    })
  );

  render(<Fetch url='/greeting' />);
  fireEvent.click(screen.getByText('Load Greeting'));
  await screen.findByRole('alert'); // Wait for the error message to appear
  expect(screen.queryByRole('heading')).toBeNull(); // No heading should be displayed
  expect(screen.getByRole('alert')).toHaveTextContent('Oops, failed to fetch!');
  expect(screen.getByRole('button')).not.toBeDisabled(); // Button should not be disabled
});
