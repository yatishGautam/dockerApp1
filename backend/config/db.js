import mongoose from "mongoose";

const mongo_uri = process.env.MONGO_URI;

const connectToDB = async () => {
	try {
		await mongoose.connect(mongo_uri, () => {
			console.log(`KHE KHE DB Connected`);
		});
	} catch (e) {
		console.log("db connection issue :", e);
	}
};
