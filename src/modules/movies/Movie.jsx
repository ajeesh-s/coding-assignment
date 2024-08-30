import { useDispatch, useSelector } from "react-redux";
import starredSlice from "../../data/starredSlice";
import watchLaterSlice from "../../data/watchLaterSlice";
import placeholder from "../../assets/not-found-500X750.jpeg";
import YoutubePlayer from "../../components/YoutubePlayer";
import { useState } from "react";
import { API_KEY, ENDPOINT, MOVIE_POSTER_DEFAULT } from "../../constants";

const Movie = ({ movie }) => {
  const state = useSelector((state) => state);
  const { starred, watchLater } = state;
  const { starMovie, unstarMovie } = starredSlice.actions;
  const { addToWatchLater, removeFromWatchLater } = watchLaterSlice.actions;
  const [trailerData, setTrailerData] = useState(null);
  const [isOpen, setOpen] = useState(false);
  const [isCardOpened, setIsCardOpened] = useState(false);

  const dispatch = useDispatch();

  const closeModal = () => setOpen(false);

  const handleOpenCardClick = () => setIsCardOpened(true);

  const handleCloseBtnClick = (e) => {
    e.stopPropagation();
    setIsCardOpened(false);
  };

  const viewTrailer = async (movie) => {
    setTrailerData(null);
    const trailerData = await getTrailerData(movie.id);
    setTrailerData(trailerData);
    setOpen(true);
  };

  const getTrailerData = async (id) => {
    const URL = `${ENDPOINT}/movie/${id}?api_key=${API_KEY}&append_to_response=videos`;
    try {
      const videoData = await fetch(URL).then((response) => response.json());

      if (videoData.videos && videoData.videos.results.length) {
        const trailer = videoData.videos.results.find(
          (vid) => vid.type === "Trailer"
        );
        return trailer || null;
      }
    } catch (error) {
      console.error("Error fetching movie data:", error);
      return null;
    }
  };

  const StarButton = () => {
    const isStarred = starred.starredMovies.some(
      (starredMovie) => starredMovie.id === movie.id
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

  const WatchLaterButton = () => {
    const isMovieInWatchLater = watchLater.watchLaterMovies.some(
      (watchLaterMovie) => watchLaterMovie.id === movie.id
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

  return (
    <>
      {isOpen ? (
        <YoutubePlayer
          isModalOpen={isOpen}
          setModalOpen={closeModal}
          videoKey={trailerData?.key || ""}
          title={trailerData?.name || ""}
        />
      ) : null}
      <div className="wrapper movie-item">
        <div
          className={`card ${isCardOpened ? "opened" : ""}`}
          onClick={handleOpenCardClick}
        >
          <div className="card-body text-center">
            <div className="overlay" />
            <div className="info_panel">
              <div className="overview">{movie.overview}</div>
              <div className="year">{movie.release_date?.substring(0, 4)}</div>
              <StarButton />
              <WatchLaterButton />
              <button
                type="button"
                className="btn btn-dark"
                onClick={() => viewTrailer(movie)}
              >
                View Trailer
              </button>
            </div>
            <img
              className="center-block"
              src={
                movie.poster_path
                  ? `${MOVIE_POSTER_DEFAULT}${movie.poster_path}`
                  : placeholder
              }
              alt="Movie poster"
              loading="lazy"
            />
          </div>
          <h6 className="title mobile-card">{movie.title}</h6>
          <h6 className="title">{movie.title}</h6>
          <button
            type="button"
            className="close"
            onClick={(e) => handleCloseBtnClick(e)}
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Movie;
