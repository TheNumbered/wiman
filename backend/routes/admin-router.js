import express from 'express';
import { getAllBookings } from '../controllers/bookings-controller.js';
import { getUsers, toggleBanStatus, updateUserRole } from '../controllers/user-controller.js';
import { authAdmin } from '../middleware/auth.js';

const router = express.Router();
router.use('/admin', authAdmin);
router.get('/admin/bookings', getAllBookings);
router.get('/admin/users', getUsers);
router.put('/admin/toggle-ban/:id', toggleBanStatus);
router.put('/admin/update-role/:id', updateUserRole);

export default router;
