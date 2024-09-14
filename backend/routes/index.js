import express from 'express';
import adminRouter from './admin-router.js';
import bookingsRouter from './bookings-routes.js';
import issueReportRouter from './issue-report-route.js';
import notificationRouter from './notifications-router.js';
<<<<<<< HEAD
import userRouter from './user-route.js';
=======
import userRouter from './user-router.js';
>>>>>>> 71525938d0135bf94f0922f8b4d147a80aa72480
import venueRouter from './venue-routes.js';

const router = express.Router();

router.use(notificationRouter);
router.use(bookingsRouter);
router.use(userRouter);
router.use(adminRouter);
router.use(issueReportRouter);
router.use(venueRouter);

export default router;
