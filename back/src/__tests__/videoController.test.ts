import request from 'supertest';
import app from '../app';
import mongoose from 'mongoose';
import { YouTubeVideoModel } from '../models/YoutubeVideo';

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
  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should add a new video', async () => {
    const response = await request(app)
      .post('/api/videos/add')
      .send(exampleVideo)
      .expect(201);

    expect(response.body.snippet.title).toBe(exampleVideo.snippet.title);
  });

  it('should remove a video', async () => {
    const video = new YouTubeVideoModel(exampleVideo);
    await video.save();

    const response = await request(app)
      .delete(`/api/videos/remove/${video.id}`)
      .expect(200);

    expect(response.body.id).toBe(exampleVideo.id);
  });

  it('should check bookmarks', async () => {
    const video = new YouTubeVideoModel(exampleVideo);
    await video.save();

    const response = await request(app)
      .post('/api/videos/bookmarks/check')
      .send({ videoIds: [exampleVideo.id] })
      .expect(200);

    expect(response.body.bookmarkedVideos).toContain(exampleVideo.id);
  });

  it('should get all favorites', async () => {
    const response = await request(app)
      .get('/api/videos/all')
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should get favorite count', async () => {
    const response = await request(app)
      .get('/api/videos/favorites/count')
      .expect(200);

    expect(response.body.count).toBeDefined();
  });
});
