import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { fetchFreelancers } from "../services/freelancer.service";
import { FreelancerModel } from "@/types";

interface FreelancerState {
  freelancers: FreelancerModel[];
  filteredFreelancers: FreelancerModel[];
  loading: boolean;
  error: string | null;
  filters: {
    name: string;
    minJobs?: number;
    maxJobs?: number;
  };
}

const initialState: FreelancerState = {
  freelancers: [],
  filteredFreelancers: [],
  loading: false,
  error: null,
  filters: {
    name: "",
    minJobs: undefined,
    maxJobs: undefined,
  },
};

export const getFreelancers = createAsyncThunk(
  "freelancers/fetchFreelancers",
  async () => {
    const freelancers = await fetchFreelancers();
    return freelancers;
  }
);

const freelancerSlice = createSlice({
  name: "freelancer",
  initialState,
  reducers: {
    setFreelancers: (state, action: PayloadAction<FreelancerModel[]>) => {
      state.freelancers = action.payload;
      state.filteredFreelancers = action.payload; 
    },

    setSearchFilters: (
      state,
      action: PayloadAction<{
        name: string;
        minJobs?: number;
        maxJobs?: number;
      }>
    ) => {
      state.filters = action.payload;
      state.filteredFreelancers = state.freelancers.filter((freelancer) => {
        const nameMatch = freelancer.name
          .toLowerCase()
          .includes(action.payload.name.toLowerCase());
        const jobCountMatch =
          (action.payload.minJobs === undefined ||
            freelancer.finishedJobCount >= action.payload.minJobs) &&
          (action.payload.maxJobs === undefined ||
            freelancer.finishedJobCount <= action.payload.maxJobs);
        return nameMatch && jobCountMatch;
      });
    },

    setFinishedJobCount: (state, action: PayloadAction<{
      freelancerId: number;
      jobCount: number;
    }>) => {
      const { freelancerId, jobCount } = action.payload;
      const freelancer = state.freelancers.find(f => f.id === freelancerId);
      if (freelancer) {
        freelancer.finishedJobCount = jobCount;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFreelancers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getFreelancers.fulfilled, (state, action) => {
        state.loading = false;
        state.freelancers = action.payload;
        state.filteredFreelancers = action.payload; 
      })
      .addCase(getFreelancers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to load freelancers";
      });
  },
});

export const { setFreelancers, setSearchFilters, setFinishedJobCount } = freelancerSlice.actions;
export default freelancerSlice.reducer;
