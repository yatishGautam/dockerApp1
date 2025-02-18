const express = require("express");
const dotenv = require("dotenv");
const connectToDb = require("./config/db");
dotenv.config();
const app = express();
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3001;
const cors = require("cors");

const loginRouter = require("./src/Login");
const userRouter = require("./src/User");
const authMiddleWare = require("./src/middlewares/auth");

connectToDb();

app.use(cors());
app.use(bodyParser.json());

app.use("/api/v1", loginRouter);
app.use("/api/v1", authMiddleWare, userRouter);

app.listen(PORT, () => {
	console.log(`server running on port ${PORT}`);
});
