import multer from "multer";

const storage = multer.memoryStorage(); // Store file in buffer

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    // MIME (Multipurpose Internet Mail Extension) -- used to identify the format and nature of life
    cb(null, true);
  } else {
    // true mean accept and false mean reject
    cb(new Error("Only images are allowed"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 },
});

export default upload.single('avatarSrc');
