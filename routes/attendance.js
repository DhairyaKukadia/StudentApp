const express = require("express");
const Attendance = require("../models/Attendance");
const logAction = require("../middleware/logger");

const router = express.Router();

router.post("/mark", async (req, res) => {
  const a = await Attendance.create(req.body);
  await logAction(req.user.id, "Marked Attendance", a.studentId);
  res.json({ msg: "Attendance marked" });
});

router.get("/:studentId", async (req, res) => {
  const data = await Attendance.find({ studentId: req.params.studentId });
  res.json(data);
});

module.exports = router;
