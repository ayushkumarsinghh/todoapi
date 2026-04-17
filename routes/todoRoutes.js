const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/authMiddleware");

const {
    getTodos,
    getTodoById,
    addTodo,
    deleteTodo,
    markDone,
    updateTodo
} = require("../controllers/todoController");

// 🔥 Protected routes
router.get("/todos", auth, getTodos);
router.get("/todos/:id", auth, getTodoById);
router.post("/todos", auth, addTodo);
router.delete("/todos/:id", auth, deleteTodo);
router.patch("/todos/:id", auth, markDone);
router.put("/todos/:id", auth, updateTodo);

module.exports = router;