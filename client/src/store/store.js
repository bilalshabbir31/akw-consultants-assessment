import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
import userKycSlice from "./user/kyc/index";
import adminKycSlice from "./admin/kyc/index";

const store = configureStore({
  reducer: {
    auth: authSlice,
    userKyc: userKycSlice,
    adminKyc: adminKycSlice,
  },
});

export default store;
