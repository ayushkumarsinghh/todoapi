let todos = [];

exports.getTodos = (req, res) => {
    res.json(todos);
};

exports.addTodo = (req, res) => {
    const task = req.body.task;

    if (!task || task.trim() === "") {
        return res.status(400).json({ message: "Task cannot be empty" });
    }

    todos.push({ task, done: false });

    res.json({ message: "Task added", data: todos });
};

exports.deleteTodo = (req, res) => {
    const index = Number(req.params.index);

    if (index >= 0 && index < todos.length) {
        todos.splice(index, 1);
        res.json({ message: "Deleted", data: todos });
    } else {
        res.status(400).json({ message: "Invalid index" });
    }
};

exports.markDone = (req, res) => {
    const index = Number(req.params.index);

    if (index >= 0 && index < todos.length) {
        todos[index].done = true;
        res.json({ message: "Marked as Done", data: todos });
    } else {
        res.status(400).json({ message: "Invalid index" });
    }
};