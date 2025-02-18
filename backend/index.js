const express = require("express");
const dotenv = require("dotenv");
const connectToDb = require("./config/db");
dotenv.config();
const app = express();
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3001;
const cors = require("cors");
const loginRouter = require("./src/Login");

connectToDb();

app.use(cors());
app.use(bodyParser.json());

app.use("/api/v1", loginRouter);

app.listen(PORT, () => {
	console.log(`server running on port ${PORT}`);
});
