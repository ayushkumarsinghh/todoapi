const Todo = require("../models/Todo");

// Get all todos (ONLY for logged-in user)
exports.getTodos = async (req, res) => {
    try {
        const todos = await Todo.find({ user: req.user.id });
        return res.json(todos);
    } catch (error) {
        console.log("ERROR:", error);   
        return res.status(500).json({ message: "Server error" });
    }
};

// Get todo by ID (ONLY if it belongs to user)
exports.getTodoById = async (req, res) => {
    const id = req.params.id;

    try {
        const todo = await Todo.findOne({ _id: id, user: req.user.id });

        if (!todo) {
            return res.status(404).json({ message: "Todo not found" });
        }

        return res.json(todo);

    } catch (error) {
        return res.status(400).json({ message: "Invalid ID" });
    }
};

// Add todo (attach user)
exports.addTodo = async (req, res) => {
    const task = req.body.task;

    if (!task || task.trim() === "") {
        return res.status(400).json({ message: "Task cannot be empty" });
    }

    try {
        const newTodo = new Todo({
            task,
            user: req.user.id   // 🔥 attach user
        });

        await newTodo.save();

        return res.json({
            message: "Todo added",
            data: newTodo
        });

    } catch (error) {
        console.log("ERROR:", error);   
        return res.status(500).json({ message: "Server error" });
    }
};

// Delete todo (ONLY if belongs to user)
exports.deleteTodo = async (req, res) => {
    const id = req.params.id;

    try {
        const deletedTodo = await Todo.findOneAndDelete({
            _id: id,
            user: req.user.id
        });

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
        const updatedTodo = await Todo.findOneAndUpdate(
            { _id: id, user: req.user.id },
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

// Update todo
exports.updateTodo = async (req, res) => {
    const id = req.params.id;
    const task = req.body.task;

    if (!task || task.trim() === "") {
        return res.status(400).json({ message: "Task cannot be empty" });
    }

    try {
        const updatedTodo = await Todo.findOneAndUpdate(
            { _id: id, user: req.user.id },
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