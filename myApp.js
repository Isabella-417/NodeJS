var express = require("express");
var app = express();
require("dotenv").config();

app.use(express.static(`${__dirname}/public`));

// Simple middleware
app.use((req, res, next) => {
  const infoRequest = `${req.method} ${req.path} - ${req.ip}`;
  console.log(infoRequest);
  next();
});

// Practice with routes
app.get("/:word/echo", (req, res) => {
  res.json({ echo: req.params.word });
});

app.route("/name")
   //Get query parameter
  .get((req, res) => {
    const nameData = req.query;
    res.json({ name: `${nameData.first} ${nameData.last}` });
  })
  .post((req, res) => {});

// Chain middleware
app.get(
  "/now",
  (req, res, next) => {
    req.time = new Date().toString();
    next();
  },
  (req, res) => {
    res.json({ time: req.time });
  }
);

app.get("/", (req, res) => {
  const absolutePath = `${__dirname}/views/index.html`;
  res.sendFile(absolutePath);
});

// Testing env variables
app.get("/json", (req, res) => {
  let obj = { message: "Hello json" };
  if (process.env.MESSAGE_STYLE === "uppercase") {
    obj.message = obj.message.toUpperCase();
  }
  res.json(obj);
});

module.exports = app;
