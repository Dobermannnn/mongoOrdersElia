const {
  getAllAuthors,
  getAuthor,
  createAuthor,
  changeAuthor,
  getBooksByAuthor,
} = require("../services/author");

module.exports = {
  listAuthors: async (req, res) => {
    try {
      const author = await getAllAuthors();
      res.json(author);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  getAuthor: async (req, res) => {
    try {
      const id = req.params.id;
      const author = await getAuthor(id);
      res.json(author);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  createAuthor: async (req, res) => {
    try {
      const { name, country } = req.body;
      const newAuthor = await createAuthor(name, country);
      res.json(newAuthor);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  changeAuthor: async (req, res) => {
    try {
      const id = req.params.id;
      const updatedValues = req.body;
      const author = await changeAuthor(id, updatedValues);
      res.json(author);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  getBooksByAuthor: async (req, res) => {
    try {
      const id = req.params.id;
      const books = await getBooksByAuthor(id);
      res.json(books);
    } catch (err) {
      res.status(500).send(err);
    }
  },
};
