const express = require("express");
const router = express.Router();

const Supplies = require("../models/Supplies-Schema");
const Product = require("../models/Products_Schema");
const Categories = require("../models/Categories-Schema");

router.get("/", (req, res) => {
  Product.find()
    .then(products => {
      Supplies.find()
        .then(supplies => {
          Categories.find()
            .then(categories => {
              res.status(200).json({
                supplies,
                products,
                categories
              });
            })
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
});

router.post("/modify_menu", (req, res) => {
  Product.findOne({ ProductID: req.body.ProductID }).then(product => {
    const newProduct = new Product({
      ProductID: req.body.ProductID,
      ProductName: req.body.ProductName,
      Category: req.body.Category,
      CategoryID: req.body.CategoryID,
      SuppliesConsumption: req.body.SuppliesConsumption,
      Cost: req.body.Cost
    });
    if (product) {
      (product.ProductName = req.body.ProductName),
        (product.Category = req.body.Category),
        (product.CategoryID = req.body.CategoryID),
        (product.SuppliesConsumption = req.body.SuppliesConsumption),
        (product.Cost = req.body.Cost);
      product
        .save()
        .then(res.status(202))
        .catch(res.status(304));
    } else {
      newProduct
        .save()
        .then(res.status(200))
        .catch(res.status(501));
    }
  });
});

module.exports = router;
