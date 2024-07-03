// src/services/youtubeService.ts
import axios from 'axios';
import { Video, YouTubeVideo } from '../models/models';

const API_KEY = ''; // Substitua com sua chave de API do YouTube
const BASE_URL = 'https://www.googleapis.com/youtube/v3';
const BACKEND_URL = 'http://localhost:4000/api/videos';

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
