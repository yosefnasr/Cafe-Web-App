const express = require("express");
const router = express.Router();

const Category = require("../models/Categories-Schema");

router.get("/", (req, res) => {
  Category.find()
    .then(categories => {
      res.status(200).json({
        categories
      });
    })
    .catch(res.status(404));
});

router.post("/modify_categories", (req, res) => {
  Category.findOne({ CategoryID: req.body.CategoryID }).then(category => {
    const newCategory = new Category({
      CategoryName: req.body.CategoryName,
      CategoryID: req.body.CategoryID
    });
    if (category) {
      category.CategoryName = req.body.CategoryName;
      category.CategoryID = req.body.CategoryID;
      category
        .save()
        .then(res.status(202))
        .catch(res.status(304));
    } else {
      newCategory
        .save()
        .then(
          res.json({
            newCategory
          })
        )
        .catch(err => console.log(err));
    }
  });
});

module.exports = router;
