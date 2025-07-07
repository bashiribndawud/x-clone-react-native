import express from 'express';

const router = express.Router();

import {  getPosts, getPostById, getUserPosts, createPost, likePost, deletePost } from '../controller/post.controller.js';
import { protectRoutes } from '../middleware/auth.middleware.js';
import upload from "../middleware/upload.middleware.js"

//public routes
router.get('/', getPosts); // Route to get all posts
router.get('/:postId', getPostById); // Route to get a post by ID
router.get('/user/:username', getUserPosts); 

// protected routes
router.put('/create', protectRoutes, upload.single("image"), createPost); 
router.delete('/:postId/like', protectRoutes, likePost); 
router.delete('/:postId/delete', protectRoutes, deletePost); 

export default router;