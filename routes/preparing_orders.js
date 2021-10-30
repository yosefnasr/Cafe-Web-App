const express = require("express");
const router = express.Router();

const UnpaidOrder = require("../models/Unpaid-Orders-Schema");

router.get("/", (req, res) => {
  UnpaidOrder.find().then(orders => {
    res.status(200).json({
      orders
    });
  });
});

router.post("/modify_waiting_order", (req, res) => {
  UnpaidOrder.findOne({ OrderID: req.body.OrderID }).then(unpaidOrder => {
    if (unpaidOrder) {
      unpaidOrder.Waiting = false;
      unpaidOrder
        .save()
        .then(res.status(202))
        .catch(res.status(304));
    } else {
      res.json("can't find order");
    }
  });
});

module.exports = router;
