import axios from 'axios';
import { YouTubeVideo } from '../types';

const BFF_URL = 'http://localhost:5000';

export const getVideos = async (): Promise<YouTubeVideo[]> => {
  const response = await axios.get(`${BFF_URL}/videos`);
  return response.data;
};

export const searchVideos = async (query: string): Promise<YouTubeVideo[]> => {
  const response = await axios.get(`${BFF_URL}/search`, { params: { query } });
  return response.data;
};

export const checkBookmarks = async (videoIds: string[]): Promise<string[]> => {
  const response = await axios.post(`${BFF_URL}/bookmarks/check`, { videoIds });
  return response.data.bookmarkedVideos;
};

export const addVideo = async (video: YouTubeVideo): Promise<YouTubeVideo> => {
  const response = await axios.post(`${BFF_URL}/add`, video);
  return response.data;
};

export const removeVideo = async (id: string): Promise<void> => {
  await axios.delete(`${BFF_URL}/remove/${id}`);
};

export const getAllFavorites = async (): Promise<YouTubeVideo[]> => {
  const response = await axios.get(`${BFF_URL}/favorites`);
  return response.data;
};