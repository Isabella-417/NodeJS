var express = require("express");
var app = express();
require("dotenv").config();

app.use(express.static(`${__dirname}/public`))

app.get("/", (req, res) => {
  const absolutePath = `${__dirname}/views/index.html`;
  res.sendFile(absolutePath);
});


app.get("/json", (req, res) => {
  let obj = { message: "Hello json" };
  const message =
    process.env.MESSAGE_STYLE === "uppercase" ? obj.message.toUpperCase() : obj;
  res.json(message);
});

module.exports = app;
