const mongoose = require("mongoose");

const connectToDB = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URI);
		console.log("✅ Connected to MongoDB");
	} catch (e) {
		console.log("db connection issue :", e);
		process.exit(1);
	}
};

module.exports = connectToDB;
