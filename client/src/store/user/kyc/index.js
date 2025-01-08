import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosObj from "../../../config/axios";

const initialState = {
  kycRequests: [],
  loading: false,
  error: null,
}

export const addKYCRequest = createAsyncThunk(
  "kyc/addKYCRequest",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axiosObj.post("/user/kyc/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message
      );
    }
  }
);

export const fetchUserKYCRequests = createAsyncThunk(
  "kyc/fetchUserKYCRequests",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosObj.get('/user/kyc');
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data
      );
    }
  }
);

const userKycSlice = createSlice({
  name: "userKyc",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addKYCRequest.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(addKYCRequest.fulfilled, (state, action) => {
      state.loading = false; 
      if (action.payload.data) {
        state.kycRequests = [...state.kycRequests, action.payload.data];
      }     
    });
    builder.addCase(addKYCRequest.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(fetchUserKYCRequests.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchUserKYCRequests.fulfilled, (state, action) => {
      state.loading = false;      
      state.kycRequests = action.payload.data;
    });
    builder.addCase(fetchUserKYCRequests.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.kycRequests = []
    });
  },
});

export default userKycSlice.reducer;
