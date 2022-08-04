/*eslint-disable */
const listHelper = require("../utils/list_helper");

test("dummy returns one", () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

describe("total likes", () => {
  test(" 0 if blog list is empty", () => {
    const blogs = [];
    const result = listHelper.totalLikes(blogs);
    expect(result).toBe(0);
  });
  test(" likes of that blog if only one blog", () => {
    const blogs = [
      {
        title: "Atomic habbits",
        author: "Subash",
        url: "sommeurl.com",
        likes: 9,
      },
    ];
    const result = listHelper.totalLikes(blogs);
    expect(result).toBe(9);
  });
  test(" total sum of all likes in blogs", () => {
    const blogs = [
      {
        title: "Atomic habbits",
        author: "Subash",
        url: "sommeurl.com",
        likes: 9,
      },
      {
        title: "Power of subconsious mind",
        author: "I just forgot",
        url: "power.com",
        likes: 15,
      },
    ];
    const result = listHelper.totalLikes(blogs);
    expect(result).toBe(24);
  });
});
