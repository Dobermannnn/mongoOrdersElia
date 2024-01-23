const {
  getAllOrders,
  createOrder,
  findTotalPrice,
  findTotalProfit,
  findMostPopular,
} = require("../services/order");

module.exports = {
  allOrders: async (req, res) => {
    try {
      const orders = await getAllOrders();
      res.json(orders);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  order: async (req, res) => {
    try {
      const { bookId, quantity } = req.body;
      const orders = await createOrder(bookId, quantity);
      res.json(orders);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  getMostTotalPrice: async (req, res) => {
    try {
      const { start, end } = req.body;

      const orders = await findTotalPrice(start, end);
      res.json(orders);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  getMostPopularGeners: async (req, res) => {
    try {
      const { start, end } = req.body;

      const gener = await findMostPopular(start, end);
      res.json(gener);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  getMostBoughtAuthors: async (req, res) => {
    try {
      const { start, end } = req.body;

      const authors = await findMostBoughtAuthors(start, end);
      res.json(authors);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  getProfit: async (req, res) => {
    try {
      const { start, end } = req.body;

      const profit = await findTotalProfit(start, end);
      res.json(profit);
    } catch (err) {
      res.status(500).send(err);
    }
  },
};
