import express from 'express';
import {
  createNotification,
  getNotifications,
  markNotificationAsRead,
} from '../controllers/notification-controller.js';

import { authUser } from '../middleware/auth.js';

const router = express.Router();
router.use(authUser);

// Route to get notifications for a specific user
router.get('/notifications', getNotifications);

// Route to create a new notification
router.post('/notifications', createNotification);

// Route to mark a notification as read
router.put('/notifications/:id/read', markNotificationAsRead);

export default router;
