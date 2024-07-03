import mongoose from 'mongoose';
import app from './app';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const PORT = process.env.BACK_PORT;
const MONGODB_URI = process.env.MONGO_URL || 'mongodb://localhost:27017/youtube-video-service';

mongoose.connect(MONGODB_URI, {}).then(() => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});
