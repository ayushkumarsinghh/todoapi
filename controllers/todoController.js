const Todo = require("../models/Todo");

// Get all todos
exports.getTodos = async (req, res) => {
    try {
        const todos = await Todo.find();

        return res.json(todos);
    } catch (error) {
        return res.status(500).json({ message: "Server error" });
    }
};

// Get todo by ID
exports.getTodoById = (req, res) => {
    const todoId = Number(req.params.id);

    if (isNaN(todoId)) {
        return res.status(400).json({ message: "Invalid ID" });
    }

    const todo = todos.find(t => t.id === todoId);

    if (!todo) {
        return res.status(404).json({ message: "Todo not found" });
    }

    return res.json(todo);
};

// Add todo
exports.addTodo = async (req, res) => {
    const task = req.body.task;

    if (!task || task.trim() === "") {
        return res.status(400).json({ message: "Task cannot be empty" });
    }

    try {
        const newTodo = new Todo({ task });

        await newTodo.save();

        return res.json({
            message: "Todo added",
            data: newTodo
        });

    } catch (error) {
        return res.status(500).json({ message: "Server error" });
    }
};

// Delete todo by ID
exports.deleteTodo = async (req, res) => {
    const id = req.params.id;

    try {
        const deletedTodo = await Todo.findByIdAndDelete(id);

        if (!deletedTodo) {
            return res.status(404).json({ message: "Todo not found" });
        }

        return res.json({
            message: "Todo deleted",
            data: deletedTodo
        });

    } catch (error) {
        return res.status(400).json({ message: "Invalid ID" });
    }
};
// Mark todo as done
exports.markDone = async (req, res) => {
    const id = req.params.id;

    try {
        const updatedTodo = await Todo.findByIdAndUpdate(
            id,
            { done: true },
            { new: true }
        );

        if (!updatedTodo) {
            return res.status(404).json({ message: "Todo not found" });
        }

        return res.json({
            message: "Todo marked as done",
            data: updatedTodo
        });

    } catch (error) {
        return res.status(400).json({ message: "Invalid ID" });
    }
};

exports.updateTodo = async (req, res) => {
    const id = req.params.id;
    const task = req.body.task;

    if (!task || task.trim() === "") {
        return res.status(400).json({ message: "Task cannot be empty" });
    }

    try {
        const updatedTodo = await Todo.findByIdAndUpdate(
            id,
            { task },
            { new: true }
        );

        if (!updatedTodo) {
            return res.status(404).json({ message: "Todo not found" });
        }

        return res.json({
            message: "Todo updated successfully",
            data: updatedTodo
        });

    } catch (error) {
        return res.status(400).json({ message: "Invalid ID" });
    }
};