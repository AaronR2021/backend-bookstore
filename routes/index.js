//index Routes
var express = require("express");
var router = express.Router();
var Books = require("../models/books");

router.get("/", (req, res) => {
  res.render("home.ejs");
});

module.exports = router;
