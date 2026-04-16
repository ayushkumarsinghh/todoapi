const express = require("express");
const router = express.Router();

const {
    getTodos,
    getTodoById,
    addTodo,
    deleteTodo,
    markDone,
    updateTodo
} = require("../controllers/todoController");

router.get("/todos", getTodos);
router.get("/todos/:id", getTodoById);
router.post("/todos", addTodo);
router.delete("/todos/:id", deleteTodo);
router.patch("/todos/:id", markDone);
router.put("/todos/:id", updateTodo);


module.exports = router;