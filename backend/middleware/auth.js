import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';
import dotenv from 'dotenv';
import process from 'process';
import db from '../config/db.js';
dotenv.config({ path: '.env.local' });

// Middleware to check if the request has a valid API key or is authorized by Clerk
export const authRequest = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];

    if (token === process.env.API_KEY) {
      return next(); // API key is valid, continue to the next handler
    }
  }

  // If API key is invalid, call Clerk's authorization middleware
  ClerkExpressRequireAuth()(req, res, next);
};

// Middleware to check if the user is authorized by Clerk
export const authUser = ClerkExpressRequireAuth();

export const authAdmin = async (req, res, next) => {
  await authUser(req, res, async () => {
    try {
      const id = req.auth.userId;
      const [rows] = await db.query('SELECT role FROM users WHERE user_id = ? AND blocked = 0', [
        id,
      ]);
      if (rows.length === 0 || rows[0].role !== 'admin') {
        return res.status(403).json({ message: 'Unauthorized' });
      }
      next();
    } catch (err) {
      next(new Error('Unauthorized'));
    }
  });
};

export const authMaintenance = async (req, res, next) => {
  await authUser(req, res, async () => {
    try {
      const id = req.auth.userId;
      const [rows] = await db.query('SELECT role FROM users WHERE user_id = ? AND blocked = 0', [
        id,
      ]);
      if (rows.length === 0 || rows[0].role !== 'maintenance') {
        return res.status(403).json({ message: 'Unauthorized' });
      }
      next();
    } catch (err) {
      next(new Error('Unauthorized'));
    }
  });
};
