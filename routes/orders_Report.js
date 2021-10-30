const express = require("express");
const router = express.Router();

const paidOrder = require("../models/Paid-Orders-Schema");

router.get("/", (req, res) => {
  paidOrder.find().then(orders => {
    res.status(200).json({
      orders
    });
  });
});

module.exports = router;
