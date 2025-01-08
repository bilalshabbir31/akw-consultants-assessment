import express from "express";
import { authMiddleware, roleMiddleware } from "../../middleware/auth.js";
import { getAllRequestedUsers, getKycStats, updateRequestStatus } from "../../controllers/admin/kycController.js";

const router = express.Router();

router.use([authMiddleware, roleMiddleware(["admin"])]);

router.get("/stats", getKycStats);
router.get("/requests", getAllRequestedUsers);
router.put("/:id/status", updateRequestStatus);

export default router;
