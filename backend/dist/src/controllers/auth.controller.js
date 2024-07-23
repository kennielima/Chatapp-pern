import prisma from "../db/prisma.js";
import bcryptjs from "bcryptjs";
import generateTokenSetCookie from "../utils/generateToken.js";
export const signup = async (req, res) => {
    try {
        const { fullName, username, password, confirmPassword, gender } = req.body;
        if (!fullName || !username || !password || !confirmPassword || !gender) {
            return res.status(400).json({ error: "please fill in all fields" });
        }
        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Passwords don't match" });
        }
        const user = await prisma.user.findUnique({ where: { username } });
        if (user) {
            return res.status(400).json({ error: "Username already exists" });
        }
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;
        const newUser = await prisma.user.create({
            data: {
                fullName,
                username,
                password: hashedPassword,
                gender,
                profilePic: gender === 'male' ? boyProfilePic : girlProfilePic
            }
        });
        if (newUser) {
            //  generate token in a sec
            generateTokenSetCookie(newUser.id, res);
            res.status(201).json({
                id: newUser.id,
                fullName: newUser.fullName,
                username: newUser.username,
                profilePic: newUser.profilePic
            });
        }
        else {
            res.status(400).json({ error: "Invalid user data" });
        }
    }
    catch (error) {
        console.log("ERROR: ", error.message);
        res.status(500).json({ error: "Internal Server error" });
    }
};
export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await prisma.user.findUnique({ where: { username } });
        if (!user) {
            return res.status(400).json({ error: "Invalid credentials" });
        }
        const isPwCorrect = await bcryptjs.compare(password, user.password);
        if (!isPwCorrect) {
            return res.status(400).json({ error: "Invalid credentials" });
        }
        generateTokenSetCookie(user.id, res);
        res.status(200).json({
            id: user.id,
            fullName: user.fullName,
            username: user.username,
            profilePic: user.profilePic
        });
    }
    catch (error) {
        console.log("ERROR: ", error.message);
        res.status(500).json({ error: "Interal Server error" });
    }
};
export const logout = async (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged out successfully" });
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Internal Server error" });
    }
};
export const getMe = async (req, res) => {
    try {
        const user = await prisma.user.findUnique({ where: { id: req.user.id } });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json({
            id: user.id,
            username: user.username,
            fullName: user.fullName,
            profilePic: user.profilePic
        });
    }
    catch (error) {
        console.log("ERROR: ", error.message);
        res.status(500).json({ error: "Interal Server error" });
    }
};
