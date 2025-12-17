import mongoose from "mongoose";
import slugify from "slugify";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      default: "",
    },
    image: {
      type: String, // Cloudinary URL
      default: "",
    },
  },
  { timestamps: true }
);

// auto-generate slug
categorySchema.pre("validate", function (next) {
  if (this.name) {
    this.slug = slugify(this.name, { lower: true, replacement: '-', strict: true, });
  }
  next();
});

export default mongoose.model("Category", categorySchema);
