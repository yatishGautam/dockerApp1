const express = require("express");
const dotenv = require("dotenv");
const connectToDb = require("./config/db");
dotenv.config();
const app = express();
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3001;
const loginRouter = require("./src/Login");

connectToDb();
app.use(bodyParser.json());
app.use("/user", loginRouter);
app.listen(PORT, () => {
	console.log(`server running on port ${PORT}`);
});
