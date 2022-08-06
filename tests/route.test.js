/*eslint-disable */
const supertest = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const Blogs = require("../models/blog");

const api = supertest(app);

const initialBlogs = [
  {
    title: "Atomic habbits",
    author: "Subash",
    url: "sommeurl.com",
    likes: 9,
  },
  {
    title: " habbits",
    author: "Raju dai",
    url: "somemoreurl.com",
    likes: 100,
  },
];

describe("api requests", () => {
  beforeEach(async () => {
    await Blogs.deleteMany({});

    const blogsObjects = initialBlogs.map((blogs) => new Blogs(blogs));
    const promiseArray = blogsObjects.map((blogs) => blogs.save());
    await Promise.all(promiseArray);
  });

  test("get", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("correct no of blogs", async () => {
    const response = await api.get("/api/blogs");
    expect(response.body.length).toBe(initialBlogs.length);
  });

  test("id to be defined", async () => {
    const response = await api.get("/api/blogs");

    expect(response.body[0]._id).toBeDefined();
  });
});

afterAll(() => {
  mongoose.connection.close();
});
