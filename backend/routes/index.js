import express from 'express';
import bookingsRouter from './bookings-routes.js';
import notificationRouter from './notifications-router.js';
import userRouter from './user-route.js';

const router = express.Router();

router.use(notificationRouter);
router.use(bookingsRouter);
router.use(userRouter);

export default router;
