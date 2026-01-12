import { StatusCodes } from "http-status-codes";
import User from "../models/User.js";
import Cloudinary from "../services/cloudinary.js";

export const profile = async (req, res) => {
  const user = await User.findByPk(req.user.user_id, {
    attributes: ["user_id", "username", "email", "avatar_url", "phone_no"],
  });
  if (!user)
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "User not found" });

  return res.status(200).json({
    message: "Welcome back!",
    user: {
      id: user.user_id,
      username: user.username,
      email: user.email,
      avatar_url: user.avatar_url,
      phone_no: user.phone_no,
    },
  });
};

export const updateProfile = async (req, res) => {
  const { username, phoneNo } = req.body;
  const userId = req.user.user_id;

  let avatar_url = req.user.avatar_url; // Default to existing photo

  const file = req.file;
  if (req.file) {
    try {
      const result = await Cloudinary(file);

      avatar_url = result.secure_url; // Cloud_link
      console.log("result.secure_url =", result.secure_url);
      console.log("Cloudinary URL:", result.secure_url);
      
    } catch (err) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "Image upload failed" });
    }
  }

  const [rowsAffected, updatedUser] = await User.update(
    {
      avatar_url: avatar_url,
      username: username,
      phone_no: phoneNo,
    },
    {
      where: { user_id: userId },
      attributes: { exclude: ["password"] },
      returning: true,
      plain: true,
    }
  );

  if (rowsAffected === 0) {
    return res.status(StatusCodes.NOT_FOUND).json({
      message: "User not found or no changes made",
    });
  }

  return res
    .status(StatusCodes.OK)
    .json({ message: "Profile Updated successfuly!", user: updatedUser });
};
