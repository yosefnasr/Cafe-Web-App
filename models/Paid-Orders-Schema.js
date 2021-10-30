const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PaidOrdersSchema = new Schema({
  OrderID: {
    type: Number,
    required: true
  },
  TableNumber: {
    type: Number,
    required: true
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
  Date: {
    type: String,
    default: new Date().toISOString().slice(0, 10)
  }
});

module.exports = PaidOrder= mongoose.model("paid_orders", PaidOrdersSchema);
