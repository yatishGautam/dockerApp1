const express = require("express");
const { User } = require("./models/Models");
const processTransaction = require("./service/transferfund");

const router = express.Router();

router.post("/new", async (req, res) => {
	try {
		const { fromUser, toUser, amount } = req.body;
		if (!fromUser || !toUser || !amount) {
			console.log("transcation missing details");
			return res
				.status(400)
				.json({ message: "Please provide a valid transaction" });
		}
		const fromUserObj = await User.findOne({ email: fromUser });
		const toUserObj = await User.findOne({ email: toUser });

		if (!fromUserObj || !toUserObj) {
			console.log("transcation user issue ");
			return res.status(400).json({ message: "Please provide valid users" });
		}
		console.log("amount:: ", amount);
		const amountCent = amount * 100;

		const { message } = await processTransaction(
			fromUserObj._id,
			toUserObj._id,
			amountCent
		);

		res.status(200).json({ message });
	} catch (e) {
		console.log("error completing transaction ", e);
		return res.status(500).json({ message: "Internal server error" });
	}
});

module.exports = router;
