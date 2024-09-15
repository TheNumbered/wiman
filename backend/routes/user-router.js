import { Router } from 'express';
import { getActiveBookings, getPastBookings } from '../controllers/bookings-controller.js';
import { getUserRole } from '../controllers/user-controller.js';
import { authUser } from '../middleware/auth.js';

const router = Router();
router.use('/user', authUser);
router.get('/user/role', getUserRole);
router.get('/user/bookings/active', getActiveBookings);
router.get('/user/bookings/past', getPastBookings);
export default router;
