import Notification from '../models/notification-model.js';

// Get notifications for a user
export const getNotifications = async (req, res) => {
  try {
    const { userId } = req.auth;
    const notifications = await Notification.getNotificationsByUserId(userId);

    if (notifications.length === 0) {
      return res.status(404).json({ error: 'No notifications found' });
    }

    res.status(200).json(notifications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new notification
export const createNotification = async (req, res) => {
  try {
    const { userId, code, message } = req.body;

    // Validate required fields
    if (!userId || !code || !message) {
      return res.status(400).json({ error: 'Invalid input' });
    }

    await Notification.createNotification(userId, code, message);
    res.status(201).json({ message: 'Notification created' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Mark a notification as read
export const markNotificationAsRead = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ID
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid notification ID' });
    }

    const result = await Notification.markAsRead(id);

    if (result === 0) {
      return res.status(404).json({ error: 'Notification not found' });
    }

    res.status(200).json({ message: 'Notification marked as read' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
