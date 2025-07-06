import express from "express";
import {
  followUser,
  getCurrentUser,
  getUserProfile,
  syncUser,
  updateProfile,
} from "../controller/user.controller.js";
import { protectRoutes } from "../middleware/auth.middleware.js";

const router = express.Router();

//public routes
router.get("/profile/:username", getUserProfile);

//protected routes
router.get("/sync", protectRoutes, syncUser);
router.get("/me", protectRoutes, getCurrentUser);
router.get("/profile", protectRoutes, updateProfile);
router.get("/follow/:targetUserId", protectRoutes, followUser);

export default router;
