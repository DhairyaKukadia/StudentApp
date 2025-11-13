const express = require("express");
const Student = require("../models/Student");
const { Parser } = require("json2csv");
const logAction = require("../middleware/logger");

const router = express.Router();

router.get("/students", async (req, res) => {
  const students = await Student.find();

  const fields = ["name", "roll", "branch", "email", "createdAt"];
  const parser = new Parser({ fields });
  const csv = parser.parse(students);

  res.header("Content-Type", "text/csv");
  res.attachment("students.csv");
  res.send(csv);

  await logAction(req.user.id, "Export CSV", "");
});

module.exports = router;
