import express from 'express';
import { protectRoutes } from '../middleware/auth.middleware.js';
import { getNotifications, deleteNotification } from '../controller/notification.controller.js';
const router = express.Router();

router.get("/", protectRoutes, getNotifications);
router.delete("/:notificationId", protectRoutes, deleteNotification);

export default router;