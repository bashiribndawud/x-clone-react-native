import asyncHandler from 'express-async-handler';
import { getAuth } from '@clerk/express';

import Notification from '../models/notification.model.js';
import User from '../models/user.model.js';

export const getNotifications = asyncHandler(async (req, res) => {
    const { userId } = getAuth(req);
    const user = await User.findOne({ clerkId: userId });
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    const notifications = await Notification.find({ to: user._id })
        .sort({ createdAt: -1 })
        .populate('from', 'username firstName lastName profilePicture')
        .populate('post', 'content image')
        .populate('comment', 'content');
    res.status(200).json({ notifications });
});

export const deleteNotification = asyncHandler(async (req, res) => {
    const { notificationId } = req.params;
    const { userId } = getAuth(req);
    const user = await User.findOne({ clerkId: userId });
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    const notification = await Notification.findById(notificationId);
    if (!notification) {
        return res.status(404).json({ error: 'Notification not found' });
    }
    if (notification.to.toString() !== user._id.toString()) {
        return res.status(403).json({ error: 'You do not have permission to delete this notification' });
    }
    await Notification.findByIdAndDelete(notificationId);
    res.status(200).json({ message: 'Notification deleted successfully' });
});
