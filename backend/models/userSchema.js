const { default: mongoose } = require("mongoose");

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

userModel = mongoose.model("User", userSchema);

module.exports = userModel;
