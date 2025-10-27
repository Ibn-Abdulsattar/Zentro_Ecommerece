import Media from "../model/Media.js";
import cloudinary from "../config/cloudinary.js";
import fs from "fs";

/**
 * ✅ UPLOAD MEDIA
 * - Supports image/video upload
 * - Stores Cloudinary URL + public_id in DB
 */
export const uploadMedia = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Upload to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "auto", // auto-detect image/video
      folder: "ecommerce_media",
    });

    // Create media record in DB
    const media = new Media({
      url: uploadResult.secure_url,
      public_id: uploadResult.public_id,
      altText: req.body.altText || "",
      type: uploadResult.resource_type,
      uploadedBy: req.body.uploadedBy || "admin",
    });

    const savedMedia = await media.save();

    // Remove file from local temp storage
    fs.unlinkSync(req.file.path);

    res.status(201).json({
      success: true,
      message: "Media uploaded successfully",
      data: savedMedia,
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * ✅ DELETE MEDIA
 * - Removes from Cloudinary and Database
 */
export const deleteMedia = async (req, res) => {
  try {
    const { id } = req.params;

    const media = await Media.findById(id);
    if (!media) {
      return res.status(404).json({ message: "Media not found" });
    }

    // Delete from Cloudinary
    await cloudinary.uploader.destroy(media.public_id, {
      resource_type: media.type === "video" ? "video" : "image",
    });

    // Delete from DB
    await media.deleteOne();

    res.status(200).json({
      success: true,
      message: "Media deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
