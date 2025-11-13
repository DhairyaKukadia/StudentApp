const mongoose = require("mongoose");

const LogSchema = new mongoose.Schema({
  action: String,
  details: String,
  timestamp: { type: Date, default: Date.now },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

module.exports = mongoose.model("Log", LogSchema);
