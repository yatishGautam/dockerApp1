const mongoose = require("mongoose");
const { User, Account } = require("../models/Models");

const transferFunds = async (fromUserId, toUserId, amount) => {
	const session = await mongoose.startSession();
	try {
		session.startTransaction();

		const fromUserAccount = await Account.findOne({ userId: fromUserId });
		const toUserAccount = await Account.findOne({ userId: fromUserId });

		if (!toUserAccount || !fromUserAccount) {
			throw new Error("User Accounts not found");
		} else {
			if (fromUserAccount.balance < amount) {
				throw new Error("User balance insufficient for transaction");
			}
		}

		await Account.updateOne(
			{ userId: fromUserId },
			{ $inc: { balance: -amount } }
		).session(session);

		await Account.updateOne(
			{ userId: toUserId },
			{ $inc: { balance: +amount } }
		).session(session);

		// await toUserAccount.save({ session });
		// await fromUserAccount.save({ session });

		await session.commitTransaction();
		console.log("transaction commited successfully");
		return {
			message: `transferred $${amount / 100} your updated balance $${
				fromUserAccount.balance / 100
			}`,
		};
	} catch (e) {
		console.log("error while transferring funds ", e);
		await session.abortTransaction();
		throw e;
	} finally {
		await session.endSession();
	}
};

module.exports = transferFunds;
