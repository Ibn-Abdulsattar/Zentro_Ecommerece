import User from "../model/user.js";
import ExpressError from "../utils/expressError.js";
import generateToken from "../utils/generateToken.js";
import wrapAsync from "../utils/wrapAsync.js";

export const signup = wrapAsync(async (req, res) => {
  const { username, email, password } = req.body;
  const previousUser = await User.findOne({ email });

  if (previousUser) {
    throw new ExpressError("User already exist!", 400);
  }

  const newUser = await User.create({ username, email, password });

  const token = generateToken(newUser._id);

  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 48 * 60 * 60 * 2000,
  });

  res.status(200).send("You are registered successfuly!");
});

export const signin = wrapAsync(async (req, res) => {
  const { email, password } = req.body;
  const previousUser = await User.findOne({ email });

  if (!previousUser) {
    throw new ExpressError("You are not registered!", 400);
  }

  const isMatch = await previousUser.comparePassword(password);
  if (!isMatch) {
    throw new ExpressError("Please enter correct password!", 400);
  }

  const token = generateToken(previousUser._id);

  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    samaSite: "none",
    maxAge: 48 * 60 * 60 * 2000,
  });

  res.status(200).send("Welcome back to my Zentro");
});

export const logout = wrapAsync(async (req, res) => {
  res.clearCookie("token",{
    httpOnly: true,
    secure: true,
    samaSite: "none",
  });

  res.status(200).send("You are logged out");
});
