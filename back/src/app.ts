// src/app.ts
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import videoRoutes from './routes/videoRoutes';

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  private config(): void {
    this.app.use(cors({
      origin: '*',
      methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization']
    }));
    this.app.use(bodyParser.json());
  }

  private routes(): void {
    this.app.use('/api/videos', videoRoutes);
  }
}

export default new App().app;
