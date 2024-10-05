//@ts-nocheck
import { useAuth } from '@clerk/clerk-react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import { useGetQuery } from '../hooks';

// Mock necessary hooks and components
vi.mock('@clerk/clerk-react', () => ({
  useAuth: vi.fn(),
  SignIn: () => <div>Sign In</div>,
  SignUp: () => <div>Sign Up</div>,
}));
vi.mock(import('../hooks'), () => ({
  useGetQuery: vi.fn(),
}));
vi.mock(import('../pages/admin/home/dashboard'), () => ({
  default: () => <div>Dashboard</div>,
}));
vi.mock(import('../pages/banned'), () => ({
  default: () => <div>Banned Page</div>,
}));
vi.mock(import('../components/LoadingIndicator'), () => ({
  LoadingIndicator: () => <div>Loading...</div>,
}));
vi.mock(import('../components/error-component'), () => ({
  default: ({ errorMessage }: { errorMessage: string }) => <div>{errorMessage}</div>,
}));
vi.mock(import('../components/layout'), () => ({
  default: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

describe('App Component', () => {
  beforeEach(() => {
    // Reset mocks before each test
    (useAuth as vi.Mock).mockReset();
    (useGetQuery as vi.Mock).mockReset();
  });

  it('renders loading indicator when app is loading', () => {
    // Mock loading state
    (useAuth as vi.Mock).mockReturnValue({ isLoaded: false });
    (useGetQuery as vi.Mock).mockReturnValue({ isLoading: true });

    render(<App />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('redirects to sign-in page if not signed in', () => {
    // Mock not signed-in state
    (useAuth as vi.Mock).mockReturnValue({ isSignedIn: false, isLoaded: true });
    (useGetQuery as vi.Mock).mockReturnValue({ isLoading: false });

    render(<App />);

    expect(screen.getByText('Sign In')).toBeInTheDocument();
  });

  // it('renders dashboard for signed-in admin users', async () => {
  //   // Mock signed-in admin user
  //   (useAuth as vi.Mock).mockReturnValue({
  //     isSignedIn: true,
  //     isLoaded: true,
  //     userId: '123',
  //   });
  //   (useGetQuery as vi.Mock).mockReturnValue({
  //     data: { blocked: 0, role: 'admin' },
  //     isLoading: false,
  //   });

  //   render(<App />);

  //   expect(await screen.findByText('Dashboard')).toBeInTheDocument();
  // });

  it('renders banned page if user is blocked', async () => {
    // Mock signed-in banned user
    (useAuth as vi.Mock).mockReturnValue({
      isSignedIn: true,
      isLoaded: true,
      userId: '123',
    });
    (useGetQuery as vi.Mock).mockReturnValue({
      data: { blocked: 1, role: 'admin' },
      isLoading: false,
    });

    render(<App />);

    expect(await screen.findByText('Banned Page')).toBeInTheDocument();
  });

  it('renders error component on data fetching error', async () => {
    // Mock error state
    (useAuth as vi.Mock).mockReturnValue({
      isSignedIn: true,
      isLoaded: true,
      userId: '123',
    });
    (useGetQuery as vi.Mock).mockReturnValue({
      data: null,
      isError: true,
      isLoading: false,
    });

    render(<App />);

    expect(await screen.findByText('A network error occurred')).toBeInTheDocument();
  });
});
