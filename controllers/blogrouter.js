const blogRouter = require("express").Router();
const Blog = require("../models/blog");

blogRouter.get("/", async (req, res) => {
  const data = await Blog.find();

  res.status(200).json(data);
});

blogRouter.post("/", async (req, res) => {
  if (req.body.likes === undefined) {
    req.body.likes = 0;
  }
  if (!(req.body.title && req.body.url)) {
    res.status(400).end();
  }
  const blog = new Blog(req.body);
  const data = await blog.save();
  res.status(201).json(data);
});

module.exports = blogRouter;
