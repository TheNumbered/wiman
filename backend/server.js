import dotenv from 'dotenv';
import process from 'process';
import app from './app.js';
dotenv.config({ path: '.env.local' });
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});
