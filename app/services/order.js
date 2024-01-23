const Order = require("../models/order");
const OrderItem = require("../models/order");
const Book = require("../models/book");

module.exports = {
  getAllOrders: async () => {
    const allOrders = await Order.find({});
    return allOrders.map((p) => ({
      id: p._id,
      items: p.items,
      totalPrice: p.totalPrice,
      date: p.date,
    }));
  },
  createOrder: async (bookId, quantityBooks) => {
    try {
      const orderItemsArr = [];
      let Newprice = 0;
      for (let i = 0; i < bookId.length; i++) {
        const currentBook = await Book.findOne({ _id: bookId[i] });
        const { price, quantity } = currentBook;
        if (quantityBooks[i] <= quantity) {
          const newOrderItem = {
            bookId: bookId[i],
            amount: quantityBooks[i],
          };
          Newprice += price * quantityBooks[i];
          await currentBook.updateOne({
            quantity: quantity - quantityBooks[i],
          });
          orderItemsArr.push(newOrderItem);
        }
      }
      if (orderItemsArr.length > 0) {
        const newOrder = new Order({
          items: orderItemsArr,
          totalPrice: Newprice,
        });

        return newOrder.save();
      }
    } catch (err) {
      console.log(err);
    }
  },

  findTotalPrice: async (start, end) => {
    const Orders = await Order.find({
      date: { $gte: new Date(start), $lte: new Date(end) },
    })
      .sort({
        totalPrice: -1,
      })
      .limit(1);
    console.log(Orders);
    return Orders;
  },
  findMostPopular: async (start, end) => {
    const Genre = await Order.aggregate([
      {
        $match: {
          date: {
            $gte: new Date(start),
            $lte: new Date(end),
          },
        },
      },
      {
        $lookup: {
          from: "books",
          localField: "items.bookId",
          foreignField: "_id",
          as: "res",
        },
      },
      {
        $unwind: {
          path: "$res",
          preserveNullAndEmptyArrays: false,
        },
      },
      {
        $unwind: {
          path: "$res.geners",
          preserveNullAndEmptyArrays: false,
        },
      },
      {
        $group: {
          _id: "$res.geners",
          total: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          amount: -1,
        },
      },
      {
        $limit: 3,
      },
    ]);
    return Genre;
  },

  findMostBoughtAuthors: async (start, end) => {
    const authors = await Order.aggregate([
      {
        $match: {
          date: {
            $gte: new Date(start),
            $lte: new Date(end),
          },
        },
      },
      {
        $lookup: {
          from: "books",
          localField: "items.bookId",
          foreignField: "_id",
          as: "res",
        },
      },
      {
        $unwind: {
          path: "$res",
          preserveNullAndEmptyArrays: false,
        },
      },
      {
        $unwind: {
          path: "$res.authors",
          preserveNullAndEmptyArrays: false,
        },
      },
      {
        $group: {
          _id: "$res.authors",
          total: {
            $sum: 1,
          },
        },
      },
      {
        $lookup: {
          from: "authors",
          localField: "res.authors._id",
          foreignField: "authors.id",
          as: "_id",
        },
      },
      {
        $sort: {
          total: -1,
        },
      },
      {
        $limit: 5,
      },
    ]);

    return authors;
  },
  findTotalProfit: async (start, end) => {
    const Orders = await Order.find({ date: { $gte: start, $lte: end } });
    let profit = 0;
    Orders.map((order) => {
      const { totalPrice } = order;
      profit += totalPrice;
    });
    console.log(profit);
    return profit;
  },
};
