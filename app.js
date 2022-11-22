const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

const Employee = require("./models/employee");
const Item = require("./models/item");

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
  const items = await Item.find({});
  for (let item of items) {
    if (item.newUpdate === true) {
      const employeeUpdate = await Employee.find({ items: item._id });
      // const card = document.querySelector(".card-btn");
      // card.classList.add("highlight");
    }
  }
  res.render("team", { employees, items });
});

app.get("/team/new", (req, res) => {
  res.render("./employees/new");
});

app.post("/employee", async (req, res) => {
  const employee = new Employee(req.body.employee);
  await employee.save();
  res.redirect("/team");
});

app.get("/team/:id", async (req, res) => {
  const employee = await Employee.findById(req.params.id);
  const items = await Item.find({ owner: req.params.id });
  res.render("./employees/employee", { employee, items });
});

app.get("/team/:id/edit", async (req, res) => {
  const employee = await Employee.findById(req.params.id);
  res.render("./employees/edit", { employee });
  // res.send(req.params);
});

app.put("/team/:id/edit", async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(req.params.id, { ...req.body.employee });
    res.redirect(`/team/${employee._id}`);
  } catch (e) {
    console.log("ERRRRRRRRORRRRR", e);
  }
});

app.delete("/team/:id/edit", async (req, res) => {
  const employee = await Employee.findByIdAndDelete(req.params.id);
  res.redirect("/team");
});

app.post("/team/:id/new-item", async (req, res) => {
  const item = new Item(req.body.item);
  const employee = await Employee.findById(req.params.id);
  item.owner = employee._id;
  await item.save();
  await employee.items.push(item);
  await employee.save();
  res.redirect(`/team/${employee._id}`);
});

app.get("/item/new", (req, res) => {
  res.render("./items/new");
});

app.get("/item/:id", async (req, res) => {
  const item = await Item.findById(req.params.id);
  res.render("./items/complete", { item });
});

app.get("/item/:id/edit", async (req, res) => {
  const item = await Item.findById(req.params.id);
  res.render("./items/edit", { item });
});

app.put("/item/:id/edit", async (req, res) => {
  const item = await Item.findByIdAndUpdate(req.params.id, { ...req.body.item });
  const employee = await Employee.find(item.owner);
  const employeeID = employee[0].id;
  await item.save();
  res.redirect(`/team/${employeeID}`);
});

app.put("/item/:id/new-update", async (req, res) => {
  const item = await Item.findByIdAndUpdate(req.params.id);
  const employee = await Employee.find(item.owner);
  const employeeID = employee[0].id;
  item.newUpdate = true;
  await item.update.push(req.body.item.update);
  await item.save();
  res.redirect(`/team/${employeeID}`);
});

app.put("/item/:id/confirm-update", async (req, res) => {
  const item = await Item.findByIdAndUpdate(req.params.id, { ...req.body.item });
  const employee = await Employee.find(item.owner);
  const employeeID = employee[0].id;
  item.newUpdate = false;
  await item.save();
  res.redirect(`/team/${employeeID}`);
});

app.put("/item/:id/mark-complete", async (req, res) => {
  const item = await Item.findByIdAndUpdate(req.params.id, { ...req.body.item });
  const employee = await Employee.find(item.owner);
  const employeeID = employee[0].id;
  if (item.complete === false) {
    item.complete = true;
  } else {
    item.complete = false;
  }
  item.save();
  res.redirect(`/team/${employeeID}`);
});

app.listen(3000, () => {
  console.log("listening on port 3000");
});
