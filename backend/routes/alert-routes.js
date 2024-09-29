import { Router } from 'express';
import { getAlertByVenue, getVenuesWithAlerts } from '../controllers/alert-controller.js';

const router = Router();

// Fetch all venues with alerts
router.get('/alerts', getVenuesWithAlerts);

// Fetch alerts by specific venue ID
router.get('/alerts/:id', getAlertByVenue);

export default router;
