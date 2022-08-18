const express = require("express");
const app = express();
const cors = require("cors");
const config = require("./utils/config");
const mongoose = require("mongoose");
const blogRouter = require("./controllers/blogRouter");
const userRouter = require("./controllers/userRouter");
const loginRouter = require("./controllers/loginRouter");
const middleware = require("./utils/middleware");

const mongoUrl = config.MONGODB_URI;
mongoose.connect(mongoUrl).then(() => {
  // eslint-disable-next-line no-console
  console.log("MongoDb connected");
});

app.use(cors());
app.use(express.json());

app.use(middleware.tokenExtractor);
app.use(middleware.userExtractor);
app.use("/api/users", userRouter);
app.use("/api/login", loginRouter);
app.use("/api/blogs", blogRouter);
if (process.env.NODE_ENV === "test") {
  const testingRouter = require("./controllers/testing");
  app.use("/api/testing", testingRouter);
}

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);
module.exports = app;
