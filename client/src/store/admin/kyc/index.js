import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosObj from "../../../config/axios.js";

const initialState = {
  loading: false,
  error: null,
  requestedUsers: [],
  stats: null,
  request: null,
};

export const fetchAllRequestedUsers = createAsyncThunk(
  "kyc/fetchAllRequestedUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosObj.get("/admin/kyc/requests");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const fetchKycStats = createAsyncThunk(
  "kyc/fetchKycStats",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosObj.get("/admin/kyc/stats");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const updateRequestStatus = createAsyncThunk(
  "kyc/updateRequestStatus",
  async ({ requestId, status }, { rejectWithValue }) => {
    try {
      const response = await axiosObj.put(`/admin/kyc/${requestId}/status`, {
        status,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

const AdminkycSlice = createSlice({
  name: "adminkyc",
  initialState,
  reducers: {
    updateUserRequestStatus: (state, action) => {
      const { requestId, status } = action.payload;
      const request = state.requestedUsers.find(
        (request) => request?._id === requestId
      );
      if (request) {
        request.status = status;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllRequestedUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllRequestedUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.requestedUsers = action.payload.data;
      })
      .addCase(fetchAllRequestedUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchKycStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchKycStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload.data;
      })
      .addCase(fetchKycStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateRequestStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateRequestStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.updatedRequest = action.payload.data;
      })
      .addCase(updateRequestStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { updateUserRequestStatus } = AdminkycSlice.actions;

export default AdminkycSlice.reducer;
