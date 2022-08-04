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

module.exports = { dummy, totalLikes, favoriteBlog };
