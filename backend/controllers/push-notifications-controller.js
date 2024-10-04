import { addDays, addMonths, addWeeks, isBefore } from 'date-fns';
import Booking from '../models/bookings-model.js';
import Notification from '../models/notification-model.js';
import NotificationService from '../services/notification.js';

export const sendReminders = async () => {
  try {
    const now = new Date();

    // Fetch bookings where the next reminder is due
    const bookingsToRemind = await Booking.getBookingsDueForReminder(now);

    if (bookingsToRemind.length > 0) {
      const notificationService = new NotificationService();

      for (const booking of bookingsToRemind) {
        const {
          date,
          bookingId,
          userId,
          eventName,
          startTime,
          repeatFrequency,
          repeatUntil,
          nextReminder: lastReminder,
        } = booking;

        const content = `Reminder: Your booking for ${eventName} is starting at ${startTime}. Please be on time!`;

        await notificationService.pushNotification({
          heading: 'Booking Reminder',
          content,
          userIds: [userId],
        });

        let nextReminder = null;
        const lastReminderDate = new Date(lastReminder);

        if (repeatFrequency !== 'none') {
          let nextOccurrence = null;

          switch (repeatFrequency) {
            case 'daily':
              nextOccurrence = addDays(lastReminderDate, 1); // Add 1 day
              break;
            case 'weekly':
              nextOccurrence = addWeeks(lastReminderDate, 1); // Add 1 week
              break;
            case 'monthly':
              nextOccurrence = addMonths(lastReminderDate, 1); // Add 1 month
              break;
          }

          // If there's a repeatUntil date, make sure the next occurrence is before or on that date
          if (repeatUntil) {
            const repeatUntilDate = new Date(repeatUntil);
            if (
              isBefore(nextOccurrence, repeatUntilDate) ||
              nextOccurrence.getTime() === repeatUntilDate.getTime()
            ) {
              nextReminder = nextOccurrence;
            }
          }
        }

        // If no further reminders are needed, set next_reminder to null
        await Booking.updateNextReminder(bookingId, nextReminder);
      }
    }
  } catch (err) {
    console.error('Error sending reminders:', err.message);
  }
};

export const onBookingCancelled = async (bookingId, reasonForCancellation) => {
  try {
    if (reasonForCancellation) {
      const updatedBooking = await Booking.getBookingById(bookingId);
      // Send notification to the user
      const notificationService = new NotificationService();
      const userId = updatedBooking.userId;
      const content = `Your booking for ${updatedBooking.eventName} has been cancelled, reason: ${reasonForCancellation}`;
      await notificationService.pushNotification({
        heading: 'Booking Cancelled',
        content,
        userIds: [userId], // Send to the specific user
      });
    }
  } catch (err) {
    console.log(err.message);
  }
};

export const onBookingConfirmed = async (bookingId) => {
  try {
    const updatedBooking = await Booking.getBookingById(bookingId);
    // Send notification to the user
    const notificationService = new NotificationService();
    const userId = updatedBooking.userId;
    const content = `Your booking for event: ${updatedBooking.eventName} has been confirmed`;
    await notificationService.pushNotification({
      heading: 'Booking Confirmed',
      content,
      userIds: [userId], // Send to the specific user
    });
  } catch (err) {
    console.log(err.message);
  }
};

export const onIssueReportCreated = async (venueId) => {
  try {
    const notificationService = new NotificationService();
    const content = `A new issue report has been created for venue: ${venueId}`;
    await notificationService.pushNotification({
      heading: 'Issue Report Created',
      content,
      filters: notificationService.filters.maintainerFilters,
    });
  } catch (err) {
    console.log(err.message);
  }
};

export const notifyUser = async (req, res) => {
  try {
    const { userId, heading, message, route } = req.body;
    const insertId = await Notification.createNotification(userId, message, route);

    if (!insertId) {
      return res.status(500).json({ error: 'Failed to create notification' });
    }

    const notificationService = new NotificationService();
    await notificationService.pushNotification({
      heading: heading || 'New Notification',
      content: message,
      userIds: [userId],
    });
    res.status(200).json({ message: 'Notification sent' });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: err.message });
  }
};
