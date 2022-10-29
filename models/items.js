const mongoose = require("mongoose");
const { Schema } = mongoose;

const itemSchema = new Schema({
  desc: String,
  update: [String],
  dueDate: Number,
  owner: {
    type: Schema.Types.ObjectId,
    ref: "Employee",
  },
  complete: Boolean,
});

module.exports = mongoose.model("Items", itemSchema);
