require("dotenv").config();

const config = {
  // eslint-disable-next-line
  PORT: process.env.PORT,
  // eslint-disable-next-line
  MONGODB_URI: process.env.MONGODB_URI,
};

module.exports = config;
