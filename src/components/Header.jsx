import {
  NavLink,
  useNavigate,
  useSearchParams,
  createSearchParams,
  Link,
} from "react-router-dom";
import { useSelector } from "react-redux";
import { useRef } from "react";
import { PATHS } from "../core/routes";
import "../styles/header.scss";

const Header = () => {
  const { starredMovies } = useSelector((state) => state.starred);
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const previousQueryRef = useRef(searchQuery);

  const searchMovies = (query) => {
    if (query !== previousQueryRef.current) {
      previousQueryRef.current = query;
      setSearchParams({ search: query });
      navigate({
        pathname: PATHS.movies,
        search: createSearchParams({ search: query }).toString(),
      });
    }
  };

  const handleInputChange = (e) => {
    const query = e.target.value;
    searchMovies(query);
  };

  const clearSearch = () => {
    searchMovies("");
  };

  return (
    <header>
      <Link to={PATHS.movies} data-testid="home" onClick={clearSearch}>
        <i className="bi bi-film" />
      </Link>

      <nav>
        <NavLink
          to={PATHS.starred}
          data-testid="nav-starred"
          className="nav-starred"
        >
          {starredMovies.length > 0 ? (
            <>
              <i className="bi bi-star-fill bi-star-fill-white" />
              <sup className="star-number">{starredMovies.length}</sup>
            </>
          ) : (
            <i className="bi bi-star" />
          )}
        </NavLink>
        <NavLink to={PATHS.watchLater} className="nav-fav">
          Watch later
        </NavLink>
      </nav>

      <div className="input-group rounded">
        <input
          type="search"
          data-testid="search-movies"
          value={searchQuery}
          onChange={handleInputChange}
          className="form-control rounded"
          placeholder="Search movies..."
          aria-label="Search movies"
          aria-describedby="search-addon"
        />
      </div>
    </header>
  );
};

export default Header;
