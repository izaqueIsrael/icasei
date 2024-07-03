import axios from 'axios';
import { Video, YouTubeVideo } from '../models/models';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

const API_KEY = process.env.YOUTUBE_API_KEY;
const BASE_URL = process.env.YOUTUBE_URL;
const BACKEND_URL = `${process.env.BACK_URL}:${process.env.BACK_PORT}/${process.env.BACK_ROUTE}`;

class YouTubeService {
  public async getVideos(): Promise<Video[]> {
    const response = await axios.get(`${BASE_URL}/videos`, {
      params: {
        part: 'snippet',
        chart: 'mostPopular',
        key: API_KEY,
        maxResults: 50,
      },
    });
    return response.data.items;
  }

  public async searchVideos(query: string): Promise<Video[]> {
    const response = await axios.get(`${BASE_URL}/search`, {
      params: {
        part: 'snippet',
        q: query,
        key: API_KEY,
        maxResults: 50,
      },
    });
    return response.data.items;
  }

  public async addVideo(video: any): Promise<any> {
    const response = await axios.post(`${BACKEND_URL}/add`, video);
    return response.data;
  }

  public async removeVideo(id: string): Promise<any> {
    const response = await axios.delete(`${BACKEND_URL}/remove/${id}`);
    return response.data;
  }

  public async checkBookmarks(videoIds: string[]): Promise<string[]> {
    const response = await axios.post(`${BACKEND_URL}/bookmarks/check`, { videoIds });
    return response.data.bookmarkedVideos;
  }

  public async getAllFavorites(): Promise<YouTubeVideo[]> {
    const response = await axios.get(`${BACKEND_URL}/all`);
    return response.data;
  }

  public async getFavoriteCount(): Promise<number> {
    const response = await axios.get(`${BACKEND_URL}/favorites/count`);
    return response.data.count;
  }
}

export default new YouTubeService();
