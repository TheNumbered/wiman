import express from 'express';
import { getVenues, } from '../controllers/venues-controller.js';

const router = express.Router();

router.get('/venues', getVenues);

export default router;
