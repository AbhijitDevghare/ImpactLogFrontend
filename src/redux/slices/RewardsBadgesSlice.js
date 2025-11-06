// src/redux/slices/RewardsBadgesSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// 🔹 Get all badges (system-wide)
export const fetchBadges = createAsyncThunk(
  "rewardsBadges/fetchBadges",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:3002/reward-badges/getBadges", {
        headers: { Authorization: `Bearer ${token}` },
      });

      
      return response.data.badges;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Error fetching badges");
    }
  }
);

// 🔹 Get user points
export const fetchUserPoints = createAsyncThunk(
  "rewardsBadges/fetchUserPoints",
  async (userId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:3002/reward-badges/points/${userId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data; // make sure backend sends { points: ... }
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Error fetching user points");
    }
  }
);

// 🔹 Get user badges
export const fetchUserBadges = createAsyncThunk(
  "rewardsBadges/fetchUserBadges",
  async (userId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:3002/reward-badges/badges/${userId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("BADGES",response)
      return response.data; // make sure backend sends { badges: [...] }
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Error fetching user badges");
    }
  }
);

const rewardsBadgesSlice = createSlice({
  name: "rewardsBadges",
  initialState: {
    badges: [],        // system badges
    userBadges: [],    // earned badges by user
    userPoints: 0,     // earned points by user
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ✅ fetchBadges (system-wide)
      .addCase(fetchBadges.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBadges.fulfilled, (state, action) => {
        state.loading = false;
        console.log("action",action)
        state.badges = action.payload;
      })
      .addCase(fetchBadges.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ fetchUserPoints
      .addCase(fetchUserPoints.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserPoints.fulfilled, (state, action) => {
        state.loading = false;
        state.userPoints = action.payload;
        console.log("USER POINTS FULLDFILLED STAEE",action)
      })
      .addCase(fetchUserPoints.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ fetchUserBadges
      .addCase(fetchUserBadges.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserBadges.fulfilled, (state, action) => {
        state.loading = false;
        state.userBadges = action.payload;
        console.log("USER BADGES in the fullfill state",action)
      })
      .addCase(fetchUserBadges.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default rewardsBadgesSlice.reducer;
