import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  posts: [],
  userPosts: [],
  loading: false,
  error: null,
};

// ✅ Fetch latest posts (already present)
export const getLatestPost = createAsyncThunk(
  "/getLatestPost",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get("http://localhost:3001/post", {
        withCredentials: true,
      });
      console.log("res", res);
      return res.data.posts;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

//   const posts = useSelector((state) => state?.posts?.userPosts ?? []);

export const fetchUserPosts = createAsyncThunk(
  "/fetchUserPosts",
  async (userId, thunkAPI) => {
    try {
      const res = await axios.get(`http://localhost:3001/post/user/${userId}`, {
        withCredentials: true,
      });
      console.log("user posts", res);
            console.log("user posts", res);

      return res.data.posts; // assuming backend returns { posts: [...] }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Error fetching user posts");
    }
  }
);

export const createPost = createAsyncThunk(
  "/createPost",
  async ({ content, images }, thunkAPI) => {
    try {
      const formData = new FormData();
      formData.append('content', content);
      images.forEach((image) => formData.append('post', image));

      const res = await axios.post("http://localhost:3001/post", formData, {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// Slice
const PostsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Latest posts
      .addCase(getLatestPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getLatestPost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(getLatestPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // User posts
      .addCase(fetchUserPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.userPosts = action.payload;
      })
      .addCase(fetchUserPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create post
      .addCase(createPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.loading = false;
        // Optionally add to posts, but since we refetch, maybe not needed
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default PostsSlice.reducer;
