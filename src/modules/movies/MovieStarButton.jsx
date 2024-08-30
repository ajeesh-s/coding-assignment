import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import starredSlice from "../../data/starredSlice";

const MovieStarButton = ({ movie }) => {
  const dispatch = useDispatch();
  const { starMovie, unstarMovie } = starredSlice.actions;
  const isStarred = useSelector((state) =>
    state.starred.starredMovies.some((m) => m.id === movie.id)
  );

  const handleAddToStar = () => {
    dispatch(
      starMovie({
        id: movie.id,
        overview: movie.overview,
        release_date: movie.release_date?.substring(0, 4),
        poster_path: movie.poster_path,
        title: movie.title,
      })
    );
  };

  const handleRemoveFromStar = () => {
    dispatch(unstarMovie(movie));
  };

  return isStarred ? (
    <span
      className="btn-star"
      data-testid="unstar-link"
      onClick={handleRemoveFromStar}
    >
      <i className="bi bi-star-fill" data-testid="star-fill" />
    </span>
  ) : (
    <span
      className="btn-star"
      data-testid="starred-link"
      onClick={handleAddToStar}
    >
      <i className="bi bi-star" />
    </span>
  );
};
export default memo(MovieStarButton);
