// src/app.ts
import express from 'express';
import cors from 'cors';
import videoRoutes from './routes/videoRoutes';

const app = express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(videoRoutes);

export default app;