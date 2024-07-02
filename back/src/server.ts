import mongoose from 'mongoose';
import app from './app';

const PORT = process.env.PORT || 4000;
const MONGODB_URI ='mongodb://localhost:27017/youtube-video-service';


mongoose.connect(MONGODB_URI, {}).then(() => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});
