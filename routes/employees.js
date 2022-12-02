const express = require("express");
const router = express.Router();

const Employee = require("../models/employee");
const Item = require("../models/item");

router.get("/", async (req, res) => {
  const employees = await Employee.find({});
  const updatedItems = await Item.find({ newUpdate: true });
  res.render("team", { employees, updatedItems });
});

router.get("/new", (req, res) => {
  res.render("./employees/new");
});

router.post("/new", async (req, res) => {
  const employee = new Employee(req.body.employee);
  await employee.save();

  const firstName = employee.name.split(" ")[0];

  req.flash("success", `Welcome to the team ${firstName}!`);
  res.redirect("/team");
});

router.get("/:id", async (req, res) => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const dayCount = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];

  const employee = await Employee.findById(req.params.id);
  const items = await Item.find({ owner: req.params.id });

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const trueDate = currentDate.getDate() + dayCount[currentDate.getMonth()];

  res.render("./employees/employee", { employee, items, months, dayCount, trueDate, currentYear });
});

router.get("/:id/edit", async (req, res) => {
  const employee = await Employee.findById(req.params.id);
  res.render("./employees/edit", { employee });
});

router.put("/:id/edit", async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(req.params.id, { ...req.body.employee });
    req.flash("success", `Successfully updated ${employee.name} info!`);
    res.redirect(`/team/${employee._id}`);
  } catch (e) {
    req.flash("error", `Failed to update ${employee.name} info`);
    console.log("ERRRRRRRRORRRRR", e);
    res.redirect(`/team/${employee._id}`);
  }
});

router.post("/:id/new-item", async (req, res) => {
  const item = new Item(req.body.item);
  const employee = await Employee.findById(req.params.id);
  item.owner = employee._id;
  await item.save();
  await employee.items.push(item);
  await employee.save();
  req.flash("success", "Successfully created your action item!");
  res.redirect(`/team/${employee._id}`);
});

router.delete("/:id/edit", async (req, res) => {
  const employee = await Employee.findByIdAndDelete(req.params.id);

  const firstName = employee.name.split(" ")[0];

  req.flash("success", `${firstName} was removed from the team.`);
  res.redirect("/team");
});

module.exports = router;
