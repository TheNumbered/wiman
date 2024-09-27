import express from 'express';
import {
  cancelBooking,
  confirmBooking,
  getAllBookings,
} from '../controllers/bookings-controller.js';
import { getIssuesInProgress } from '../controllers/issue-report-controller.js';
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
router.get('/admin/issues-in-progress', getIssuesInProgress);
router.put('/admin/update-room/:id', updateRooms);

export default router;
