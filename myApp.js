var express = require("express");
var app = express();
require("dotenv").config();

app.use(express.static(`${__dirname}/public`));

app.use(function middleware(req, res, next) {
  const infoRequest = `${req.method} ${req.path} - ${req.ip}`
  console.log(infoRequest)
  next();
});

app.get("/", (req, res) => {
  const absolutePath = `${__dirname}/views/index.html`;
  res.sendFile(absolutePath);
});

app.get("/json", (req, res) => {
  let obj = { message: "Hello json" };
  if (process.env.MESSAGE_STYLE === "uppercase") {
    obj.message = obj.message.toUpperCase();
  }
  res.json(obj);
});

module.exports = app;
