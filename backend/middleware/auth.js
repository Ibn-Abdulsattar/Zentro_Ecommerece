import jwt from "jsonwebtoken";
import ExpressError from "../utils/expressError.js";
import User from "../model/user.js";

const auth = (role = "user")=> async (req, res, next) => {
  try {
    const token = role === "user" ? req.cookies?.userToken: req.cookies?.adminToken
    if (!token) throw new ExpressError("Not authenticated", 401);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    if (!user) throw new ExpressError("User not found", 404);

    if(role === "admin" && user.role !== "admin"){
      throw new ExpressError("Admin access only", 403);
    }

    req.user = user;
    next();
  } catch (err) {
    next(new ExpressError("Unauthorized: " + err.message, 401));
  }
};

export default auth;
