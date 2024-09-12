import cors from 'cors';
import express from 'express';
import fs from 'fs';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import { authRequest } from './middlewares/auth.js';
import errorHandler from './middlewares/error-handler.js';
import bookingRoutes from './routes/booking-routes.js';
import issueReportRoutes from './routes/issue-report-route.js'; // Import issue-report routes
import userRoutes from './routes/user-route.js';

const app = express();

// Place CORS middleware at the top
app.use(cors());
app.use(express.json()); // Middleware for JSON request parsing

// Swagger documentation setup
try {
  const swaggerPath = path.resolve('./swagger.json');
  const swaggerDocument = JSON.parse(fs.readFileSync(swaggerPath, 'utf8'));
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
} catch {
  console.log('Error reading swagger.json file');
}

// Register your routes
app.use('/api', bookingRoutes); //booking
app.use('/api', userRoutes); // User routes
app.use('/api', issueReportRoutes); // Issue report routes

// Example protected route
app.get('/', authRequest, (req, res) => {
  res.json({ message: 'Hello, world!' });
});

// Error handling middleware must be last
app.use(errorHandler);

export default app;
