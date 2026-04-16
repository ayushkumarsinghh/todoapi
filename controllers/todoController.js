let todos = [];
let nextId = 1;

// Get all todos
exports.getTodos = (req, res) => {
    return res.json(todos);
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
exports.addTodo = (req, res) => {
    const task = req.body.task;

    if (!task || task.trim() === "") {
        return res.status(400).json({ message: "Task cannot be empty" });
    }

    const id = nextId++;
    
    const newTodo = {
        id,
        task,
        done: false
    };

    todos.push(newTodo);

    return res.json({
        message: "Todo added",
        data: newTodo
    });
};

// Delete todo by ID
exports.deleteTodo = (req, res) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID" });
    }

    const index = todos.findIndex(t => t.id === id);

    if (index === -1) {
        return res.status(404).json({ message: "Todo not found" });
    }

    todos.splice(index, 1);

    return res.json({
        message: "Todo deleted",
        data: { id }
    });
};

// Mark todo as done
exports.markDone = (req, res) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID" });
    }

    const todo = todos.find(t => t.id === id);

    if (!todo) {
        return res.status(404).json({ message: "Todo not found" });
    }

    todo.done = true;

    return res.json({
        message: "Todo marked as done",
        data: todo
    });
};
exports.updateTodo = (req, res) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID" });
    }

    const task = req.body.task;

    if (!task || task.trim() === "") {
        return res.status(400).json({ message: "Task cannot be empty" });
    }

    const todo = todos.find(t => t.id === id);

    if (!todo) {
        return res.status(404).json({ message: "Todo not found" });
    }

    todo.task = task;

    return res.json(todo);
};