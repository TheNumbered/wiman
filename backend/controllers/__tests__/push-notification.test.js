import { addDays } from 'date-fns';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import Booking from '../../models/bookings-model.js';
import NotificationService from '../../services/notification.js';
import {
  onBookingCancelled,
  onBookingConfirmed,
  onIssueReportCreated,
  sendReminders,
} from '../push-notifications-controller.js';

vi.mock('./push-notifications-controller.js', {
  onBookingCancelled: vi.fn(),
  onBookingConfirmed: vi.fn(),
  onIssueReportCreated: vi.fn(),
});

describe('Push Notification', () => {
  let mockPushNotification;

  beforeEach(() => {
    vi.clearAllMocks();
    Booking.updateNextReminder = vi.fn();
    mockPushNotification = vi.fn();
    NotificationService.prototype.pushNotification = mockPushNotification;
  });
  describe('onBookingConfirmed', () => {
    it('should send a confirmation notification', async () => {
      Booking.getBookingById = vi
        .fn()
        .mockResolvedValue({ id: 1, eventName: 'Event 1', userId: 'user1' });

      // Call the onBookingConfirmed function, which uses NotificationService
      await onBookingConfirmed(1);

      // Verify that the notification was sent
      expect(mockPushNotification).toHaveBeenCalledWith({
        heading: 'Booking Confirmed',
        content: 'Your booking for event: Event 1 has been confirmed',
        userIds: ['user1'],
      });
    });

    it('should not send a notification if the booking is not found', async () => {
      Booking.getBookingById = vi.fn().mockResolvedValue(null);

      await onBookingConfirmed(1);

      expect(mockPushNotification).not.toHaveBeenCalled();
    });
  });

  describe('sendReminders', () => {
    it('should send reminders and update next reminder', async () => {
      // Mock getBookingsDueForReminder to return a booking that needs a reminder
      const now = new Date();
      Booking.getBookingsDueForReminder = vi.fn().mockResolvedValue([
        {
          date: '2023-12-01',
          bookingId: 1,
          userId: 'user1',
          eventName: 'Event 1',
          startTime: '10:00',
          repeatFrequency: 'daily',
          repeatUntil: '2030-12-31',
          nextReminder: now,
        },
      ]);

      // Call the sendReminders function
      await sendReminders();

      // Check that a reminder was sent
      expect(mockPushNotification).toHaveBeenCalledWith({
        heading: 'Booking Reminder',
        content: expect.stringContaining('Your booking for Event 1 is starting'),
        userIds: ['user1'],
      });

      // Check that the next reminder was updated
      expect(Booking.updateNextReminder).toHaveBeenCalledWith(1, addDays(now, 1));
    });

    it('should not send any reminders if no bookings are due', async () => {
      Booking.getBookingsDueForReminder = vi.fn().mockResolvedValue([]);

      await sendReminders();

      expect(mockPushNotification).not.toHaveBeenCalled();
      expect(Booking.updateNextReminder).not.toHaveBeenCalled();
    });
  });
  describe('onBookingCancelled', () => {
    it('should send a cancellation notification', async () => {
      Booking.getBookingById = vi.fn().mockResolvedValue({
        bookingId: 1,
        userId: 'user1',
        eventName: 'Event 1',
      });

      // Call onBookingCancelled
      await onBookingCancelled(1, 'Changed plans');

      // Verify cancellation notification was sent
      expect(mockPushNotification).toHaveBeenCalledWith({
        heading: 'Booking Cancelled',
        content: 'Your booking for Event 1 has been cancelled, reason: Changed plans',
        userIds: ['user1'],
      });
    });

    it('should not send a notification if no cancellation reason is provided', async () => {
      await onBookingCancelled(1);
      expect(mockPushNotification).not.toHaveBeenCalled();
    });
  });
  describe('onIssueReportCreated', () => {
    it('should send an issue report notification to maintainers', async () => {
      // Call onIssueReportCreated
      await onIssueReportCreated('venue1');

      // Verify issue report notification was sent
      expect(mockPushNotification).toHaveBeenCalledWith({
        heading: 'Issue Report Created',
        content: 'A new issue report has been created for venue: venue1',
        filters: [{ field: 'tag', key: 'role', relation: '=', value: 'maintenance' }],
      });
    });
  });
});
