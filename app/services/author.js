const Author = require("../models/author");
const Book = require("../models/book");
module.exports = {
  getAllAuthors: async () => {
    const allAuthors = await Author.find({});
    return allAuthors.map((p) => ({
      id: p._id,
      name: p.name,
      country: p.country,
    }));
  },
  getAuthor: async (strId) => {
    const getAuthor = await Author.findOne({ _id: strId });
    const { name, country } = getAuthor;
    return {
      name,
      country,
    };
  },
  changeAuthor: async (strId, updatedValues) => {
    return Author.updateOne({ _id: strId }, updatedValues);
  },
  createAuthor: async (name, country) => {
    const newAuthor = new Author({ name, country });
    return newAuthor.save();
  },

  getBooksByAuthor: async (strId) => {
    const books = await Book.find({ authors: strId });

    return { books };
  },
};
