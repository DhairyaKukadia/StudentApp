const Log = require("../models/Log");

async function logAction(userId, action, details = "") {
  await Log.create({ userId, action, details });
}

module.exports = logAction;
