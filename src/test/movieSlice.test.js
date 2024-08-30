import moviesSlice, { fetchMovies } from "../data/moviesSlice";
import { moviesMock } from "./movies.mocks";

describe("MovieSlice test", () => {
  it("should set loading true while action is pending", () => {
    const action = { type: fetchMovies.pending };
    const initialState = moviesSlice.reducer(
      {
        movies: [],
        page: 1,
        totalPages: 0,
        totalResults: 0,
        fetchStatus: "",
      },
      action
    );
    expect(action).toEqual({ type: fetchMovies.pending });
  });

  it("should return payload when action is fulfilled", () => {
    const action = {
      type: fetchMovies.fulfilled,
      payload: {
        page: 1,
        results: moviesMock,
        total_pages: 1,
        total_results: 2,
      },
    };
    const initialState = moviesSlice.reducer(
      {
        movies: [],
        page: 1,
        totalPages: 0,
        totalResults: 0,
        fetchStatus: "",
      },
      action
    );
    expect(action.payload).toBeTruthy();
  });

  it("should set error when action is rejected", () => {
    const action = { type: fetchMovies.rejected };
    const initialState = moviesSlice.reducer(
      {
        movies: [],
        fetchStatus: "",
      },
      action
    );
    expect(action).toEqual({ type: fetchMovies.rejected });
  });
});
