const employees = require("./employees");
const Employee = require("../models/employee");
const mongoose = require("mongoose");

async function main() {
  await mongoose.connect("mongodb://localhost:27017/yelp-camp");
}
main().then((data) => console.log("Connected"));
main().catch((err) => console.log("AN ERROR!", err));

const seedDB = async () => {
  await Employee.deleteMany();
  for (let i = 0; i < 9; i++) {
    const employee = await Employee({
      name: `${employees[i].name}`,
      position: `${employees[i].position}`,
    });
  }
  await employee.bulkSave();
};

seedDB().then(() => mongoose.connection.close());
