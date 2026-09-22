import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the marketplace landing page', () => {
  render(<App />);
  expect(screen.getByText(/Good help makes/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /find workers/i })).toBeInTheDocument();
});
