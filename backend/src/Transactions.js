const express = require("express");
const { User } = require("./models/Models");
const processTransaction = require("./service/transferfund");

const router = express.Router();

router.post("/newtransaction", async (req, res) => {
	try {
		const { fromUser, toUser, amount } = req.body;
		if (!fromUser || !toUser || !amount) {
			console.log("transcation missing details");
			return res
				.status(400)
				.json({ message: "Please provide a valid transaction" });
		}
		const fromUserObj = await User.findById(fromUserId).session(session);
		const toUserOBJ = await User.findById(toUserId).session(session);

		if (!fromUserObj || !toUserObj) {
			console.log("transcation user issue ");
			return res.status(400).json({ message: "Please provide valid users" });
		}

		const amountCent = amount * 100;

		processTransaction(fromUserObj._id, toUserOBJ._id, amount);
	} catch (e) {
		console.log("error completing transaction ", e);
		return res.status(500).json({ message: "Internal server error" });
	}
});

module.exports = router;
