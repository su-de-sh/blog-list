const User = require("../models/userSchema");
const bcrypt = require("bcryptjs");
const userRouter = require("express").Router();

userRouter.get("/", async (req, res, next) => {
  try {
    const data = await User.find().populate("blogs");

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
});

userRouter.post("/", async (req, res, next) => {
  try {
    const { username, name, password } = req.body;

    if (username.length < 3 || password.length < 3) {
      res.status(400).end();
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      res.status(400).end();
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
      username,
      name,
      passwordHash,
    });

    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (error) {
    next(error);
  }
});

module.exports = userRouter;
