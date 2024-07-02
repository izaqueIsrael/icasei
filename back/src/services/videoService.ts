// src/services/videoService.ts
import { YouTubeVideoModel } from '../models/YoutubeVideo';

class VideoService {
  public async addVideo(videoData: any) {
    // Adicionar campos ausentes com valores padrão
    videoData.snippet.categoryId = videoData.snippet.categoryId || 'unknown';
    videoData.snippet.localized = videoData.snippet.localized || {};
    videoData.snippet.localized.title = videoData.snippet.localized.title || videoData.snippet.title;
    videoData.snippet.localized.description = videoData.snippet.localized.description || videoData.snippet.description;

    const video = new YouTubeVideoModel(videoData);
    return await video.save();
  }

  public async removeVideo(id: string) {
    return await YouTubeVideoModel.findOneAndDelete({ 
      $or: [
        { 'id.videoId': id },
        { 'id': id }
      ] 
    });
  }

  public async checkBookmarks(videoIds: string[]) {
    const videos = await YouTubeVideoModel.find({
      $or: [
        { 'id.videoId': { $in: videoIds } },
        { 'id': { $in: videoIds } }
      ]
    });
    return videos.map(video => (typeof video.id === 'string' ? video.id : video.id.videoId));
  }

  public async getAllFavorites() {
    return await YouTubeVideoModel.find({});
  }

  public async getFavoriteCount() {
    return await YouTubeVideoModel.countDocuments({});
  }
}

export default new VideoService();
