const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductssSchema = new Schema({
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
  Category: {
    type: String,
    required: true
  },
  CategoryID: {
    type: String,
    required: true
  },
  SuppliesConsumption: {
    type: [],
    required: true
  },
  Cost: {
    type: Number,
    required: true
  }
});

module.exports = Product = mongoose.model("products", ProductssSchema);
