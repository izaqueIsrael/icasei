import request from 'supertest';
import app from '../app';
import mongoose from 'mongoose';
import { YouTubeVideoModel } from '../models/YoutubeVideo';
import { exampleVideo } from '../__mocks__/exampleVideo';

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
