const { default: mongoose } = require("mongoose");
const { number } = require("zod");

const userSchema = mongoose.Schema({
	email: {
		type: String,
		required: [true, "Please add an email"],
		unique: true,
		lowercase: true,
	},
	password: {
		type: String,
		required: true,
	},
	name: String,
});

const accountSchemea = mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "User",
	},
	balance: {
		type: number,
		required: true,
		default: 0,
	},
});

User = mongoose.model("User", userSchema);
Account = mongoose.model("Account", accountSchema);

module.exports = { User, Account };
