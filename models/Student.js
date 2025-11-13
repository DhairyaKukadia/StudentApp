const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
  name: String,
  roll: String,
  branch: String,
  email: String
}, { timestamps: true });

module.exports = mongoose.model("Student", StudentSchema);
