import express from 'express';
import { getVenueReservations, getVenues } from '../controllers/venues-controller.js';

const router = express.Router();

router.get('/venues', getVenues);
router.get('/venues/:venueId/reservation', getVenueReservations);

export default router;
