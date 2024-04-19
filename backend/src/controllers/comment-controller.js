import { NewsModel } from "../models/news-models.js";

export const createComment = async (req, res) => {
  try {
    const { comment, email } = req.body;

    const article = await NewsModel.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ status: "failed", message: "Article not found" });
    }

    // Create a new comment
    const newComment = { comment, email };
    article.Comments.push(newComment);

    // Save the updated article back to the database
    const updatedArticle = await article.save();
    res.status(200).json({ status: "success", newComment, updatedArticle });
  } catch (err) {
    console.log("error", err);
    res.status(400).json({ status: "failed", message: err });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const { articleID } = req.query;

    const article = await NewsModel.findById(articleID);
    if (!article) {
      return res.status(404).json({ status: "failed", message: "Article not found" });
    }

    const filteredComments = article.Comments.filter((comment) => comment.CommentId !== req.params.CommentId);

    article.Comments = filteredComments;
    await article.save();

    res.status(200).json({ status: "success", message: "Comment has been deleted", filteredComments });
  } catch (error) {
    console.log("Error deleting comment:", error);
    res.status(500).json({ status: "failed", message: error });
  }
};
