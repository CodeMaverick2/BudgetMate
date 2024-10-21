const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const authMiddleware = require("../middleware/authMiddleware");

router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send({
                success: false,
                message: "User already exists!",
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        res.status(201).send({
            success: true,
            message: "Registration successful! Please login.",
        });
    } catch (err) {
        console.error(err);
        res.status(500).send({
            success: false,
            message: "Server error. Please try again later.",
        });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send({
                success: false,
                message: "User does not exist. Please register.",
            });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).send({
                success: false,
                message: "Invalid password.",
            });
        }

        const token = jwt.sign({ userId: user._id }, process.env.secret_key_jwt, {
            expiresIn: "1d",
        });

        res.send({
            success: true,
            message: "Login successful!",
            token,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Server error. Please try again later.",
        });
    }
});

router.get("/get-current-user", authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.body.userId).select("-password");
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User not found.",
            });
        }

        res.send({
            success: true,
            message: "User retrieved successfully.",
            data: user,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Server error. Please try again later.",
        });
    }
});

module.exports = router;
