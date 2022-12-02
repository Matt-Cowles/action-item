const express = require("express");
const router = express.Router();

const Employee = require("../models/employee");
const Item = require("../models/item");

router.put("/:id/edit", async (req, res) => {
  const item = await Item.findByIdAndUpdate(req.params.id, { ...req.body.item });

  if (req.body.original) {
    const originalUpdate = req.body.original[0];
    const updateIndex = item.update.indexOf(`${originalUpdate}`);

    if (req.body.editUpdate) {
      const editedUpdate = req.body.editUpdate[0];

      await item.updateOne({
        $push: {
          update: {
            $each: [`${editedUpdate}`],
            $position: updateIndex,
          },
        },
      });
    }

    await item.updateOne({
      $pull: {
        update: originalUpdate,
      },
    });
  }

  await item.save();

  const employee = await Employee.find(item.owner);
  const employeeID = employee[0].id;
  res.redirect(`/team/${employeeID}`);
});

router.delete("/:id/edit", async (req, res) => {
  const id = req.params.id;
  const item = await Item.findByIdAndDelete(id);

  const employee = await Employee.find(item.owner);
  const employeeID = employee[0].id;

  req.flash("success", "Successfully removed that action item");
  res.redirect(`/team/${employeeID}`);
});

router.put("/:id/new-update", async (req, res) => {
  const item = await Item.findByIdAndUpdate(req.params.id);
  const employee = await Employee.find(item.owner);
  item.newUpdate = true;
  employee[0].newUpdate = true;
  await item.update.push(req.body.item.update);
  await item.save();
  await employee[0].save();

  const employeeID = employee[0].id;
  res.redirect(`/team/${employeeID}`);
});

router.put("/:id/confirm-update", async (req, res) => {
  const item = await Item.findByIdAndUpdate(req.params.id, { ...req.body.item });
  const employee = await Employee.find(item.owner);
  item.newUpdate = false;
  await item.save();

  const itemsWithUpdate = await Item.find({ newUpdate: true });
  itemsWithUpdate.length === 0 ? (employee[0].newUpdate = false) : (employee[0].newUpdate = true);
  await employee[0].save();

  const employeeID = employee[0].id;
  res.redirect(`/team/${employeeID}`);
});

router.put("/:id/mark-complete", async (req, res) => {
  const item = await Item.findByIdAndUpdate(req.params.id, { ...req.body.item });
  const employee = await Employee.find(item.owner);
  const employeeID = employee[0].id;
  item.complete === false ? (item.complete = true) : (item.complete = false);
  item.save();
  res.redirect(`/team/${employeeID}`);
});

module.exports = router;
