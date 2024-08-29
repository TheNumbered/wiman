import App from '@/App';
import { render, screen, waitFor } from '@testing-library/react';
import { expect, test, vi } from 'vitest';

// Mock fetch globally
//@ts-ignore
global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ message: 'Hello from API' }),
  }),
);

test('App component renders and fetches data', async () => {
  render(<App />);

  // Check that the initial loading text is displayed
  expect(screen.getByText('Loading...')).toBeInTheDocument();

  // Wait for the fetch to resolve and check the final text
  await waitFor(() => expect(screen.getByText('Hello from API')).toBeInTheDocument());
});
