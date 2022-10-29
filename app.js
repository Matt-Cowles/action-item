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
  const employees = await Employee.find({});
  res.render("team", { employees });
});

app.get("/team/new", (req, res) => {
  res.render("new");
});

app.post("/employee", async (req, res) => {
  const employee = new Employee(req.body.employee);
  await employee.save();
  res.redirect("/team");
  // res.send(req.body);
});

app.get("/team/:id", async (req, res) => {
  const employee = await Employee.findById(req.params.id, {});
  res.render("employee", { employee });
});

app.get("/team/:id/edit", async (req, res) => {
  const employee = await Employee.findById(req.params.id);
  res.render("edit", { employee });
  // res.send(req.params);
});

app.put("/team/:id/edit", async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(req.params.id, { ...req.body.employee }); // why do i need to specify the spread operator here? Wouldn't it just grab everything within employee anyways?
    res.redirect(`/team/${employee._id}`);
  } catch (e) {
    console.log("ERRRRRRRRORRRRR", e);
  }
});

app.delete("/team/:id/edit", async (req, res) => {
  const employee = await Employee.findByIdAndDelete(req.params.id);
  res.redirect("/team");
  // res.send("it worked");
});

app.listen(3000, () => {
  console.log("listening on port 3000");
});
