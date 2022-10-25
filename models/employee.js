const mongoose = require("mongoose");
const { Schema } = mongoose;

const EmployeeSchema = new Schema({
  name: String,
  position: String,
  // worker: mongoose.Schema.ObjectId,
});

module.exports = mongoose.model("Employee", EmployeeSchema);
