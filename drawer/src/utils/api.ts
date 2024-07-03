import axios from 'axios';

const BFF_URL = 'http://localhost:5000'; // URL do BFF

export const getFavoriteCount = async (): Promise<number> => {
  try {
    const response = await axios.get(`${BFF_URL}/favorites/count`);
    return response.data.count;
  } catch (error) {
    console.error('Error fetching favorite count:', error);
    throw error;
  }
};
