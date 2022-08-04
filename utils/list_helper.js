const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((a, b) => {
    return (a += b.likes);
  }, 0);
};

const favoriteBlog = (blogs) => {
  if (!blogs.length) return null;

  let maxLikes = blogs.reduce((a, b) => {
    if (b.likes > a) return b.likes;
    else return a;
  }, 0);

  let favBlog = blogs.find((blog) => {
    return blog.likes === maxLikes;
  });

  return { title: favBlog.title, author: favBlog.author, likes: favBlog.likes };
};

const mostBlogs = (blogs) => {
  if (!blogs.length) return null;

  const hashMap = {};

  blogs.forEach((blog) => {
    if (!hashMap[blog.author]) {
      hashMap[blog.author] = 1;
    } else {
      hashMap[blog.author]++;
    }
  });

  let authorWithMostBlogs = Object.keys(hashMap).reduce((a, b) =>
    hashMap[a] > hashMap[b] ? a : b
  );

  return { author: authorWithMostBlogs, blogs: hashMap[authorWithMostBlogs] };
};

const mostLikes = (blogs) => {
  if (!blogs.length) return null;
  const hashMap = {};
  blogs.forEach((blog) => {
    if (!hashMap[blog.author]) {
      hashMap[blog.author] = blog.likes;
    } else {
      hashMap[blog.author] += blog.likes;
    }
  });

  let authorWithMostLikes = Object.keys(hashMap).reduce((a, b) =>
    hashMap[a] > hashMap[b] ? a : b
  );

  return { author: authorWithMostLikes, likes: hashMap[authorWithMostLikes] };
};

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes };
