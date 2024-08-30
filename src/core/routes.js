import MoviesContainer from "../modules/movies/MoviesContainer";
import Starred from "../modules/movies/Starred";
import WatchLater from "../modules/movies//WatchLater";
import { Navigate } from "react-router-dom";

export const PATHS = {
  movies: "/movies",
  starred: "/starred",
  watchLater: "/watch-later",
};

const routes = [
  {
    path: "/",
    element: () => <Navigate to={PATHS.movies} replace />,
  },
  {
    path: PATHS.movies,
    element: MoviesContainer,
  },
  {
    path: PATHS.starred,
    element: Starred,
  },
  {
    path: PATHS.watchLater,
    element: WatchLater,
  },
  {
    path: "*",
    element: () => <h1 className="not-found">Page Not Found</h1>,
  },
];

export default routes;
