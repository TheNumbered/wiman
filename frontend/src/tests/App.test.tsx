import App from '@/App';
import { useAuth } from '@clerk/clerk-react';
import { render, screen, waitFor } from '@testing-library/react';
import { afterEach, expect, test, vi } from 'vitest';

// Mock Clerk's useAuth hook
vi.mock('@clerk/clerk-react', () => ({
  useAuth: vi.fn(),
  SignIn: () => <div>Sign In Page</div>,
  SignUp: () => <div>Sign Up Page</div>,
  SignOutButton: () => <div>Sign Out</div>,
}));

// Reset mocks after each test
afterEach(() => {
  vi.clearAllMocks();
});

// Loading state
test('renders loading state, then sign-in page when not signed in', async () => {
  //@ts-ignore
  useAuth.mockReturnValueOnce({ isLoaded: false, isSignedIn: false });

  render(<App />);

  // Check that the loading text is displayed
  expect(screen.getByText('Loading...')).toBeInTheDocument();

  // Mock signed out state after loading
  //@ts-ignore
  useAuth.mockReturnValueOnce({ isLoaded: true, isSignedIn: false });

  render(<App />);

  // Wait for the navigation to the sign-in page
  await waitFor(() => expect(screen.getByText('Sign In Page')).toBeInTheDocument());
});

// // Signed-in state
// test('renders dashboard when signed in', async () => {
//   (useAuth as any).mockReturnValueOnce({ isLoaded: true, isSignedIn: true });
//   render(<App />);

//   // Wait for the dashboard to be rendered
//   await waitFor(() => expect(screen.getByText('Dashboard')).toBeInTheDocument());
//   expect(screen.getByText('Sign Out')).toBeInTheDocument();
// });

// Signed-out state
test('redirects to sign-in when accessing protected route while signed out', async () => {
  //@ts-ignore
  useAuth.mockReturnValueOnce({ isLoaded: true, isSignedIn: false });

  render(<App />);

  // Wait for redirection to the sign-in page
  await waitFor(() => expect(screen.getByText('Sign In Page')).toBeInTheDocument());
});
