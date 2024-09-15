import express from 'express';
import {
  cancelBooking,
  confirmBooking,
  getAllBookings,
} from '../controllers/bookings-controller.js';
import { getUsers, toggleBanStatus, updateUserRole } from '../controllers/user-controller.js';
import { authAdmin } from '../middleware/auth.js';

const router = express.Router();
router.use('/admin', authAdmin);
router.get('/admin/bookings', getAllBookings);
router.put('/admin/bookings/approve/:id', confirmBooking);
router.put('/admin/bookings/cancel/:id', cancelBooking);
router.get('/admin/users', getUsers);
router.put('/admin/toggle-ban/:id', toggleBanStatus);
router.put('/admin/update-role/:id', updateUserRole);

export default router;
