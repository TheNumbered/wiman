import express from 'express';
import {
  createNotification,
  getNotifications,
  markNotificationAsRead,
} from '../controllers/notification-controller.js';
import { authUser } from '../middleware/auth.js';

const router = express.Router();
router.use('/notifications', authUser);
router.get('/notifications', getNotifications);
router.post('/notifications', createNotification);
router.put('/notifications/:id/read', markNotificationAsRead);

export default router;
