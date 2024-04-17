import { Comment } from "../models/comment-models.js";

export const getAllComment = async (req, res) => {
  try {
    const comments = await Comment.find();

    const formattedResults = comments.map((comment) => ({
      name: comment.name,
      comment: comment.comment,
      createdOn: comment.createdOn,
      CommentId: comment.CommentId,
      id: comment.id,
    }));
    res.status(200).json({ results: formattedResults });
  } catch (error) {
    console.error("Error in getAllComment:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const createComment = async (req, res) => {
  try {
    const { name, id, comment, CommentId } = req.body;

    const user = await Comment.create({
      id: req.user.user_id,
      name: req.user.email,
      comment: comment,
      CommentId: CommentId,
    });
    if (user) {
      res.status(200).json({ data: user, message: "success" });
    }
  } catch (err) {
    res.status(400).json({ message: err });
  }
};
export const deleteComment = async (req, res) => {
  // console.log(req);
  const commentId = req.params.CommentId;

  try {
    const quizExists = await Comment.findOne({ CommentId: commentId });

    if (!quizExists) {
      return res
        .status(404)
        .json({ success: false, message: "Comment not found" });
    }
    const result = await Comment.deleteOne({ CommentId: commentId });
    if (result.deletedCount > 0) {
      res.json({ success: true, message: "Comment delete success" });
    } else {
      res.status(404).json({
        success: false,
        message: "No comment found or unable to delete",
      });
    }
  } catch (error) {
    console.error("Error deleting comment:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
