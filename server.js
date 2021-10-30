const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const mongoURI = require("./config/keys").mongoURI;

const employees = require("./routes/employees");
const supplies = require("./routes/supplies");
const orders = require("./routes/orders");
const categories = require("./routes/categories");
const menu = require("./routes/menu");
const preparingOrders = require("./routes/preparing_orders");
const ordersReport = require("./routes/orders_Report");

const app = express();
/*
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "GET,POST,DELETE,PUT");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});
*/
//app.use(express.json({extended: false}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.use("/employees", employees);
app.use("/supplies", supplies);
app.use("/orders", orders);
app.use("/categories", categories);
app.use("/menu", menu);
app.use("/preparingOrders", preparingOrders);
app.use("/ordersReport", ordersReport);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
