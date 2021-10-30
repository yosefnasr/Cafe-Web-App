const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UnpaidOrdersSchema = new Schema({
  OrderID: {
    type: Number,
    required: true
  },
  TableNumber: {
    type: Number,
    required: true,
    unique: true
  },
  Items: {
    type: [],
    required: true
  },
  EmployeeName: {
    type: String,
    required: true
  },
  TotalCost: {
    type: Number,
    required: true
  },
  Waiting: {
    type: Boolean,
    default: true
  },
  Date: {
    type: String,
    default: new Date().toISOString().slice(0, 10)
  }
});

module.exports = UnpaidOrder = mongoose.model(
  "unpaid_orders",
  UnpaidOrdersSchema
);
