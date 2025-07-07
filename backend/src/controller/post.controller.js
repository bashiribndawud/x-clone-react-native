import asyncHandler from "express-async-handler";
import Post from "../models/post.model.js";
import { getAuth } from "@clerk/express";
import cloudinary from "../config/cloudinary.js";
import  Notification  from "../models/notification.model.js";
import Comment from "../models/comment.model.js";

export const getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find()
    .sort({ createdAt: -1 })
    .populate("user", "username firstName lastName profilePicture")
    .populate({
      path: "comments",
      populate: {
        path: "user",
        select: "username firstName lastName profilePicture",
      },
    });
  res.status(200).json({ posts });
});
export const getPostById = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  const post = await Post.findById(postId)
    .sort({ createdAt: -1 })
    .populate("user", "username firstName lastName profilePicture")
    .populate({
      path: "comments",
      populate: {
        path: "user",
        select: "username firstName lastName profilePicture",
      },
    });
  if (!post) return res.status(404).json({ error: "Post not found" });
  res.status(200).json({ post });
});

export const getUserPosts = asyncHandler(async (req, res) => {
  const { username } = req.params;
  const user = await User.findOne({ username });
  if (!user) return res.status(404).json({ error: "User not found" });

  const post = await Post.find({ user: user._id })
    .sort({ createdAt: -1 })
    .populate("user", "username firstName lastName profilePicture")
    .populate({
      path: "comments",
      populate: {
        path: "user",
        select: "username firstName lastName profilePicture",
      },
    });
  if (!post) return res.status(404).json({ error: "Post not found" });
  res.status(200).json({ post });
});

export const createPost = asyncHandler(async (req, res) => {
  const { userId } = getAuth(req);
  const { content } = req.body;
  const imageFile = req.file;

  if (!content || !imageFile) {
    return res
      .status(400)
      .json({ error: "Post must contain either text or image" });
  }

  const user = await User.findOne({ clerkId: userId });
  if (!user) return res.status(404).json({ error: "User not found" });

  let imageUrl = "";

  if (imageFile) {
    //convert image to base64
    try {
      const base64Image = `data:${
        imageFile.mimetype
      };base64,${imageFile.buffer.toString("base64")}`;

      const uploadResponse = await cloudinary.uploader.upload(base64Image, {
        folder: "x-clone-react-native",
        resource_type: "image",
        transformation: [
          { width: 800, height: 600, crop: "limit" },
          { quality: "auto" },
          { format: "auto" },
        ],
      });
      imageUrl = uploadResponse.secure_url;
    } catch (error) {
      console.error("Error uploading image to Cloudinary:", error);
      return res.status(500).json({ error: "Failed to upload image" });
    }
  }

  const post = await Post.create({
    user: req.user._id,
    content: content || "",
    image: imageUrl,
  });

  res.status(201).json({ post });
});

export const likePost = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  const { userId } = getAuth(req);

  const post = await Post.findById(postId);
  const user = await User.findOne({ clerkId: userId });
  if (!post || !user)
    return res.status(404).json({ error: "User or Post not found" });

  const isLiked = post.likes.includes(userId._id);

  if (isLiked) {
    //unlike the post
    await Post.findByIdAndUpdate(postId, {
      $pull: { likes: userId._id },
    });
  } else {
    //like the post
    await Post.findByIdAndUpdate(postId, {
      $push: { likes: userId._id },
    });
  }
  if (post.user.toString() !== user._id.toString()) {
    //create notification for the post owner
    await Notification .create({
      user: post.user,
      type: "like",
      message: `${user.firstName} ${user.lastName} liked your post`,
      post: post._id,
    });
  }
  res.status(200).json({ message: isLiked ? "Post unliked successfully" : "Post liked successfully" });
});

export const deletePost = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  const { userId } = getAuth(req);

  const post = await Post.findById(postId);
  const user = await User.findOne({clerkId: userId});

  if (!post || !user) return res.status(404).json({ error: "Post or User not found" });

  if (post.user.toString() !== user._id.toString()) {
    return res.status(403).json({ error: "You can only delete your post" });
  }

  // delete all comments associated with the post
  await Comment.deleteMany({ post: postId });

  await Post.findByIdAndDelete(postId);
  res.status(200).json({ message: "Post deleted successfully" });
});
