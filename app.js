const express = require("express");
const app = express();
const counterModel = require("./models/counter");
const bodyParser = require("body-parser");
const { create } = require("domain");

app.set("view engine", "ejs");

app.use(express.static("./public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async function (req, res) {
  const counter = await counterModel.findOne({
    _id: "673a384c681f22d708e7187e",
  });
  res.render("index", {
    playerCount: counter.count,
    lastUpdated: timeAgo(counter.lastUpdated),
  });
});

app.post("/updateStatus", async function (req, res) {
  const counter = await counterModel.findOne({
    _id: "673a384c681f22d708e7187e",
  });
  counter.count = req.body.playerCount;
  counter.lastUpdated = Date.now();
  await counter.save();
  res.redirect("/");
});

function timeAgo(postedTime) {
  const now = new Date();
  const postedDate = new Date(postedTime);

  // Calculate the difference in milliseconds
  const diffMs = now - postedDate;

  // Define time conversions
  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  // Determine the most appropriate unit of time
  if (seconds < 60) {
    return `Last Updated ${seconds} sec${seconds !== 1 ? "s" : ""} ago`;
  } else if (minutes < 60) {
    return `Last Updated ${minutes} min${minutes !== 1 ? "s" : ""} ago`;
  } else if (hours < 24) {
    return `Last Updated ${hours} hour${hours !== 1 ? "s" : ""} ago`;
  } else if (days < 30) {
    return `Last Updated ${days} day${days !== 1 ? "s" : ""} ago`;
  } else if (months < 12) {
    return `Last Updated ${months} month${months !== 1 ? "s" : ""} ago`;
  } else {
    return `Last Updated ${years} year${years !== 1 ? "s" : ""} ago`;
  }
}

app.listen(3000);
