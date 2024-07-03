import axios from 'axios';

const BFF_URL = process.env.BFF_URL

export const getFavoriteCount = async (): Promise<number> => {
  try {
    const response = await axios.get(`${BFF_URL}/favorites/count`);
    return response.data.count;
  } catch (error) {
    console.error('Error fetching favorite count:', error);
    throw error;
  }
};
