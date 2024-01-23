const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const { ObjectId, Timestamp } = require("mongodb");
const orderItemSchema = new Schema({
  bookId: ObjectId,
  amount: Number,
});

const orderSchema = new Schema({
  items: [orderItemSchema],
  totalPrice: Number,
  date: { type: Date, default: Date.now },
});

const OrderItem = model("OrderItem", orderItemSchema);
const Order = model("Order", orderSchema);
(module.exports = Order), OrderItem;
