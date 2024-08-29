import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchMovies = createAsyncThunk("fetch-movies", async (apiUrl) => {
  const response = await fetch(apiUrl);
  return response.json();
});

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    movies: [],
    page: 1,
    totalPages: 0,
    totalResults: 0,
    fetchStatus: "",
  },
  reducers: {
    resetState: (state) => {
      state.movies = [];
      state.page = 1;
      state.totalPages = 0;
      state.totalResults = 0;
      state.fetchStatus = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.page = action.payload.page;
        state.movies = [...state.movies, ...action.payload.results];
        state.totalPages = action.payload.total_pages;
        state.totalResults = action.payload.total_results;
        state.fetchStatus = "success";
      })
      .addCase(fetchMovies.pending, (state) => {
        state.fetchStatus = "loading";
      })
      .addCase(fetchMovies.rejected, (state) => {
        state.fetchStatus = "error";
      });
  },
});

export const { resetState } = moviesSlice.actions;

export default moviesSlice;
