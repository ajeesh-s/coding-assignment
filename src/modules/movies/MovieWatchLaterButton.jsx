import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import watchLaterSlice from "../../data/watchLaterSlice";

const MovieWatchLaterButton = ({ movie }) => {
  const dispatch = useDispatch();
  const { addToWatchLater, removeFromWatchLater } = watchLaterSlice.actions;
  const isMovieInWatchLater = useSelector((state) =>
    state.watchLater.watchLaterMovies.some((m) => m.id === movie.id)
  );

  const handleAddToWatchLater = () => {
    dispatch(
      addToWatchLater({
        id: movie.id,
        overview: movie.overview,
        release_date: movie.release_date?.substring(0, 4),
        poster_path: movie.poster_path,
        title: movie.title,
      })
    );
  };

  const handleRemoveFromWatchLater = () => {
    dispatch(removeFromWatchLater(movie));
  };

  return isMovieInWatchLater ? (
    <button
      type="button"
      data-testid="remove-watch-later"
      className="btn btn-light btn-watch-later blue"
      onClick={handleRemoveFromWatchLater}
    >
      <i className="bi bi-check"></i>
    </button>
  ) : (
    <button
      type="button"
      data-testid="watch-later"
      className="btn btn-light btn-watch-later"
      onClick={handleAddToWatchLater}
    >
      Watch Later
    </button>
  );
};
export default memo(MovieWatchLaterButton);
