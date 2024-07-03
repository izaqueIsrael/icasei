import { Request, Response } from 'express';
import YouTubeService from '../services/youtubeService';

class VideoController {
  public async getVideos(req: Request, res: Response): Promise<void> {
    try {
      const videos = await YouTubeService.getVideos();
      res.json(videos);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  public async searchVideos(req: Request, res: Response): Promise<void> {
    const { query } = req.query;
    try {
      const videos = await YouTubeService.searchVideos(query as string);
      res.json(videos);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  public async addVideo(req: Request, res: Response): Promise<void> {
    try {
      const video = await YouTubeService.addVideo(req.body);
      res.status(201).json(video);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  public async removeVideo(req: Request, res: Response): Promise<void> {
    try {
      const video = await YouTubeService.removeVideo(req.params.id);
      res.json(video);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  public async checkBookmarks(req: Request, res: Response): Promise<void> {
    const { videoIds } = req.body;
    if (!Array.isArray(videoIds)) {
      res.status(400).json({ error: 'videoIds must be an array' });
      return;
    }
    try {
      const bookmarkedVideos = await YouTubeService.checkBookmarks(videoIds);
      res.json({ bookmarkedVideos });
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  public async getAllFavorites(req: Request, res: Response): Promise<void> {
    try {
      const favorites = await YouTubeService.getAllFavorites();
      res.json(favorites);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  public async getFavoriteCount(req: Request, res: Response): Promise<void> {
    try {
      const count = await YouTubeService.getFavoriteCount();
      res.json({ count });
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }
}

export default new VideoController();
