import mongoose from "mongoose";

const mediaSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
    },
    public_id: {
      type: String, // Cloudinary public ID
      required: true,
    },
    altText: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      enum: ["image", "video"],
      default: "image",
    },
    uploadedBy: {
      type: String, // Optional (admin name or ID)
    },
  },
  { timestamps: true }
);

export default mongoose.model("Media", mediaSchema);
