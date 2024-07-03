import axios from 'axios';
import { YouTubeVideo } from '../types';

const BFF_URL = process.env.BFF_URL;
const BFF_PORT = process.env.BFF_PORT;

class ApiService {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  public async getVideos(): Promise<YouTubeVideo[]> {
    const response = await axios.get(`${this.baseUrl}/videos`);
    return response.data;
  }

  public async searchVideos(query: string): Promise<YouTubeVideo[]> {
    const response = await axios.get(`${this.baseUrl}/search`, { params: { query } });
    return response.data;
  }

  public async checkBookmarks(videoIds: string[]): Promise<string[]> {
    const response = await axios.post(`${this.baseUrl}/bookmarks/check`, { videoIds });
    return response.data.bookmarkedVideos;
  }

  public async addVideo(video: YouTubeVideo): Promise<YouTubeVideo> {
    const response = await axios.post(`${this.baseUrl}/add`, video);
    return response.data;
  }

  public async removeVideo(id: string): Promise<void> {
    await axios.delete(`${this.baseUrl}/remove/${id}`);
  }

  public async getAllFavorites(): Promise<YouTubeVideo[]> {
    const response = await axios.get(`${this.baseUrl}/favorites`);
    return response.data;
  }

  public async getFavoriteCount(): Promise<number> {
    const response = await axios.get(`${this.baseUrl}/favorites/count`);
    return response.data.count;
  }
}

export const apiService = new ApiService(`${BFF_URL}:${BFF_PORT}`);
