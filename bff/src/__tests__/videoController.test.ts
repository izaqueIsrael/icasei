import request from 'supertest';
import app from '../app';
import YouTubeService from '../services/youtubeService';

jest.mock('../services/youtubeService');

const exampleVideo = {
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
