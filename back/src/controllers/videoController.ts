// src/controllers/videoController.ts
import { Request, Response } from 'express';
import VideoService from '../services/videoService';

class VideoController {
  public async addVideo(req: Request, res: Response) {
    console.log('Add video request body:', req.body);
    try {
      const video = await VideoService.addVideo(req.body);
      res.status(201).send(video);
    } catch (error) {
      console.error('Error adding video:', error);
      res.status(400).send(error);
    }
  }

  public async removeVideo(req: Request, res: Response) {
    try {
      console.log('Remove video request id:', req.params.id);
      const video = await VideoService.removeVideo(req.params.id);
      if (!video) {
        console.error('Video not found for id:', req.params.id);
        return res.status(404).send({ error: 'Video not found' });
      }
      res.send(video);
    } catch (error) {
      console.error('Error removing video:', error);
      res.status(500).send(error);
    }
  }

  public async checkBookmarks(req: Request, res: Response) {
    console.log('Check bookmarks request body:', req.body);
    try {
      const videoIds = req.body.videoIds;
      if (!Array.isArray(videoIds)) {
        return res.status(400).send({ error: 'videoIds deve ser um array' });
      }
      const bookmarkedVideos = await VideoService.checkBookmarks(videoIds);
      res.send({ bookmarkedVideos });
    } catch (error) {
      console.error('Error checking bookmarks:', error);
      res.status(500).send(error);
    }
  }

  public async getAllFavorites(req: Request, res: Response) {
    try {
      const videos = await VideoService.getAllFavorites();
      res.status(200).send(videos);
    } catch (error) {
      console.error('Error fetching all videos:', error);
      res.status(500).send(error);
    }
  }

  public async getFavoriteCount(req: Request, res: Response) {
    try {
      const count = await VideoService.getFavoriteCount();
      res.status(200).send({ count });
    } catch (error) {
      console.error('Error fetching favorite count:', error);
      res.status(500).send(error);
    }
  }
}

export default new VideoController();
