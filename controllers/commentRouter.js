const Comment = require("../models/commentSchema");

const commentRouter = require("express").Router();

commentRouter.get("/:id/comments", async (req, res, next) => {
  try {
    const comments = await Comment.find({ blog_id: req.params.id });

    res.send(comments);
  } catch (err) {
    next(err);
  }
});

commentRouter.post("/:id/comments", async (req, res, next) => {
  try {
    const comment = new Comment({
      comment: req.body.comment,
      blog_id: req.params.id,
    });

    const newComment = await comment.save();
    res.send(newComment);
  } catch (err) {
    next(err);
  }
});

module.exports = commentRouter;
