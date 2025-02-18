const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

const authMiddleWare = (req, res, next) => {
	try {
		const authToken = req.headers.authorization;
		if (!authToken || !authToken.startsWith("Bearer")) {
			return res.status(400).json({ message: "Invalid token" });
		}
		const token = authToken.split(" ")[1];
		const decoded = jwt.verify(token, JWT_SECRET);
		req.user = decoded;
		next();
	} catch (e) {
		console.log("token error ", e);
		res.status(400).json({ message: "invalid token" });
	}
};

module.exports = authMiddleWare;
