import cors from 'cors';
import express from 'express';
import fs from 'fs';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import { authRequest } from './middleware/auth.js';
import errorHandler from './middleware/error-handler.js';
import alertRoutes from './routes/alert-routes.js'; // Correct import path

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Read swagger.json using fs
try {
  const swaggerPath = path.resolve('./swagger.json');
  const swaggerDocument = JSON.parse(fs.readFileSync(swaggerPath, 'utf8'));
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
} catch {
  console.log('Error reading swagger.json file');
}

// Mount alert routes under /api
app.use('/api', alertRoutes); // This will mount all routes in alertRoutes.js under /api

app.get('/', authRequest, (req, res) => {
  res.json({ message: 'Hello, world!' });
});

// Error handler middleware must be the last one
app.use(errorHandler);

export default app;
