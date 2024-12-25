import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchPosts } from "../services/post.service";
import { PostModel } from "@/types";

export const getPosts = createAsyncThunk(
  "posts/fetchPosts",
  async () => {
    const posts = await fetchPosts();
    return posts;
  }
);

const postSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [] as PostModel[],
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Something went wrong";
      });
  },
});

export default postSlice.reducer;
