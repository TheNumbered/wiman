import express from 'express';
import {
  getNotifications,
  markNotificationAsRead,
} from '../controllers/notification-controller.js';
import { authUser } from '../middleware/auth.js';

const router = express.Router();
router.use('/notifications', authUser);
router.get('/notifications', getNotifications);
router.put('/notifications/:id/read', markNotificationAsRead);

export default router;
