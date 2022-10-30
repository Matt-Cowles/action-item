const mongoose = require("mongoose");
const { Schema } = mongoose;

const EmployeeSchema = new Schema({
  name: String,
  position: String,
  items: [
    {
      type: Schema.Types.ObjectId,
      ref: "Item",
    },
  ],
});

module.exports = mongoose.model("Employee", EmployeeSchema);
