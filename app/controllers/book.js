const {
  getAllBooks,
  getBook,
  createBook,
  deleteBook,
  getBookByGenre,
  getBookByRange,
  getBookByAuthorCountry,
} = require("../services/books");

module.exports = {
  listBooks: async (req, res) => {
    try {
      const book = await getAllBooks();
      res.json(book);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  getBookByTitle: async (req, res) => {
    try {
      const title = req.params.title;
      const book = await getBook(title);
      res.json(book);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  getBookByGenre: async (req, res) => {
    try {
      const genre = req.params.genre;
      const book = await getBookByGenre(genre);
      res.json(book);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  getBookByYear: async (req, res) => {
    try {
      const { start, end } = req.body;
      const books = await getBookByRange(start, end);
      res.json(books);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  getBookByAutorCountry: async (req, res) => {
    try {
      const country = req.params.autor;
      const books = await getBookByAuthorCountry(country);
      res.json(books);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  deleteBook: async (req, res) => {
    try {
      const id = req.params.id;
      const book = await deleteBook(id);
      res.json(book);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  createBook: async (req, res) => {
    try {
      const books = req.body;
      const newBook = await createBook(books);
      res.json(newBook);
    } catch (err) {
      res.status(500).send(err);
    }
  },
};
