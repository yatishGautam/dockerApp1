const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User, Account } = require("./models/Models");
const { default: mongoose } = require("mongoose");
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || "randomSecret";

router.post("/signup", async (req, res) => {
	const session = await mongoose.startSession();
	try {
		session.startTransaction();
		const { email, password } = req.body;
		const existingUser = await User.findOne({ email }).session(session);
		if (existingUser) {
			session.abortTransaction();
			session.endSession();
			return res.status(400).json({ message: "user already exists" });
		}
		const saltRounds = 10;
		const hashedPassword = await bcrypt.hash(password, saltRounds);
		const [newUser] = await User.create(
			[
				{
					email,
					password: hashedPassword,
				},
			],
			{ session }
		);

		const newBalance = await Account.create(
			[
				{
					userId: newUser._id,
					balance: 0,
				},
			],
			{ session }
		);

		const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, {
			expiresIn: "1d",
		});
		await session.commitTransaction();
		return res.status(200).json({
			message: "user create successfully",
			token,
		});
	} catch (e) {
		console.log("singup error: ", e);
		await session.abortTransaction();
		return res.status(500).json({ message: "Internal server error" });
	} finally {
		await session.endSession();
	}
});

router.post("/login", async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email });
		if (!user || !password) {
			return res.status(400).json({ message: "invalid password or email" });
		}
		const isMatch = await bcrypt.compare(password, user.password);
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
	} catch (e) {
		console.log("login error", e);
		return res.status(500).json({ message: "Internal sever error" });
	}
});

module.exports = router;
