import request from 'supertest';
import app from '../app';
import YouTubeService from '../services/youtubeService';
import { exampleVideo } from '../__mocks__/exampleVideo';

jest.mock('../services/youtubeService');

describe('VideoController', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should get videos', async () => {
    const mockGetVideos = jest.spyOn(YouTubeService, 'getVideos').mockResolvedValue([exampleVideo]);

    const response = await request(app).get('/videos').expect(200);
    expect(response.body).toEqual([exampleVideo]);
    expect(mockGetVideos).toHaveBeenCalled();
  });

  it('should search videos', async () => {
    const mockSearchVideos = jest.spyOn(YouTubeService, 'searchVideos').mockResolvedValue([exampleVideo]);

    const response = await request(app).get('/search?query=test').expect(200);
    expect(response.body).toEqual([exampleVideo]);
    expect(mockSearchVideos).toHaveBeenCalled();
  });

  it('should add a video', async () => {
    const mockAddVideo = jest.spyOn(YouTubeService, 'addVideo').mockResolvedValue(exampleVideo);

    const response = await request(app)
      .post('/add')
      .send(exampleVideo)
      .expect(201);

    expect(response.body).toEqual(exampleVideo);
    expect(mockAddVideo).toHaveBeenCalled();
  });

  it('should remove a video', async () => {
    const mockRemoveVideo = jest.spyOn(YouTubeService, 'removeVideo').mockResolvedValue(exampleVideo);

    const response = await request(app)
      .delete(`/remove/${exampleVideo.id}`)
      .expect(200);

    expect(response.body).toEqual(exampleVideo);
    expect(mockRemoveVideo).toHaveBeenCalled();
  });

  it('should check bookmarks', async () => {
    const mockCheckBookmarks = jest.spyOn(YouTubeService, 'checkBookmarks').mockResolvedValue([exampleVideo.id]);

    const response = await request(app)
      .post('/bookmarks/check')
      .send({ videoIds: [exampleVideo.id] })
      .expect(200);

    expect(response.body.bookmarkedVideos).toEqual([exampleVideo.id]);
    expect(mockCheckBookmarks).toHaveBeenCalled();
  });

  it('should get all favorites', async () => {
    const mockGetAllFavorites = jest.spyOn(YouTubeService, 'getAllFavorites').mockResolvedValue([exampleVideo]);

    const response = await request(app).get('/favorites').expect(200);
    expect(response.body).toEqual([exampleVideo]);
    expect(mockGetAllFavorites).toHaveBeenCalled();
  });

  it('should get favorite count', async () => {
    const mockGetFavoriteCount = jest.spyOn(YouTubeService, 'getFavoriteCount').mockResolvedValue(5);

    const response = await request(app).get('/favorites/count').expect(200);
    expect(response.body.count).toBe(5);
    expect(mockGetFavoriteCount).toHaveBeenCalled();
  });
});
