const employees = require("./employees");
const Employee = require("../models/employee");

const items = require("./items");
const Item = require("../models/items");

const mongoose = require("mongoose");

async function main() {
  await mongoose.connect("mongodb://localhost:27017/action-item");
}
main().then((data) => console.log("Connected"));
main().catch((err) => console.log("AN ERROR!", err));

// const seedDB = async () => {
//   await Employee.deleteMany({});
//   for (let i = 0; i < employees.length; i++) {
//     const employee = new Employee({
//       name: `${employees[i].name}`,
//       position: `${employees[i].position}`,
//     });
//     console.log(`${employees[i].name}`);
//     await employee.save();
//   }
// };

// seedDB().then(() => mongoose.connection.close());

const seedItems = async () => {
  await Item.deleteMany({});
  for (let i = 0; i < items.length; i++) {
    const item = new Item({
      desc: `${items[i].desc}`,
      update: `${items[i].update}`,
      dueDate: `${items[i].dueDate}`,
      owner: `${items[i].owner}`,
    });
    await item.save();
  }
};

seedItems().then(() => mongoose.connection.close());
