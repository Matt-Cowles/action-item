const employees = require("./employees");
const Employee = require("../models/employee");
const mongoose = require("mongoose");

async function main() {
  await mongoose.connect("mongodb://localhost:27017/action-item");
}
main().then((data) => console.log("Connected"));
main().catch((err) => console.log("AN ERROR!", err));

const seedDB = async () => {
  await Employee.deleteMany({});
  for (let i = 0; i < employees.length; i++) {
    const employee = new Employee({
      name: `${employees[i].name}`,
      position: `${employees[i].position}`,
    });
    console.log(`${employees[i].name}`);
    await employee.save();
  }
};

seedDB().then(() => mongoose.connection.close());
