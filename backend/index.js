const express = require("express");
const dotenv = require("dotenv");

const app = express();
dotenv.config();
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
	console.log(`server running on port ${PORT}`);
});
