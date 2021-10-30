const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  admin: {
    type: Boolean,
    default: false
  },
  name: {
    type: String,
    required: true
  },
  Birthdate: {
    type: String
  },
  NationalID: {
    type: String
  },
  Phone_1: {
    type: String
  },
  Phone_2: {
    type: String
  },
  Adress: {
    type: String
  },
  Job: {
    type: String
  },
  StartedDate: {
    type: String,
    default: new Date().toISOString().slice(0, 10)
  },
  EndedDate: {
    type: String
  },
  Salary: {
    type: Number
  },
  About: {
    type: String
  }
});

module.exports = User = mongoose.model("users", UserSchema);
