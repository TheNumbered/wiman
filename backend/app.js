import cors from 'cors';
import express from 'express';
import fs from 'fs';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import { authRequest } from './middlewares/auth.js';
import errorHandler from './middlewares/error-handler.js';
import issueReportRoutes from './routes/issue-report-route.js';
import userRoutes from './routes/user-route.js';

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

app.use('/api', userRoutes);
app.use('/api', issueReportRoutes);

app.get('/', authRequest, (req, res) => {
  res.json({ message: 'Hello, world!' });
});

// Error handler middleware must be the last one
app.use(errorHandler);

export default app;
