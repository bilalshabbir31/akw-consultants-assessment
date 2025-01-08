import express from "express";
import "dotenv/config";
import cors from "cors";
import { connectDB } from "./config/db.js";
import authRouter from "./routes/auth/authRoutes.js";
import UserkycRouter from "./routes/user/kycRoutes.js";
import AdminkycRouter from "./routes/admin/kycRoutes.js";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);

// middlewares
app.use(express.json());

// routes
app.use("/api/auth", authRouter);
app.use("/api/user/kyc", UserkycRouter);
app.use("/api/admin/kyc", AdminkycRouter);

app.listen(PORT, () => {
  console.log(`Server is running on PORT:${PORT}`);
  connectDB();
});
