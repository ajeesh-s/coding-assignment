import { useDispatch, useSelector } from 'react-redux'
import starredSlice from '../data/starredSlice'
import watchLaterSlice from '../data/watchLaterSlice'
import placeholder from '../assets/not-found-500X750.jpeg'

const Movie = ({ movie, viewTrailer, closeCard }) => {

    const state = useSelector((state) => state)
    const { starred, watchLater } = state
    const { starMovie, unstarMovie } = starredSlice.actions
    const { addToWatchLater, removeFromWatchLater } = watchLaterSlice.actions

    const dispatch = useDispatch()
//Simplify the myClickHandler function by removing outdated browser compatibility code and using standard methods like 
//event.preventDefault() and event.stopPropagation() for cleaner, modern event handling.
    const myClickHandler = (e) => {
        if (!e) var e = window.event
        e.cancelBubble = true
        if (e.stopPropagation) e.stopPropagation()
//Use React state to manage the opened class instead of direct DOM manipulation for better integration with React's declarative approach.
        e.target.parentElement.parentElement.classList.remove('opened')
    }

    return (
        <div className="wrapper col-3 col-sm-4 col-md-3 col-lg-3 col-xl-2">
//Use React state to manage the opened class instead of direct DOM manipulation for better integration with React's declarative approach.
        <div className="card" onClick={(e) => e.currentTarget.classList.add('opened')} >
            <div className="card-body text-center">
                <div className="overlay" />
                <div className="info_panel">
                    <div className="overview">{movie.overview}</div>
                    <div className="year">{movie.release_date?.substring(0, 4)}</div>
//Consider separating concerns by moving the logic for starring a movie. This would make the component easier to read and maintain.
                    {!starred.starredMovies.map(movie => movie.id).includes(movie.id) ? (
//Consider seperate function for event handlers for better readability 
                        <span className="btn-star" data-testid="starred-link" onClick={() => 
                            dispatch(starMovie({
                                id: movie.id, 
                                overview: movie.overview, 
                                release_date: movie.release_date?.substring(0, 4),
                                poster_path: movie.poster_path,
                                title: movie.title
                            })
                        )}>
                            <i className="bi bi-star" />
                        </span>
                    ) : (
                        <span className="btn-star" data-testid="unstar-link" onClick={() => dispatch(unstarMovie(movie))}>
                            <i className="bi bi-star-fill" data-testid="star-fill" />
                        </span>
                    )}
//Consider separating concerns by moving the logic for adding to watch later. This would make the component easier to read and maintain.     
                    {!watchLater.watchLaterMovies.map(movie => movie.id).includes(movie.id) ? (
//Consider seperate function for event handlers for better readability 
                        <button type="button" data-testid="watch-later" className="btn btn-light btn-watch-later" onClick={() => dispatch(addToWatchLater({
                                id: movie.id, 
                                overview: movie.overview, 
                                release_date: movie.release_date?.substring(0, 4),
                                poster_path: movie.poster_path,
                                title: movie.title
                        }))}>Watch Later</button>
                    ) : (
                        <button type="button" data-testid="remove-watch-later" className="btn btn-light btn-watch-later blue" onClick={() => dispatch(removeFromWatchLater(movie))}><i className="bi bi-check"></i></button>
                    )}
                    <button type="button" className="btn btn-dark" onClick={() => viewTrailer(movie)}>View Trailer</button>                                                
                </div>
//Adding the loading="lazy" attribute to the img tag is a good optimization for performance 
//Consider moving the constant URL to constats file.
                <img className="center-block" src={(movie.poster_path) ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : placeholder} alt="Movie poster" />
            </div>
            <h6 className="title mobile-card">{movie.title}</h6>
            <h6 className="title">{movie.title}</h6>
            <button type="button" className="close" onClick={(e) => myClickHandler(e)} aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    </div>        
    )
}

export default Movie