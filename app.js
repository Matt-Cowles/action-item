const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");

async function main() {
  await mongoose.connect("mongodb://localhost:27017/action-item");
}
main().then(() => console.log("Connected to yelp-camp db"));
main().catch((err) => console.log("AN ERROR!", err));

app.get("/team", async (req, res) => {
  res.send("Hello");
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

app.listen(3000, () => {
  console.log("listening on port 3000");
});
