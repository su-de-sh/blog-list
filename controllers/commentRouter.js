const Comment = require("../models/commentSchema");

const commentRouter = require("express").Router();

commentRouter.get("/:id/comments", async (req, res, next) => {
  const comments = await Comment.find();
  res.send(comments);
});

commentRouter.post("/:id/comments", async (req, res, next) => {
  const comment = new Comment({
    comment: req.body.comment,
  });

  const newComment = await comment.save();
  res.send(newComment);
});

module.exports = commentRouter;
