const Blog = require("../models/Blog");

async function create(blog) {
  return Blog.create(blog);
}

async function update(id, blog) {
  const existing = await Blog.findById(id);
  existing.title = blog.title;
  existing.imageUrl = blog.imageUrl;
  existing.content = blog.content;
  existing.category = blog.category;

  await existing.save();
}

async function deleteById(id) {
  await Blog.findByIdAndRemove(id);
}

async function getAll() {
  return Blog.find({}).lean();
}

async function getById(id) {
  return Blog.findById(id).lean();
}

async function followBlog(blogId, userId) {
  const blog = await Blog.findById(blogId);

  if (blog.follows.includes(userId)) {
    throw new Error("Cannot follow twice");
  }

  blog.follows.push(userId);
  await blog.save();
}

async function getByUserFollows(userId) {
  return Blog.find({ follows: userId }).lean();
}

async function getByUserOwner(userId) {
  return Blog.find({ owner: userId }).lean();
}

module.exports = {
  create,
  update,
  getAll,
  getById,
  deleteById,
  followBlog,
  getByUserFollows,
  getByUserOwner,
};
