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
  } else {
    const blog = new Blog(req.body);
    const data = await blog.save();
    res.status(201).json(data);
  }
});

blogRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;
  await Blog.findByIdAndRemove(id);
  res.status(204).end();
});

blogRouter.put("/:id", async (req, res) => {
  const newBlog = {
    title: req.body.title,
    author: req.body.author,
    url: req.body.url,
    likes: req.body.likes,
  };

  const data = await Blog.findByIdAndUpdate(req.params.id, newBlog, {
    new: true,
  });
  res.status(200).json(data);
});

module.exports = blogRouter;
