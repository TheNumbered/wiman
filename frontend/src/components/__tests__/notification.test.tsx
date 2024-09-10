import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import NotificationItem from '../notifications/item';
import NotificationList from '../notifications/list';

vi.mock('@/hooks', () => ({
  useGetQuery: () => ({
    data: [
      {
        id: '1',
        userId: 'user1',
        code: 'maintenance',
        message: 'Maintenance scheduled',
        isRead: false,
      },
      { id: '2', userId: 'user1', code: 'booking', message: 'New booking created', isRead: true },
    ],
    isLoading: false,
    isError: false,
  }),
}));

describe('NotificationList Component', () => {
  // it('should render loading state', () => {
  //   vi.mock('@/hooks', () => ({
  //     useGetQuery: () => ({
  //       data: [],
  //       isLoading: true,
  //       isError: false,
  //     }),
  //   }));

  //   render(<NotificationList />);

  //   expect(screen.getByText('Loading...')).toBeInTheDocument();
  // });

  // it('should render error state', () => {
  //   vi.mock('@/hooks', () => ({
  //     useGetQuery: () => ({
  //       data: [],
  //       isLoading: false,
  //       isError: true,
  //     }),
  //   }));

  //   render(<NotificationList />);

  //   expect(screen.getByText('Error fetching notifications')).toBeInTheDocument();
  // });

  it('should render notifications correctly', async () => {
    render(<NotificationList />);

    await waitFor(() => {
      expect(screen.getByText('Maintenance scheduled')).toBeInTheDocument();
      expect(screen.getByText('New booking created')).toBeInTheDocument();
      expect(screen.getByText('Notifications')).toBeInTheDocument();
      expect(screen.getByText('Seen Notifications')).toBeInTheDocument();
    });
  });
});

describe('NotificationItem Component', () => {
  it('should render the correct icon and message', () => {
    const notification = {
      id: '1',
      userId: 'user1',
      code: 'booking',
      message: 'New booking created',
      isRead: false,
    };

    render(<NotificationItem notification={notification} />);

    expect(screen.getByText('New booking created')).toBeInTheDocument();
    expect(screen.getByRole('button')).toContainElement(screen.getByTestId('MeetingRoomIcon'));
  });

  it('should render a chip for cancel_booking notifications', () => {
    const notification = {
      id: '2',
      userId: 'user1',
      code: 'cancel_booking',
      message: 'Booking canceled',
      isRead: false,
    };

    render(<NotificationItem notification={notification} />);

    expect(screen.getByText('Edit Booking')).toBeInTheDocument();
  });
});
