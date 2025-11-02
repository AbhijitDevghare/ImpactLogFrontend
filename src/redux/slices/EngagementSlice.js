import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE_URL =  'http://localhost:4200';

// Async thunks for engagement actions

// Like a post
export const likePost = createAsyncThunk(
  'engagement/likePost',
  async ({ postId }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/like`, { postId });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to like post');
    }
  }
);

// Remove like from a post
export const removeLike = createAsyncThunk(
  'engagement/removeLike',
  async (postId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/like/${postId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to remove like');
    }
  }
);

// Comment on a post
export const commentPost = createAsyncThunk(
  'engagement/commentPost',
  async ({ postId, comment }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/comment`, { postId, content:comment });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to comment on post');
    }
  }
);

// Get comments for a post
export const getComments = createAsyncThunk(
  'engagement/getComments',
  async (postId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/comments/${postId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch comments');
    }
  }
);

// Share a post
export const sharePost = createAsyncThunk(
  'engagement/sharePost',
  async ({ postId }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/share`, { postId });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to share post');
    }
  }
);

// Get engagement counts for a post
export const getEngagementCounts = createAsyncThunk(
  'engagement/getEngagementCounts',
  async (postId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/counts/${postId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch engagement counts');
    }
  }
);

// Initial state
const initialState = {
  likes: [],
  comments: {},
  shares: [],
  counts: {},
  loading: false,
  error: null,
};

// Slice
const engagementSlice = createSlice({
  name: 'engagement',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Like post
      .addCase(likePost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(likePost.fulfilled, (state, action) => {
        state.loading = false;
        state.likes.push(action.payload);
      })
      .addCase(likePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Remove like
      .addCase(removeLike.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeLike.fulfilled, (state, action) => {
        state.loading = false;
        state.likes = state.likes.filter(like => like.postId !== action.meta.arg);
      })
      .addCase(removeLike.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Comment post
      .addCase(commentPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(commentPost.fulfilled, (state, action) => {
        state.loading = false;
        const postId = action.meta.arg.postId;
        if (!state.comments[postId]) state.comments[postId] = [];
        state.comments[postId].push(action.payload);
      })
      .addCase(commentPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get comments
      .addCase(getComments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getComments.fulfilled, (state, action) => {
        state.loading = false;
        state.comments[action.meta.arg] = action.payload;
      })
      .addCase(getComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Share post
      .addCase(sharePost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sharePost.fulfilled, (state, action) => {
        state.loading = false;
        state.shares.push(action.payload);
      })
      .addCase(sharePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get engagement counts
      .addCase(getEngagementCounts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getEngagementCounts.fulfilled, (state, action) => {
        state.loading = false;
        state.counts[action.meta.arg] = action.payload;
      })
      .addCase(getEngagementCounts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = engagementSlice.actions;
export default engagementSlice.reducer;