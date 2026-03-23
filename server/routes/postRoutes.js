import express from 'express';
import { createPost, getPosts, toggleLike } from '../controllers/postController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getPosts);
router.post('/', protect, createPost);
router.patch('/:id/like', protect, toggleLike);

export default router;
