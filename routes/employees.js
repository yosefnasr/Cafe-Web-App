const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const User = require("../models/User-Schema");

router.post("/modify_employees", (req, res) => {
  User.findOne({ username: req.body.username }).then(user => {
    const newUser = new User({
      username: req.body.username,
      password: req.body.password,
      admin: req.body.admin,
      name: req.body.name,
      Birthdate: req.body.Birthdate,
      NationalID: req.body.NationalID,
      Phone_1: req.body.Phone_1,
      Phone_2: req.body.Phone_2,
      Adress: req.body.Adress,
      Job: req.body.Job,
      Salary: req.body.Salary,
      EndedDate: req.body.EndedDate,
      About: req.body.About
    });
    if (user) {
      (user.admin = req.body.admin),
        (user.name = req.body.name),
        (user.Birthdate = req.body.Birthdate),
        (user.NationalID = req.body.NationalID),
        (user.Phone_1 = req.body.Phone_1),
        (user.Phone_2 = req.body.Phone_2),
        (user.Adress = req.body.Adress),
        (user.Job = req.body.Job),
        (user.Salary = req.body.Salary),
        (user.EndedDate = req.body.EndedDate),
        (user.About = req.body.About);
      user
        .save()
        .then(res.status(202))
        .catch(res.status(304));
    } else {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(res.status(201))
            .catch(res.status(501));
        });
      });
    }
  });
});

router.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  User.findOne({ username }).then(user => {
    if (!user) {
      return res.status(404).json("User not found");
    }
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = { id: user.id, name: user.name, admin: user.admin };
        res.json({
          userID: payload.id,
          name: payload.name,
          admin: payload.admin
        });
      } else {
        return res.status(400).json("Password incorrect");
      }
    });
  });
});

router.get("/", (req, res) => {
  User.find()
    .then(users => {
      res.status(200).json({
        users
      });
    })
    .catch(res.status(404));
});

module.exports = router;
