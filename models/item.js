const mongoose = require("mongoose");
const { Schema } = mongoose;

const itemSchema = new Schema({
  title: String,
  desc: String,
  update: [String],
  dueDate: Number,
  owner: {
    type: Schema.Types.ObjectId,
    ref: "Employee",
  },
  complete: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Item", itemSchema);
