import dotenv from 'dotenv';
import path from 'path';
import app from './app';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const PORT = process.env.BFF_PORT || 5000;

app.listen(PORT, () => {
  console.log(`BFF running on port ${PORT}`);
});
