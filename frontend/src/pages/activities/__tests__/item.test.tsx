//@ts-nocheck
import { useUpdateMutation } from '@/hooks';
import { fireEvent, render, screen } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import { vi } from 'vitest';
import NotificationItem from '../item';

// Mock the hooks used in the component
vi.mock('@/hooks', () => ({
  useUpdateMutation: vi.fn(),
}));

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
}));

describe('NotificationItem', () => {
  const mockNotification = {
    notificationId: 1,
    message: 'New booking created',
    isRead: false,
    route: '/booking/123',
  };

  beforeEach(() => {
    // Reset mocks before each test
    (useUpdateMutation as vi.Mock).mockReturnValue({
      mutate: vi.fn(),
    });

    (useNavigate as vi.Mock).mockReturnValue(vi.fn());
  });

  it('renders the correct icon based on the message', () => {
    // Case 1: Booking notification
    const bookingNotification = { ...mockNotification, message: 'New booking created' };

    render(<NotificationItem notification={bookingNotification} />);

    // Assert that the booking icon is rendered
    expect(screen.getByTestId('MeetingRoomIcon')).toBeInTheDocument();
  });

  it('marks notification as read when clicked if unread', () => {
    const markAsReadMock = vi.fn();
    (useUpdateMutation as vi.Mock).mockReturnValue({
      mutate: markAsReadMock,
    });

    render(<NotificationItem notification={mockNotification} />);

    // Simulate clicking the notification
    fireEvent.click(screen.getByText('New booking created'));

    // Assert that markAsRead is called
    expect(markAsReadMock).toHaveBeenCalledWith({ id: '1/read', data: {} });
  });

  it('does not mark as read when notification is already read', () => {
    const readNotification = { ...mockNotification, isRead: true };
    const markAsReadMock = vi.fn();
    (useUpdateMutation as vi.Mock).mockReturnValue({
      mutate: markAsReadMock,
    });

    render(<NotificationItem notification={readNotification} />);

    // Simulate clicking the notification
    fireEvent.click(screen.getByText('New booking created'));

    // Assert that markAsRead is not called for a read notification
    expect(markAsReadMock).not.toHaveBeenCalled();
  });

  it('navigates to the correct route when clicked', () => {
    const navigateMock = vi.fn();
    (useNavigate as vi.Mock).mockReturnValue(navigateMock);

    render(<NotificationItem notification={mockNotification} />);

    // Simulate clicking the notification
    fireEvent.click(screen.getByText('New booking created'));

    // Assert that navigate is called with the correct route
    expect(navigateMock).toHaveBeenCalledWith('/booking/123');
  });
});
