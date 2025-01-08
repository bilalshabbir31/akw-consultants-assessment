import express from "express";
import {
  addKYCRequest,
  getAllKYCRequests,
} from "../../controllers/user/kycController.js";
import { upload } from "../../utils/fileUploader.js";
import { authMiddleware, roleMiddleware } from "../../middleware/auth.js";

const router = express.Router();

router.use([authMiddleware, roleMiddleware(["user"])]);

router.get("/", getAllKYCRequests);
router.post("/", upload.single("idDocument"), addKYCRequest);

export default router;
