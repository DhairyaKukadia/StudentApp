const express = require("express");
const Student = require("../models/Student");

const router = express.Router();

router.get("/", async (req, res) => {
  const total = await Student.countDocuments();

  const byBranch = await Student.aggregate([
    { $match: { branch: { $exists: true, $ne: "" } } },
    { $group: { _id: "$branch", count: { $sum: 1 } } }
  ]);

  const latest = await Student.find().sort({ createdAt: -1 }).limit(5);

  res.json({ total, byBranch, latest });
});

module.exports = router;
