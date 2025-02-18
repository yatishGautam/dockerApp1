const express = require("express");
const User = require("../models/userSchema");
const router = express.router();
const bcrypt = require("bcrypt");

router.put("/", async (req, res) => {
	try {
		const userId = req.user.userId;
		const { password, name } = req.body;
		const user = await User.findById(userId);
		if (!user) {
			return res.status(400).json({ message: "Invalid user" });
		}

		if (password) {
			const saltRounds = 10;
			const hashedPassword = await bcrypt.hash(password, saltRounds);
			user.password = hashedPassword;
		}

		if (name) {
			user.name = name;
		}

		await user.save();

		return res.status(200).json({
			message: `update successful for email ${user.email}`,
		});
	} catch (e) {
		console.log("error in updating user ", e);
		return res.status(500).json({ message: "Internal server error" });
	}
});

router.get("/bulk", async (req, res) => {
	try {
	} catch (e) {
		console.log("issue fetching users ", e);
		return res.status(500).json({ message: "internal server error" });
	}
});
