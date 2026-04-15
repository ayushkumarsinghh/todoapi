const express = require("express");
const router = express.Router();

const {
    getTodos,
    addTodo,
    deleteTodo,
    markDone
} = require("../controllers/todoController");

router.get("/todos", getTodos);
router.post("/todos", addTodo);
router.delete("/todos/:index", deleteTodo);
router.put("/todos/:index", markDone);

module.exports = router;