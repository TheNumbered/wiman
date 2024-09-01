import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';
import dotenv from 'dotenv';
import process from 'process';
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
