const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const flash = require("connect-flash");

const employeeRoutes = require("./routes/employees");
const itemRoutes = require("./routes/items");

const Employee = require("./models/employee");
const Item = require("./models/item");

async function main() {
  await mongoose.connect("mongodb://localhost:27017/action-item");
}
main().then(() => console.log("Connected to db"));
main().catch((err) => console.log("AN ERROR!", err));

const sessionOptions = {
  secret: "thisisabadsecret",
  resave: false,
  saveUninitialized: true,
};
app.use(session(sessionOptions));

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));
app.use(flash());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

app.use("/team", employeeRoutes);
app.use("/item", itemRoutes);

app.get("/", (req, res) => {
  res.render("home");
});

app.get("*", (req, res) => {
  res.render("wrongLocation");
});

app.listen(3000, () => {
  console.log("listening on port 3000");
});
