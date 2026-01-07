import { checkSchema, validationResult } from "express-validator";

// 1. Schema for Registration
export const registerSchema = checkSchema({
  email: { isEmail: true, normalizeEmail: true },
  username: { notEmpty: true, isLength: {min:3} },
  password: {
    notEmpty: true,
    isStrongPassword: {   //these methods come from valdator.js
      minLength: 8,
      minLowerCase: 1,
      minUpperCase: 1,
      minNumbers: 1,
      minSymbols: 1,
      returnScore: false,
    },
  },
});

// 2. Schema for Login
export const loginSchema = checkSchema({
  email: { isEmail: true, normalizeEmail: true },
  password: {
    notEmpty: true,
    isStrongPassword: {
      minLength: 8,
      minLowerCase: 1,
      minUpperCase: 1,
      minNumbers: 1,
      minSymbols: 1,
      returnScore: false,
    },
  },
});

// 3. Schema for OTP Verification
export const otpSchema = checkSchema({
  email: { isEmail: true, normalizeEmail: true },
  code: { isLength: { options: { min: 6, max: 6 } } },
});

// Generic middleware to handle the error response
export const validate = (req, res, next) => {
  //  1. Gather all the "notes" about validation failures
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
