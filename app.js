const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

const Employee = require("./models/employee");

async function main() {
  await mongoose.connect("mongodb://localhost:27017/action-item");
}
main().then(() => console.log("Connected to db"));
main().catch((err) => console.log("AN ERROR!", err));

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

app.get("/team", async (req, res) => {
  const employee = new Employee({ name: "Matt Cowles", jobTitle: "Manufaccturing Tech IV" });
  res.render("team");
});

app.get("/addemplpoyee", (req, res) => {
  res.render("addemployee");
});

app.listen(3000, () => {
  console.log("listening on port 3000");
});
