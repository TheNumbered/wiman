import Notification from '../models/notification-model.js';

export const getNotifications = async (req, res) => {
  try {
    const { userId } = req.auth;
    const notifications = await Notification.getNotificationsByUserId(userId);
    res.json(notifications);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const createNotification = async (req, res) => {
  try {
    const { userId, code, message } = req.body;
    await Notification.createNotification(userId, code, message);
    res.status(201).json({ message: 'Notification created' });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const markNotificationAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    await Notification.markAsRead(id);
    res.status(200).json({ message: 'Notification marked as read' });
  } catch (err) {
    res.status(500).send(err.message);
  }
};
