// src/routes/videoRoutes.ts
import { Router } from 'express';
import VideoController from '../controllers/videoController';

const router = Router();

router.post('/add', VideoController.addVideo);
router.delete('/remove/:id', VideoController.removeVideo);
router.post('/bookmarks/check', VideoController.checkBookmarks);
router.get('/all', VideoController.getAllFavorites);
router.get('/favorites/count', VideoController.getFavoriteCount);

export default router;
