const Book = require("../models/Book");

async function create(book) {
  return Book.create(book);
}

async function update(id, book) {
  const existing = await Book.findById(id);
  existing.title = book.title;
  existing.author = book.author;
  existing.genre = book.genre;
  existing.stars = book.stars;
  existing.imageUrl = book.imageUrl;
  existing.review = book.review;
  await existing.save();
}

async function deleteById(id) {
  await Book.findByIdAndRemove(id);
}

async function getAll() {
  return Book.find({}).lean();
}

async function getById(id) {
  return Book.findById(id).lean();
}

async function wishBook(bookId, userId) {
  const book = await Book.findById(bookId);

  if (book.wishings.includes(userId)) {
    throw new Error("Cannot wish twice");
  }

  book.wishings.push(userId);
  await book.save();
}

async function getByUserWishing(userId) {
  return Book.find({ wishings: userId }).lean();
}
module.exports = {
  create,
  update,
  getAll,
  getById,
  deleteById,
  wishBook,
  getByUserWishing,
};
