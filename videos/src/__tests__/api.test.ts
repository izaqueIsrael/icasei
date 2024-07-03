import axios from 'axios';
import { apiService } from '../utils/api';
import { YouTubeVideo } from '../types';
import dotenv from 'dotenv';
import { exampleVideo } from '../__mocks__/exampleVideo';

dotenv.config();

jest.mock('axios');

const BFF_URL = process.env.BFF_URL;
const BFF_PORT = process.env.BFF_PORT;

const baseUrl = `${BFF_URL}:${BFF_PORT}`;

describe('ApiService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch videos', async () => {
    const mockVideos: YouTubeVideo[] = [exampleVideo];
    (axios.get as jest.Mock).mockResolvedValue({ data: mockVideos });

    const videos = await apiService.getVideos();

    expect(videos).toEqual(mockVideos);
    expect(axios.get).toHaveBeenCalledWith(`${baseUrl}/videos`);
  });

  it('should search videos', async () => {
    const mockVideos: YouTubeVideo[] = [exampleVideo];
    (axios.get as jest.Mock).mockResolvedValue({ data: mockVideos });

    const videos = await apiService.searchVideos('test');

    expect(videos).toEqual(mockVideos);
    expect(axios.get).toHaveBeenCalledWith(`${baseUrl}/search`, { params: { query: 'test' } });
  });

  it('should check bookmarks', async () => {
    const mockBookmarkedVideoIds = ['X0HIrS6kUYI'];
    (axios.post as jest.Mock).mockResolvedValue({ data: { bookmarkedVideos: mockBookmarkedVideoIds } });

    const bookmarkedVideoIds = await apiService.checkBookmarks(['X0HIrS6kUYI', 'anotherId']);

    expect(bookmarkedVideoIds).toEqual(mockBookmarkedVideoIds);
    expect(axios.post).toHaveBeenCalledWith(`${baseUrl}/bookmarks/check`, { videoIds: ['X0HIrS6kUYI', 'anotherId'] });
  });

  it('should add a video', async () => {
    (axios.post as jest.Mock).mockResolvedValue({ data: exampleVideo });

    const addedVideo = await apiService.addVideo(exampleVideo);

    expect(addedVideo).toEqual(exampleVideo);
    expect(axios.post).toHaveBeenCalledWith(`${baseUrl}/add`, exampleVideo);
  });

  it('should remove a video', async () => {
    (axios.delete as jest.Mock).mockResolvedValue({});

    await apiService.removeVideo('X0HIrS6kUYI');

    expect(axios.delete).toHaveBeenCalledWith(`${baseUrl}/remove/X0HIrS6kUYI`);
  });

  it('should fetch all favorite videos', async () => {
    const mockFavorites: YouTubeVideo[] = [exampleVideo];
    (axios.get as jest.Mock).mockResolvedValue({ data: mockFavorites });

    const favorites = await apiService.getAllFavorites();

    expect(favorites).toEqual(mockFavorites);
    expect(axios.get).toHaveBeenCalledWith(`${baseUrl}/favorites`);
  });

  it('should fetch favorite count', async () => {
    const mockCount = 5;
    (axios.get as jest.Mock).mockResolvedValue({ data: { count: mockCount } });

    const count = await apiService.getFavoriteCount();

    expect(count).toEqual(mockCount);
    expect(axios.get).toHaveBeenCalledWith(`${baseUrl}/favorites/count`);
  });
});
