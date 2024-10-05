//@ts-nocheck
import { useGetQuery } from '@/hooks';
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import NotificationList from '../list';

// Mock the hooks used in the component
vi.mock(import('@/hooks'), () => ({
  useGetQuery: vi.fn(),
  useUpdateMutation: vi.fn(), // Mocking the mutation hook
}));

// Mock child components
vi.mock('@/components/error-component', () => ({
  default: ({ errorMessage, onRetry }: { errorMessage: string; onRetry: () => void }) => (
    <div>
      <div>{errorMessage}</div>
      <button onClick={onRetry}>Retry</button>
    </div>
  ),
}));

vi.mock('@/components/LoadingIndicator', () => ({
  LoadingIndicator: () => <div>Loading...</div>,
}));

vi.mock(import('../item'), () => ({
  default: ({ notification }: { notification: any }) => <div>{notification.message}</div>,
}));

describe('NotificationList', () => {
  it('displays loading indicator when loading', () => {
    useGetQuery.mockReturnValue({
      data: null,
      isLoading: true,
      isError: false,
    });

    render(<NotificationList />);

    // Assert the loading indicator is displayed
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('displays error component when there is an error', () => {
    // Mock the hook to return an error state
    useGetQuery.mockReturnValue({
      data: null,
      isLoading: false,
      isError: true,
    });

    render(<NotificationList />);

    // Assert the error message and retry button are displayed
    expect(screen.getByText('Error fetching notifications')).toBeInTheDocument();
    expect(screen.getByText('Retry')).toBeInTheDocument();
  });

  it('displays notifications when data is available', () => {
    // Mock the hook to return data
    useGetQuery.mockReturnValue({
      data: [
        { notificationId: 1, message: 'New Notification 1', isRead: false },
        { notificationId: 2, message: 'New Notification 2', isRead: true },
      ],
      isLoading: false,
      isError: false,
    });

    render(<NotificationList />);

    // Assert unseen notifications are displayed
    expect(screen.getByText('New Notification 1')).toBeInTheDocument();

    // Assert seen notifications are displayed
    expect(screen.getByText('New Notification 2')).toBeInTheDocument();
  });
});
