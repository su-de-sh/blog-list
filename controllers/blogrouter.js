const blogRouter = require("express").Router();
const Blog = require("../models/blog");

blogRouter.get("/", (req, res) => {
  Blog.find().then((data) => res.status(200).json(data));
});

blogRouter.post("/", (req, res) => {
  if (req.body.likes === undefined) {
    req.body.likes = 0;
  }
  const blog = new Blog(req.body);
  blog.save().then((data) => res.status(201).json(data));
});

module.exports = blogRouter;
