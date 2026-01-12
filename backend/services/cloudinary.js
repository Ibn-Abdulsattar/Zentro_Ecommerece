import { v2 as cloudinary } from "cloudinary";

 const  Cloudinary = async( file) => {
  return await new Promise((resolve, reject) => {
          // Create pipeline one end of pipe is connected to cloudinary server
          const stream = cloudinary.uploader.upload_stream(
            { folder: "zentro_profile" },
            (error, uploadResult) => {
              if (error) reject(error);
              else resolve(uploadResult);
            }
          );
  
          stream.end(file.buffer); // Push buffer to cloudinary
        });
};

export default Cloudinary;
