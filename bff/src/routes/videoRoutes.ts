// src/routes/videoRoutes.ts
import { Router } from 'express';
import VideoController from '../controllers/videoController';

const router = Router();

router.get('/videos', VideoController.getVideos);
router.get('/search', VideoController.searchVideos);
router.post('/add', VideoController.addVideo);
router.delete('/remove/:id', VideoController.removeVideo);
router.post('/bookmarks/check', VideoController.checkBookmarks);
router.get('/favorites', VideoController.getAllFavorites);
router.get('/favorites/count', VideoController.getFavoriteCount);

export default router;
