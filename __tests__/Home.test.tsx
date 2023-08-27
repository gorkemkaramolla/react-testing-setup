import { render, screen } from '@testing-library/react';
import Home from '@/app/page';

it('should have Hello World text', () => {
  render(<Home />);
  const myElement = screen.getByText('Hello World');
  expect(myElement).toBeInTheDocument(); // Use the toBeInTheDocument matcher
});
