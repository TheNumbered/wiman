import express from 'express';
import { getUsers, toggleBanStatus, updateUserRole } from '../controllers/user-controller.js';
import { authUser } from '../middlewares/auth.js';

const router = express.Router();
router.use(authUser);
router.get('/users', getUsers);
router.put('/toggle-ban/:id', toggleBanStatus);
router.put('/update-role/:id', updateUserRole);

export default router;
