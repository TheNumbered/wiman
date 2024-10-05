import express from 'express';
import multer from 'multer';
import {
  cancelBooking,
  confirmBooking,
  getAllBookings,
  uploadCsvAndCreateBookings,
} from '../controllers/bookings-controller.js';
import { getIssuesInProgress } from '../controllers/issue-report-controller.js';
import { notifyUser } from '../controllers/push-notifications-controller.js';
import { getUsers, toggleBanStatus, updateUserRole } from '../controllers/user-controller.js';
import { updateVenue } from '../controllers/venues-controller.js';
import { authAdmin } from '../middleware/auth.js';

// Setup Multer for file handling
const upload = multer({ dest: 'uploads/' });

const router = express.Router();
router.use('/admin', authAdmin);
router.get('/admin/bookings', getAllBookings);
router.put('/admin/bookings/approve/:id', confirmBooking);
router.put('/admin/bookings/cancel/:id', cancelBooking);
router.get('/admin/users', getUsers);
router.post('/admin/notify/user', notifyUser);
router.put('/admin/toggle-ban/:id', toggleBanStatus);
router.put('/admin/update-role/:id', updateUserRole);
router.get('/admin/issues-in-progress', getIssuesInProgress);
router.put('/admin/update-venue/:id', updateVenue);
router.post('/admin/bookings/schedule', upload.single('file'), uploadCsvAndCreateBookings);
export default router;
