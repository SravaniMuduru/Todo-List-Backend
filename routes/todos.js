const express = require("express");
const Todo = require("../models/Todo");

const router = express.Router();

// GET todos (ONLY logged-in user's todos)
router.get("/", async (req, res) => {
  const todos = await Todo.find({ userId: req.userId });
  res.json(todos);
});

// ADD todo
router.post("/", async (req, res) => {
  const todo = new Todo({
    text: req.body.text,
    userId: req.userId
  });

  await todo.save();
  res.status(201).json(todo);
});

// TOGGLE completed
router.put("/:id", async (req, res) => {
  const todo = await Todo.findOne({
    _id: req.params.id,
    userId: req.userId
  });

  if (!todo) return res.status(404).json({ error: "Todo not found" });

  todo.completed = !todo.completed;
  await todo.save();
  res.json(todo);
});

// EDIT todo
router.put("/:id/edit", async (req, res) => {
  const todo = await Todo.findOne({
    _id: req.params.id,
    userId: req.userId
  });

  if (!todo) return res.status(404).json({ error: "Todo not found" });

  todo.text = req.body.text;
  await todo.save();
  res.json(todo);
});

// DELETE todo
router.delete("/:id", async (req, res) => {
  await Todo.findOneAndDelete({
    _id: req.params.id,
    userId: req.userId
  });

  res.json({ message: "Todo deleted" });
});

module.exports = router;


