const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategoriesSchema = new Schema({
  CategoryName: {
    type: String,
    required: true,
    unique: true
  },
  CategoryID: {
    type: Number,
    required: true,
    unique: true
  }
});

module.exports = Category = mongoose.model("categories", CategoriesSchema);
