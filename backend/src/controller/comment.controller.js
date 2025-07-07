import asyncHandler from "express-async-handler";

export const getComments = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  const comments = await Comment.find({ post: postId })
    .sort({ createdAt: -1 })
    .populate("user", "username firstName lastName profilePicture");
  if (!comments)
    return res.status(404).json({ error: "No comments found for this post" });

  res.status(200).json({ comments });
});

export const createComment = asyncHandler(async (req, res) => {
  const { postId } = req.body;
  const { userId } = getAuth(req);
  const { content } = req.body;

  if (!content || content.trim() === "") {
    return res.status(400).json({ error: "Comment content is required" });
  }

  const user = await User.findOne({ clerkId: userId });
  const post = await Post.findById(postId);
  if (!user || !post) {
    return res.status(404).json({ error: "User or Post not found" });
  }

  const comment = await Comment.create({
    user: user._id,
    post: postId,
    content,
  });

  // Add comment to post's comments array
  await Post.findByIdAndUpdate(postId, {
    $push: { comments: comment._id },
  });

  //create notification if the comment is not by the post owner
  if (post.user.toString() !== user._id.toString()) {
    await Notification.create({
      from: user._id,
      to: post.user,
      type: "comment",
      post: postId,
      comment: comment._id,
    });
  }

  res.status(201).json({ comment });
});

export const deleteComment = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  const { userId } = getAuth(req);

  const comment = await Comment.findById(commentId);
  if (!comment) {
    return res.status(404).json({ error: "Comment not found" });
  }
  if (comment.user.toString() !== userId) {
    return res
      .status(403)
      .json({ error: "You are not authorized to delete this comment" });
  }
  await Comment.findByIdAndDelete(commentId);
  // Remove comment from post's comments array
  await Post.findByIdAndUpdate(comment.post, {
    $pull: { comments: commentId },
  });
  res.status(200).json({ message: "Comment deleted successfully" });
});
