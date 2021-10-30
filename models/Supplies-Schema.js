const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SuppliesSchema = new Schema({
  ProductID: {
    type: Number,
    required: true,
    unique: true
  },
  ProductName: {
    type: String,
    required: true,
    unique: true
  },
  QuantityType: {
    type: String,
    required: true
  },
  Quantity: {
    type: Number,
    default: 0
  },
  MinimumQuantity: {
    type: Number,
    default: 0
  },
  Date: {
    type: String,
    default: new Date().toISOString().slice(0, 10)
  }
});

module.exports = Supplie = mongoose.model("supplies", SuppliesSchema);
