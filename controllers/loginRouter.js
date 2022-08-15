const loginRouter = require("express").Router();
const User = require("../models/userSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../utils/config");

loginRouter.post("/", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user) {
    return res.status(400).json({ error: "user not found" });
  }
  const isCorrect = await bcrypt.compare(password, user.passwordHash);
  if (!isCorrect) {
    return res.status(400).json({ error: "wrong password" });
  }
  const userForToken = {
    username: user.username,
    id: user._id,
  };
  const token = jwt.sign(userForToken, config.SECRET);
  res
    .status(200)
    .json({ token, username: user.username, name: user.name, id: user._id });
});

module.exports = loginRouter;
