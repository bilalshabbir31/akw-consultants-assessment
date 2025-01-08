import mongoose from "mongoose";

const KycSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  name: { type: String, required: true },
  email: { type: String, required: true },
  address: String,
  documentType: String,
  idDocument: String,
  status: {
    type: String,
    default: "pending",
  },
  submittedAt: { type: Date, default: Date.now },
});

const Kyc = mongoose.model("Kyc", KycSchema);

export default Kyc;
