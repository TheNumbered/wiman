import cors from 'cors';
import express from 'express';
import fs from 'fs';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import userRoutes from './routes/user-route.js';

const app = express();
app.use(cors());
app.use(express.json());

// Read swagger.json using fs
try {
  const swaggerPath = path.resolve('./swagger.json');
  const swaggerDocument = JSON.parse(fs.readFileSync(swaggerPath, 'utf8'));
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
} catch {
  console.log('Error reading swagger.json file');
}

app.use('/api', userRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Hello, world!' });
});

export default app;
