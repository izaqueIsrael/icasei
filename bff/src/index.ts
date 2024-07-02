import express from 'express';
import cors from 'cors';
import YouTubeService from './youtubeService';

const app = express();

// Configuração de CORS
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

app.get('/videos', async (req, res) => {
  try {
    const videos = await YouTubeService.getVideos();
    res.json(videos);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

app.get('/search', async (req, res) => {
  const { query } = req.query;
  try {
    const videos = await YouTubeService.searchVideos(query as string);
    res.json(videos);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

app.post('/add', async (req, res) => {
  try {
    const video = await YouTubeService.addVideo(req.body);
    res.status(201).json(video);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

app.delete('/remove/:id', async (req, res) => {
  try {
    const video = await YouTubeService.removeVideo(req.params.id);
    res.json(video);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

app.post('/bookmarks/check', async (req, res) => {
  const { videoIds } = req.body;
  if (!Array.isArray(videoIds)) {
    return res.status(400).json({ error: 'videoIds must be an array' });
  }
  try {
    const bookmarkedVideos = await YouTubeService.checkBookmarks(videoIds);
    res.json({ bookmarkedVideos });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

app.get('/favorites', async (req, res) => {
  try {
    const favorites = await YouTubeService.getAllFavorites();
    res.json(favorites);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

app.get('/favorites/count', async (req, res) => {
  try {
    const count = await YouTubeService.getFavoriteCount();
    res.json({ count });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`BFF running on port ${PORT}`);
});
