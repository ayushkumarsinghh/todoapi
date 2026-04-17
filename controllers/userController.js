const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
    const { username, email, password } = req.body;

    // 1. Validate input
    if (!username || !email || !password) {
        return res.status(400).json({ message: "All fields required" });
    }

    try {
        // 2. Check if user already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // 3. Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // 4. Create user
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        // 5. Save to DB
        await newUser.save();

        // 6. Send safe response (NO password)
        return res.json({
            message: "Signup successful",
            data: {
                username: newUser.username,
                email: newUser.email,
                _id: newUser._id
            }
        });

    } catch (error) {
        return res.status(500).json({ message: "Server error" });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "All fields required" });
    }

    try {
        // 1. find user
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // 2. compare password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign(
                { id: user._id, email: user.email },
                "secretkey",
                { expiresIn: "1h" }
            );
        // 3. success
        return res.json({
            message: "Login successful",
            token: token,
            data: {
                username: user.username,
                email: user.email,
                _id: user._id
            }
        });

    } catch (error) {
        console.log("Error:",error); 
        return res.status(500).json({ message: "Server error" });
    }
};