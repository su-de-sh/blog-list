const blogRouter = require("express").Router();
const Blog = require("../models/blogSchema");
const User = require("../models/userSchema");

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
    if (!(req.body.title && req.body.url)) {
      res.status(400).end();
    } else {
      const user = await User.findById("62f21d10991102dce8decc93");

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
