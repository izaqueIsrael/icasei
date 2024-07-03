import { apiService } from '../utils/api';
import { renderVideos } from '../utils/renderVideo';
import FavoriteComponent from '../components/favoriteComponent';

jest.mock('../utils/api');
jest.mock('../utils/renderVideo');

describe('FavoriteComponent', () => {
  let favoriteComponent: FavoriteComponent;
  const updateFavoriteCountMock = jest.fn();

  beforeEach(() => {
    favoriteComponent = new FavoriteComponent(updateFavoriteCountMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch and display favorite videos', async () => {
    const mockVideos = [
      { id: '1', snippet: { title: 'Video 1', thumbnails: { medium: { url: 'thumbnail1.jpg' } } } },
      { id: '2', snippet: { title: 'Video 2', thumbnails: { medium: { url: 'thumbnail2.jpg' } } } }
    ];
    (apiService.getAllFavorites as jest.Mock).mockResolvedValue(mockVideos);
    (apiService.checkBookmarks as jest.Mock).mockResolvedValue(['1']);

    await favoriteComponent.fetchAndDisplayFavorites();

    expect(apiService.getAllFavorites).toHaveBeenCalledTimes(1);
    expect(apiService.checkBookmarks).toHaveBeenCalledTimes(1);
    expect(renderVideos).toHaveBeenCalledWith(mockVideos, ['1'], updateFavoriteCountMock);
  });

  it('should handle API error gracefully', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    (apiService.getAllFavorites as jest.Mock).mockRejectedValue(new Error('API error'));

    await favoriteComponent.fetchAndDisplayFavorites();

    expect(consoleErrorSpy).toHaveBeenCalledWith('Error fetching favorite videos:', expect.any(Error));
    consoleErrorSpy.mockRestore();
  });
});
