require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Event = require("./models/event");

//connect to mongodb
const dbURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.lxzkg.mongodb.net/events-db?retryWrites=true&w=majority`;

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((r) => app.listen(8000))
  .catch((e) => console.log(e));

app.get("/", (req, res) => {
  res.send("");
});

app.get("/events", (req, res) => {
  Event.find()
    .then((r) => {
      res.send(r);
    })
    .catch((e) => console.log(e));
});

app.get("/events/new", (req, res) => {
  res.send("new events page");
  console.log(req, res);
});
