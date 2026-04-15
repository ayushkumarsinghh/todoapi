const express = require("express");
const app = express();

app.use(express.json());

let todos = [];

app.get("/todos", (req, res) => {
    res.json(todos);
});

app.post("/todos", (req, res) => {
    const task = req.body.task;
    if (!task || task.trim() === "") {
        return res.json({ message: "Task cannot be empty" });
    }
    todos.push({ task: task, done: false });

    res.json(todos);
});

app.delete("/todos/:index", (req, res) => {
    const index = Number(req.params.index);

    if (index >= 0 && index < todos.length) {
        todos.splice(index, 1);
        res.json({ message: "Deleted" });
    } else {
        res.json({ message: "Invalid" });
    }
});

app.put("/todos/:index", (req, res) => {
    const index = Number(req.params.index);

    if (index >= 0 && index < todos.length) {
        todos[index].done = true;
        res.json({ message: "Marked as Done" });
    } else {
        res.json({ message: "Invalid" });
    }
});
app.listen(3000, () => {
    console.log("Server running on port 3000");
});