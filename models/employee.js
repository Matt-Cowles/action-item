const mongoose = require("mongoose");
const { Schema } = mongoose;

const EmployeeSchema = new Schema({
  name: String,
  jobTitle: String,
});

module.exports = mongoose.model("Employee", EmployeeSchema);
