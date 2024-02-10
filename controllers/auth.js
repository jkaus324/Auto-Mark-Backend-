import {exec} from 'child_process';
import User from '../models/user.js';

export const login = async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        if (user.password === password) {
            return res.json({ success: true, message: "Logged in successfully", email: email });
        } else {
            return res.status(401).json({ success: false, message: "Wrong password" });
        }
    } catch (err) {
        return res.status(500).json({ success: false, message: "Something went wrong", error: err.message });
    }
}

export const register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        // Create new user
        const newUser = new User({ username, email, password });
        await newUser.save();

        return res.status(201).json({ success: true, message: "User registered successfully", user: newUser });
    } catch (err) {
        return res.status(500).json({ success: false, message: "Something went wrong", error: err.message });
    }
}

