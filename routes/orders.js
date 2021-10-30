const express = require("express");
const router = express.Router();

const Supplies = require("../models/Supplies-Schema");
const Product = require("../models/Products_Schema");
const Categories = require("../models/Categories-Schema");
const PaidOrder = require("../models/Paid-Orders-Schema");
const UnpaidOrder = require("../models/Unpaid-Orders-Schema");

router.post("/modify_orders", (req, res) => {
  if (req.body.Paid) {
    let TableNumber = "";
    UnpaidOrder.findOne({ OrderID: req.body.OrderID }).then(unpaidOrder => {
      if (unpaidOrder) {
        const newPaidOrder = new PaidOrder({
          OrderID: unpaidOrder.OrderID,
          TableNumber: unpaidOrder.TableNumber,
          Items: unpaidOrder.Items,
          TotalCost: unpaidOrder.TotalCost,
          EmployeeName: req.body.EmployeeName
        });
        TableNumber = unpaidOrder.TableNumber;
        newPaidOrder
          .save()
          .then(
            res.json({
              newPaidOrder
            })
          )
          .catch(err => console.log(err));
        UnpaidOrder.deleteOne({ TableNumber: TableNumber }).catch(err =>
          console.log(err)
        );
      }
    });
  } else {
    UnpaidOrder.findOne({ OrderID: req.body.OrderID }).then(unpaidOrder => {
      const newUnpaidOrder = new UnpaidOrder({
        OrderID: req.body.OrderID,
        TableNumber: req.body.TableNumber,
        Items: req.body.Items,
        TotalCost: req.body.TotalCost,
        EmployeeName: req.body.EmployeeName
      });
      if (unpaidOrder) {
        (unpaidOrder.OrderID = req.body.OrderID),
          (unpaidOrder.TableNumber = req.body.TableNumber),
          (unpaidOrder.Items = req.body.Items),
          (unpaidOrder.TotalCost = req.body.TotalCost),
          (unpaidOrder.EmployeeName = req.body.EmployeeName);
        unpaidOrder
          .save()
          .then(res.status(202))
          .catch(res.status(304));
      } else {
        newUnpaidOrder
          .save()
          .then(
            res.json({
              newUnpaidOrder
            })
          )
          .catch(err => console.log(err));
      }
    });
  }
});

router.get("/", (req, res) => {
  UnpaidOrder.find()
    .then(orders => {
      Supplies.find()
        .then(supplies => {
          Product.find()
            .sort({ ProductName: 1 })
            .then(products => {
              Categories.find()
                .then(categories => {
                  PaidOrder.find()
                    .then(PaidOrders => {
                      res
                        .status(200)
                        .json({
                          categories,
                          products,
                          supplies,
                          orders,
                          PaidOrders
                        })
                        .catch(res.status(404));
                    })
                    .catch(res.status(404));
                })
                .catch(res.status(404));
            })
            .catch(res.status(404));
        })
        .catch(res.status(404));
    })
    .catch(res.status(404));
});

module.exports = router;
