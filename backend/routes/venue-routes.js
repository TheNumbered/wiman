import express from 'express';
import { getVenueReservations, getVenues } from '../controllers/venues-controller.js';
import { authRequest } from '../middleware/auth.js';

const router = express.Router();
router.use('/venues', authRequest);
router.get('/venues', getVenues);
router.get('/venues/:venueId/reservations', getVenueReservations);

export default router;
