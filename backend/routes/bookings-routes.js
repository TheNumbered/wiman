import { Router } from 'express';
import cron from 'node-cron';
import {
  cancelBooking,
  createBooking,
  getBookingStatus,
} from '../controllers/bookings-controller.js';
import { sendReminders } from '../controllers/push-notifications-controller.js';
import { authRequest } from '../middleware/auth.js';

const router = Router();
router.use('/bookings', authRequest);
router.put('/bookings/cancel/:id', cancelBooking);
router.get('/bookings/status/:id', getBookingStatus);
router.post('/bookings', createBooking);

cron.schedule('* * * * *', () => {
  console.log('Running booking reminder check...');
  sendReminders();
});
export default router;
