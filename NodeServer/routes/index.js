//Initiallising node modules
const Joi = require("joi"); // use for validation
const express = require("express");
const router = express.Router();
var bodyParser = require("body-parser");
var sql = require("mssql");

// Body Parser Middleware
router.use(express.json());

router.get("/", (req, res) => {
  res.send("Welcome to Student Portal Endpoint");
});

module.exports = router;
