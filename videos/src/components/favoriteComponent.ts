import { apiService } from '../utils/api';
import { renderVideos } from '../utils/renderVideo';

export default class FavoriteComponent {
  private updateFavoriteCount: () => void;

  constructor(updateFavoriteCount: () => void) {
    this.updateFavoriteCount = updateFavoriteCount;
  }

  public async fetchAndDisplayFavorites() {
    try {
      const videos = await apiService.getAllFavorites();
      const videoIds = videos.map(video => (typeof video.id === 'string' ? video.id : video.id.videoId)).filter(id => id);
      const bookmarkedVideoIds = await apiService.checkBookmarks(videoIds);
      renderVideos(videos, bookmarkedVideoIds, this.updateFavoriteCount);
    } catch (error) {
      console.error('Error fetching favorite videos:', error);
    }
  }
}
