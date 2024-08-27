import cors from 'cors';
import express from 'express';
import userRoutes from './routes/user-route.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', userRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Hello, world!' });
});

export default app;
