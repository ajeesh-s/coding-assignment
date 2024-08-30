import { useCallback, useEffect, useState } from "react";
import { fetchMovies } from "../../data/moviesSlice";
import { useDispatch, useSelector } from "react-redux";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import { useSearchParams } from "react-router-dom";
import { resetState } from "../../data/moviesSlice";
import { ENDPOINT_SEARCH, ENDPOINT_DISCOVER } from "../../constants";
import Movies from "./Movies";

import "../../styles/movies.scss";

const MoviesContainer = () => {
  const state = useSelector((state) => state);
  const { movies } = state;
  const dispatch = useDispatch();
  const { page, totalPages } = state.movies;
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("search");
  const [initialLoading, setInitialLoading] = useState(false);

  const moviesEndPoint = searchQuery
    ? `${ENDPOINT_SEARCH}&query=${searchQuery}`
    : `${ENDPOINT_DISCOVER}`;

  const fetchMoreMovies = useCallback(async () => {
    if (page >= totalPages) return;

    const nextPage = page + 1;
    const endpoint = `${moviesEndPoint}&page=${nextPage}`;
    await dispatch(fetchMovies(endpoint));
  }, [dispatch, page, totalPages, moviesEndPoint]);

  const { loading } = useInfiniteScroll(fetchMoreMovies, page, totalPages);

  useEffect(() => {
    const fetchInitialMovies = async () => {
      setInitialLoading(true);
      await dispatch(resetState());
      await dispatch(fetchMovies(moviesEndPoint));
      setInitialLoading(false);
    };

    fetchInitialMovies();
  }, [dispatch, searchQuery, moviesEndPoint]);

  return (
    <>
      <Movies movies={movies.movies} />
      {loading || initialLoading ? (
        <div className="spinner-grow" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        page >= totalPages && (
          <span className="badge rounded-pill text-bg-info">
            No more movies
          </span>
        )
      )}
    </>
  );
};

export default MoviesContainer;
