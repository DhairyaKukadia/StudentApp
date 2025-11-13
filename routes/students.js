const express = require("express");
const Student = require("../models/Student");
const logAction = require("../middleware/logger");

const router = express.Router();

// Get (search + pagination)
router.get("/", async (req, res) => {
  const { search = "" } = req.query;

  let query = {
    name: { $regex: search, $options: "i" }
  };

  const students = await Student.find(query).sort({ createdAt: -1 });
  res.json({ students });
});

// Add
router.post("/", async (req, res) => {
  const s = await Student.create(req.body);

  await logAction(req.user.id, "Add Student", s.name);
  res.json(s);
});

// Update
router.put("/:id", async (req, res) => {
  const s = await Student.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  await logAction(req.user.id, "Update Student", s.name);
  res.json(s);
});

// Delete
router.delete("/:id", async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.json({ msg: "Deleted" });
});

module.exports = router;
