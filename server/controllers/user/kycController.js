import Kyc from "../../models/Kyc.js";
import { fileUpload } from "../../utils/fileUploader.js";

const getAllKYCRequests = async (req, res) => {
  const userId = req?.user?.id
  try {
    const requests = await Kyc.find({userId}).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: requests });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Failed to fetch KYC requests" });
  }
};

const addKYCRequest = async (req, res) => {
  try {
    const { name, email, documentType, address } = req.body;
    const user = req?.user;

    if (!name || !email || !documentType || !address || !req.file) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required." });
    }

    // Allowed MIME types
    const allowedMimeTypes = [
      "application/pdf",
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/webp",
      "image/avif",
    ];

    if (!allowedMimeTypes.includes(req.file.mimetype)) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Only PDF and image files are allowed.",
        });
    }

    const fileBase64 = `data:${
      req.file.mimetype
    };base64,${req.file.buffer.toString("base64")}`;

    const fileType = req.file.mimetype === "application/pdf" ? "raw" : "auto";

    // Upload file to Cloudinary
    const idDocumentURL = await fileUpload(fileBase64, fileType);

    const newKYCRequest = new Kyc({
      userId: user?.id,
      name,
      email,
      address,
      documentType,
      idDocument: idDocumentURL,
    });

    await newKYCRequest.save();

    res.status(201).json({
      success: true,
      message: "KYC request created successfully",
      data: newKYCRequest,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Failed to create KYC request",
    });
  }
};


export { getAllKYCRequests, addKYCRequest };