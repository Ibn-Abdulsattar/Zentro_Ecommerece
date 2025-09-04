import jwt from "jsonwebtoken";
import ExpressError from "../utils/expressError.js";
import User from "../model/user.js";

// This middleware checks the auth cookie, verifies JWT, and attaches the user to req.user
const auth = async (req, res, next) => {
  try {
    const token = req.cookies?.token;
    if (!token) throw new ExpressError("Not authenticated", 401);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    if (!user) throw new ExpressError("User not found", 404);

    req.user = user;
    next();
  } catch (err) {
    next(new ExpressError("Unauthorized: " + err.message, 401));
  }
};

export default auth;
