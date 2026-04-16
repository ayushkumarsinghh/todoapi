require("dotenv").config(); // load env variables

const express = require("express");
const mongoose = require("mongoose");

const app = express();

// 🔥 MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

// Middleware
app.use(express.json());

// Routes
const todoRoutes = require("./routes/todoRoutes");
app.use("/", todoRoutes);

// Server start
app.listen(3000, () => {
    console.log("Server running on port 3000");
});