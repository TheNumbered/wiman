//@ts-nocheck
import { useCreateMutation, useGetQuery, useUpdateMutation } from '@/hooks';
import { fireEvent, render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import CancelVenueBookingsModal from '../cancel-venue-bookings';

// Mock the hooks
vi.mock('@/hooks', () => ({
  useGetQuery: vi.fn(),
  useUpdateMutation: vi.fn(),
  useCreateMutation: vi.fn(),
}));

describe('CancelVenueBookingsModal', () => {
  const mockClose = vi.fn();
  const mockBookings = [
    {
      bookingId: 1,
      venueId: '123',
      eventName: 'Event A',
      date: '2024-10-06',
      startTime: '10:00 AM',
      endTime: '12:00 PM',
      status: 'confirmed',
      repeatFrequency: 'none',
      userId: 101,
    },
    {
      bookingId: 2,
      venueId: '123',
      eventName: 'Recurring Event B',
      date: '2024-10-07',
      startTime: '2:00 PM',
      endTime: '4:00 PM',
      status: 'confirmed',
      repeatFrequency: 'weekly',
      userId: 102,
    },
  ];

  beforeEach(() => {
    (useGetQuery as vi.Mock).mockReturnValue({
      data: mockBookings,
    });

    (useUpdateMutation as vi.Mock).mockReturnValue({
      mutate: vi.fn(),
    });

    (useCreateMutation as vi.Mock).mockReturnValue({
      mutate: vi.fn(),
    });
  });

  it('renders bookings for a venue', () => {
    render(<CancelVenueBookingsModal venueId="123" onClose={mockClose} />);

    // Check that the event names and details are displayed
    expect(screen.getByText('Event A')).toBeInTheDocument();
    expect(screen.getByText('Recurring Event B')).toBeInTheDocument();
    expect(screen.getByText('Recurs: weekly')).toBeInTheDocument();

    // Check if the cancel button is present
    expect(screen.getByText('Cancel Booking')).toBeInTheDocument();
    expect(screen.getByText('Cancel once and notify')).toBeInTheDocument();
  });

  it('displays "No bookings for this venue" when there are no bookings', () => {
    (useGetQuery as vi.Mock).mockReturnValue({ data: [] });

    render(<CancelVenueBookingsModal venueId="123" onClose={mockClose} />);

    // Check for "No bookings for this venue" message
    expect(screen.getByText('No bookings for this venue.')).toBeInTheDocument();
  });

  it('calls cancelBooking mutation when "Cancel Booking" button is clicked', () => {
    const mockCancelBooking = vi.fn();
    (useUpdateMutation as vi.Mock).mockReturnValue({ mutate: mockCancelBooking });

    render(<CancelVenueBookingsModal venueId="123" onClose={mockClose} />);

    // Simulate clicking the "Cancel Booking" button for the first booking
    fireEvent.click(screen.getByText('Cancel Booking'));

    // Ensure the cancelBooking mutation was called with correct booking ID and data
    expect(mockCancelBooking).toHaveBeenCalledWith({
      id: 1,
      data: { reasonForCancellation: 'Security Issue' },
    });
  });

  it('calls notifyRecurringBooking mutation when "Cancel once and notify" button is clicked', () => {
    const mockNotifyRecurringBooking = vi.fn();
    (useCreateMutation as vi.Mock).mockReturnValue({ mutate: mockNotifyRecurringBooking });

    render(<CancelVenueBookingsModal venueId="123" onClose={mockClose} />);

    // Simulate clicking the "Cancel once and notify" button for the recurring booking
    fireEvent.click(screen.getByText('Cancel once and notify'));

    // Ensure the notifyRecurringBooking mutation was called with the correct user ID and message
    expect(mockNotifyRecurringBooking).toHaveBeenCalledWith({
      userId: 102,
      heading: 'Booking Cancellation',
      message: `Your booking for Recurring Event B at 123 has been cancelled due to issues with the venue, but the rest of the bookings are still on.`,
      route: '/bookings',
    });
  });
});
