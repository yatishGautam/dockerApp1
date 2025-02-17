const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || "randomSecret";

router.post("/signup", async (req, res) => {
	try {
		const { email, password } = req.body;
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(400).json({ message: "user already exists" });
		}
		const saltRounds = 10;
		const hashedPassword = await bcrypt.hash(password, saltRounds);
		const newUser = await User.create({
			email,
			password: hashedPassword,
		});
		const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, {
			expiresIn: "1d",
		});

		return res.status(200).json({
			message: "user create successfully",
			token,
		});
	} catch (e) {
		console.log("singup error: ", e);
		return res.status(500).json({ message: "Internal server error" });
	}
});

router.post("/login", async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email });
		if (!user || !password) {
			return res.status(400).json({ message: "invalid password or email" });
		}
		const isMatch = bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(400).json({ message: "invalid password or email" });
		}
		const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
			expiresIn: "1d",
		});

		res.status(200).json({
			message: "login successful",
			token,
		});
	} catch {
		console.log("login error", e);
		return res.status(500).json({ message: "Internal sever error" });
	}
});

module.exports = router;
