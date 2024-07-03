import { apiService } from '../utils/api';
import { renderVideos } from '../utils/renderVideo';
import VideoComponent from '../components/videoComponent';

jest.mock('../utils/api');
jest.mock('../utils/renderVideo');

describe('VideoComponent', () => {
  let videoComponent: VideoComponent;
  const updateFavoriteCountMock = jest.fn();

  beforeEach(() => {
    videoComponent = new VideoComponent(updateFavoriteCountMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch and display videos', async () => {
    const mockVideos = [
      { id: '1', snippet: { title: 'Video 1', thumbnails: { medium: { url: 'thumbnail1.jpg' } } } },
      { id: '2', snippet: { title: 'Video 2', thumbnails: { medium: { url: 'thumbnail2.jpg' } } } }
    ];
    (apiService.getVideos as jest.Mock).mockResolvedValue(mockVideos);
    (apiService.checkBookmarks as jest.Mock).mockResolvedValue(['1']);

    await videoComponent.fetchAndDisplayVideos();

    expect(apiService.getVideos).toHaveBeenCalledTimes(1);
    expect(apiService.checkBookmarks).toHaveBeenCalledTimes(1);
    expect(renderVideos).toHaveBeenCalledWith(mockVideos, ['1'], updateFavoriteCountMock);
  });

  it('should search and display videos', async () => {
    const mockVideos = [
      { id: '1', snippet: { title: 'Video 1', thumbnails: { medium: { url: 'thumbnail1.jpg' } } } },
      { id: '2', snippet: { title: 'Video 2', thumbnails: { medium: { url: 'thumbnail2.jpg' } } } }
    ];
    (apiService.searchVideos as jest.Mock).mockResolvedValue(mockVideos);
    (apiService.checkBookmarks as jest.Mock).mockResolvedValue(['1']);

    await videoComponent.fetchAndDisplaySearchedVideos('test');

    expect(apiService.searchVideos).toHaveBeenCalledWith('test');
    expect(apiService.checkBookmarks).toHaveBeenCalledTimes(1);
    expect(renderVideos).toHaveBeenCalledWith(mockVideos, ['1'], updateFavoriteCountMock);
  });

  it('should handle API error gracefully', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    (apiService.getVideos as jest.Mock).mockRejectedValue(new Error('API error'));

    await videoComponent.fetchAndDisplayVideos();

    expect(consoleErrorSpy).toHaveBeenCalledWith('Error fetching videos:', expect.any(Error));
    consoleErrorSpy.mockRestore();
  });
});
