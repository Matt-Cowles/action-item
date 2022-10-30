const employees = require("./employees");
const Employee = require("../models/employee");

const items = require("./items");
const Item = require("../models/item");

const mongoose = require("mongoose");
const { findById } = require("../models/employee");

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
//       // items: `${employees[i].items}`,
//     });
//     console.log(`${employees[i].name}`);
//     await employee.save();
//   }
// };

// seedDB().then(() => mongoose.connection.close());

const seedItems = async () => {
  // const employee = await Employee.findById("635dcf26e096f4926f67b068");
  // employee.items.splice(0, employee.items.length);
  await Item.deleteMany({});
  for (let i = 0; i < items.length; i++) {
    const item = new Item({
      title: `${items[i].title}`,
      desc: `${items[i].desc}`,
      update: `${items[i].update}`,
      dueDate: `${items[i].dueDate}`,
      owner: `635dcf26e096f4926f67b068`,
    });
    await item.save();
  }
};

seedItems().then(() => mongoose.connection.close());
