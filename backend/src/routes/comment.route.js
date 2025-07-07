import express from 'express';

const router = express.Router();

import { getComments, createComment, deleteComment } from '../controller/comment.controller.js';
import { protectRoutes } from '../middleware/auth.middleware.js';

// Public routes
router.get('/:postId', getComments); // Route to get comments for a post

// Protected routes
router.post('/create', protectRoutes, createComment); // Route to create a comment
router.delete('/:commentId/delete', protectRoutes, deleteComment); // Route to delete a comment

export default router;