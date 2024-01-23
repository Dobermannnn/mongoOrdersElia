const Book = require("../models/book");
const Author = require("../models/author");
const author = require("./author");
const { set } = require("mongoose");
const book = require("../controllers/book");
module.exports = {
  getAllBooks: async () => {
    const allBook = await Book.find({});

    return allBook.map((p) => ({
      id: p._id,
      title: p.title,
      publishingYear: p.publishingYear,
      geners: p.geners,
      authors: p.authors,
      quantity: p.quantity,
      price: p.price,
    }));
  },
  getBook: async (findTitle) => {
    return await Book.findOne({ title: findTitle });
  },
  getBookByGenre: async (findgenrs) => {
    return await Book.find({ geners: findgenrs });
  },
  getBookByRange: async (start, end) => {
    return await Book.find({ publishingYear: { $gte: start, $lte: end } });
  },
  deleteBook: async (findId) => {
    return Book.deleteOne({ _id: findId });
  },
  createBook: async (books) => {
    let createBooks = books;
    if (!(books instanceof Array)) {
      createBooks = [books];
    }
    return Book.insertMany(createBooks);
  },

  getBookByAuthorCountry: async (country) => {
    return await Book.aggregate([
      {
        $lookup: {
          from: "authors",
          localField: "authors",
          foreignField: "_id",
          as: "authors",
        },
      },
      {
        $match: {
          "authors.country": "israel",
        },
      },
    ]);
  },
};
