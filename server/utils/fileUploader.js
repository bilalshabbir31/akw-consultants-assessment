import multer from "multer";
import cloudinary from "../config/cloudinary.js";

const storage = new multer.memoryStorage();

async function fileUpload(file, fileType) {
  const result = await cloudinary.uploader.upload(
    file,
    {
      resource_type: fileType,
    },
    (error, result) => {
      if (error) {
        throw new Error("File upload failed");
      }
      return result;
    }
  );

  return result.secure_url;
}

const upload = multer({ storage });

export { upload, fileUpload };
