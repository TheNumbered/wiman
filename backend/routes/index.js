import express from 'express';
import adminRouter from './admin-router.js';
import bookingsRouter from './bookings-routes.js';
import issueReportRouter from './issue-report-route.js';
import notificationRouter from './notifications-router.js';
import userRouter from './user-router.js';
import venueRouter from './venue-routes.js';

const router = express.Router();

router.use(notificationRouter);
router.use(bookingsRouter);
router.use(userRouter);
router.use(adminRouter);
router.use(issueReportRouter);
router.use(venueRouter);

export default router;
