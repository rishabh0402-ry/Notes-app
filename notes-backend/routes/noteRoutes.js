const express = require("express");
const Note = require("../models/Note");
const authMiddleware = require("../middleware/authMiddleware"); // MUST be function

const router = express.Router();

/* =====================
   ADD NOTE
===================== */
router.post("/notes", authMiddleware, async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "Title and content required" });
    }

    const note = await Note.create({
      user: req.user,
      title,
      content,
    });

    res.status(201).json(note);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add note" });
  }
});

/* =====================
   GET NOTES
===================== */
router.get("/notes", authMiddleware, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user }).sort({ createdAt: -1 });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch notes" });
  }
});

/* =====================
   DELETE NOTE
===================== */
router.delete("/notes/:id", authMiddleware, async (req, res) => {
  try {
    await Note.findOneAndDelete({
      _id: req.params.id,
      user: req.user,
    });

    res.json({ message: "Note deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete note" });
  }
});

module.exports = router;
