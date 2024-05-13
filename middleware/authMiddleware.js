//external imports
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const authGuard = async (req, res, next) => {
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith("Bearer")
	) {
		try {
			const token = req.headers.authorization.split(" ")[1];
			const { _id } = jwt.verify(token, process.env.SECRET_KEY);

			req.user = await User.findById(_id).select("-password");
			next();
		} catch (error) {
			let err = new Error("Not authorized, Token Failed!");
			error.statusCode = 401;
			next(err);
		}
	} else {
		let error = new Error("Not authorized, No Token");
		error.statusCode = 401;
		next(error);
	}
};


const adminGuard = (req, res, next) => {
	if (req.user && req.user.admin) {
		next();
	} else {
		let error = new Error("Not authorized as admin");
		error.statusCode = 401;
		next(error);
	}
};

module.exports = { authGuard, adminGuard };
