import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchComments } from "../services/comment.service";
import { CommentModel } from "@/types";

export const getComments = createAsyncThunk(
  "comments/fetchComments",
  async () => {
    const comments = await fetchComments();
    return comments;
  }
);

const commentSlice = createSlice({
  name: "comments",
  initialState: {
    comments: [] as CommentModel[],
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getComments.pending, (state) => {
        state.loading = true;
      })
      .addCase(getComments.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload;
      })
      .addCase(getComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Something went wrong";
      });
  },
});

export default commentSlice.reducer;
