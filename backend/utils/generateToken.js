import jwt from "jsonwebtoken";

import ExpressError from "./expressError.js";
import { StatusCodes } from "http-status-codes";

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRE = process.env.JWT_EXPIRE || "1h";

const generateToken = (user) => {
  if (!JWT_SECRET) {
    throw new ExpressError(
      "Don't create Token",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
  return jwt.sign(
    { payload: { user_id: user.user_id, role: user.role } },
    JWT_SECRET,
    {
      expiresIn: JWT_EXPIRE,
    }
  );
};

export default generateToken;
