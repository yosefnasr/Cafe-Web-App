const express = require("express");
const router = express.Router();

const Supplie = require("../models/Supplies-Schema");

router.post("/modify_supplies", (req, res) => {
  Supplie.findOne({ ProductID: req.body.ProductID }).then(supplie => {
    const newSupplie = new Supplie({
      ProductID: req.body.ProductID,
      ProductName: req.body.ProductName,
      QuantityType: req.body.QuantityType,
      Quantity: req.body.Quantity,
      MinimumQuantity: req.body.MinimumQuantity
    });
    if (supplie) {
      (supplie.ProductID = req.body.ProductID),
        (supplie.ProductName = req.body.ProductName),
        (supplie.QuantityType = req.body.QuantityType),
        (supplie.Quantity = req.body.Quantity),
        (supplie.MinimumQuantity = req.body.MinimumQuantity);
      supplie.save().then(
        res.json({
          newSupplie
        })
      );
    } else {
      newSupplie
        .save()
        .then(
          res.json({
            newSupplie
          })
        )
        .catch(err => console.log(err));
    }
  });
});

router.post("/increase_stock", (req, res) => {
  Supplie.findOne({ ProductID: req.body.ProductID }).then(supplie => {
    if (supplie) {
      let tempQuantity = supplie.Quantity + req.body.Quantity;
      console.log(tempQuantity);
      if (tempQuantity > 0) {
        supplie.Quantity = tempQuantity;
        supplie
          .save()
          .then(
            res.json({
              newSupplie
            })
          )
          .catch(err => console.log(err));
      } else {
        res.status(403);
      }
    } else {
      res.status(404);
    }
  });
});

router.post("/decrease_stock", (req, res) => {
  Supplie.findOne({ ProductID: req.body.ProductID }).then(supplie => {
    if (supplie) {
      let tempQuantity = supplie.Quantity - req.body.Quantity;
      console.log(tempQuantity);
      if (tempQuantity > 0) {
        supplie.Quantity = tempQuantity;
        supplie
          .save()
          .then(
            res.json({
              newSupplie
            })
          )
          .catch(err => console.log(err));
      } else {
        res.status(403);
      }
    } else {
      res.status(404);
    }
  });
});

router.get("/", (req, res) => {
  Supplie.find()
    .sort("ProductID")
    .then(supplies => {
      res.json({
        supplies
      });
    })
    .catch(err => console.log(err));
});

module.exports = router;
