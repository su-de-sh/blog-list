const blogRouter = require("express").Router();
const Blog = require("../models/blogSchema");
const User = require("../models/userSchema");
const jwt = require("jsonwebtoken");
const config = require("../utils/config");

blogRouter.get("/", async (req, res, next) => {
  try {
    const data = await Blog.find().populate("user", { username: 1, name: 1 });

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
});

blogRouter.post("/", async (req, res, next) => {
  try {
    if (req.body.likes === undefined) {
      req.body.likes = 0;
    }
    const blogs = await Blog.find({ title: req.body.title });
    if (blogs.length > 0) {
      res.status(400).json({ error: "Blog already exists" });
    } else if (!(req.body.title && req.body.url)) {
      res.status(400).json({ error: " title and url are required" });
    } else {
      const token = req.token;
      const decodedToken = jwt.verify(token, config.SECRET);
      if (!decodedToken.id) {
        res.status(401).json({ error: "token missing or invalid" });
      }
      const user = await User.findById(decodedToken.id);

      const blog = new Blog({
        title: req.body.title,
        author: req.body.author,
        url: req.body.url,
        likes: req.body.likes,
        user: user.id,
      });
      const data = await blog.save();
      user.blogs = user.blogs.concat(data.id);
      await user.save();
      res.status(201).json(data);
    }
  } catch (error) {
    next(error);
  }
});

blogRouter.delete("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    await Blog.findByIdAndRemove(id);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

blogRouter.put("/:id", async (req, res, next) => {
  try {
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
  } catch (error) {
    next(error);
  }
});

module.exports = blogRouter;
