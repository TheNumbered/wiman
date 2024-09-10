import express from 'express';
import notificationRouter from './notifications-router.js';
import userRouter from './user-route.js';

const router = express.Router();

router.use(notificationRouter);
router.use(userRouter);

export default router;
