import { apiService } from '../utils/api';
import { renderVideos } from '../utils/renderVideo';

export default class VideoComponent {
  private updateFavoriteCount: () => void;

  constructor(updateFavoriteCount: () => void) {
    this.updateFavoriteCount = updateFavoriteCount;
  }

  public async fetchAndDisplayVideos() {
    try {
      const videos = await apiService.getVideos();
      const videoIds = videos.map(video => (typeof video.id === 'string' ? video.id : video.id.videoId)).filter(id => id);
      const bookmarkedVideoIds = await apiService.checkBookmarks(videoIds);
      renderVideos(videos, bookmarkedVideoIds, this.updateFavoriteCount);
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  }

  public async fetchAndDisplaySearchedVideos(query: string) {
    try {
      const videos = await apiService.searchVideos(query);
      const videoIds = videos.map(video => (typeof video.id === 'string' ? video.id : video.id.videoId)).filter(id => id);
      const bookmarkedVideoIds = await apiService.checkBookmarks(videoIds);
      renderVideos(videos, bookmarkedVideoIds, this.updateFavoriteCount);
    } catch (error) {
      console.error('Error searching videos:', error);
    }
  }
}
