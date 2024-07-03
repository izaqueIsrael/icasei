import axios from 'axios';
import { apiService } from '../utils/api';
import { YouTubeVideo } from '../types';

jest.mock('axios');

const exampleVideo: YouTubeVideo = {
  kind: "youtube#video",
  etag: "vIpMQIZ2J7rEcuD7asLQhBXKjl8",
  id: "X0HIrS6kUYI",
  snippet: {
    publishedAt: "2024-07-01T23:37:03Z",
    channelId: "UCfM3zsQsOnfWNUppiycmBuw",
    title: "Eminem - The Death of Slim Shady [Album Trailer]",
    description: "THE DEATH OF SLIM SHADY (COUP DE GRÂCE) ☠️ 7/12!!!\n\nhttp://eminem.com\nhttp://facebook.com/eminem\nhttp://twitter.com/eminem\nhttp://instagram.com/eminem\n\nhttp://shadyrecords.com\nhttp://facebook.com/shadyrecords\nhttp://twitter.com/shadyrecords\nhttp://instagram.com/shadyrecords\n\n#Eminem #thedeathofslimshady",
    thumbnails: {
      default: {
        url: "https://i.ytimg.com/vi/X0HIrS6kUYI/default.jpg",
        width: 120,
        height: 90
      },
      medium: {
        url: "https://i.ytimg.com/vi/X0HIrS6kUYI/mqdefault.jpg",
        width: 320,
        height: 180
      },
      high: {
        url: "https://i.ytimg.com/vi/X0HIrS6kUYI/hqdefault.jpg",
        width: 480,
        height: 360
      },
      standard: {
        url: "https://i.ytimg.com/vi/X0HIrS6kUYI/sddefault.jpg",
        width: 640,
        height: 480
      },
      maxres: {
        url: "https://i.ytimg.com/vi/X0HIrS6kUYI/maxresdefault.jpg",
        width: 1280,
        height: 720
      }
    },
    channelTitle: "EminemMusic",
    categoryId: "10",
    liveBroadcastContent: "none",
    localized: {
      title: "Eminem - The Death of Slim Shady [Album Trailer]",
      description: "THE DEATH OF SLIM SHADY (COUP DE GRÂCE) ☠️ 7/12!!!\n\nhttp://eminem.com\nhttp://facebook.com/eminem\nhttp://twitter.com/eminem\nhttp://instagram.com/eminem\n\nhttp://shadyrecords.com\nhttp://facebook.com/shadyrecords\nhttp://twitter.com/shadyrecords\nhttp://instagram.com/shadyrecords\n\n#Eminem #thedeathofslimshady"
    }
  }
};

describe('ApiService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch videos', async () => {
    const mockVideos: YouTubeVideo[] = [exampleVideo];
    (axios.get as jest.Mock).mockResolvedValue({ data: mockVideos });

    const videos = await apiService.getVideos();

    expect(videos).toEqual(mockVideos);
    expect(axios.get).toHaveBeenCalledWith('http://localhost:5000/videos');
  });

  it('should search videos', async () => {
    const mockVideos: YouTubeVideo[] = [exampleVideo];
    (axios.get as jest.Mock).mockResolvedValue({ data: mockVideos });

    const videos = await apiService.searchVideos('test');

    expect(videos).toEqual(mockVideos);
    expect(axios.get).toHaveBeenCalledWith('http://localhost:5000/search', { params: { query: 'test' } });
  });

  it('should check bookmarks', async () => {
    const mockBookmarkedVideoIds = ['X0HIrS6kUYI'];
    (axios.post as jest.Mock).mockResolvedValue({ data: { bookmarkedVideos: mockBookmarkedVideoIds } });

    const bookmarkedVideoIds = await apiService.checkBookmarks(['X0HIrS6kUYI', 'anotherId']);

    expect(bookmarkedVideoIds).toEqual(mockBookmarkedVideoIds);
    expect(axios.post).toHaveBeenCalledWith('http://localhost:5000/bookmarks/check', { videoIds: ['X0HIrS6kUYI', 'anotherId'] });
  });

  it('should add a video', async () => {
    (axios.post as jest.Mock).mockResolvedValue({ data: exampleVideo });

    const addedVideo = await apiService.addVideo(exampleVideo);

    expect(addedVideo).toEqual(exampleVideo);
    expect(axios.post).toHaveBeenCalledWith('http://localhost:5000/add', exampleVideo);
  });

  it('should remove a video', async () => {
    (axios.delete as jest.Mock).mockResolvedValue({});

    await apiService.removeVideo('X0HIrS6kUYI');

    expect(axios.delete).toHaveBeenCalledWith('http://localhost:5000/remove/X0HIrS6kUYI');
  });

  it('should fetch all favorite videos', async () => {
    const mockFavorites: YouTubeVideo[] = [exampleVideo];
    (axios.get as jest.Mock).mockResolvedValue({ data: mockFavorites });

    const favorites = await apiService.getAllFavorites();

    expect(favorites).toEqual(mockFavorites);
    expect(axios.get).toHaveBeenCalledWith('http://localhost:5000/favorites');
  });

  it('should fetch favorite count', async () => {
    const mockCount = 5;
    (axios.get as jest.Mock).mockResolvedValue({ data: { count: mockCount } });

    const count = await apiService.getFavoriteCount();

    expect(count).toEqual(mockCount);
    expect(axios.get).toHaveBeenCalledWith('http://localhost:5000/favorites/count');
  });
});
