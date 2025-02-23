import React, { useEffect, useState } from "react";
import Spinner from "../Spinner/Spinner";
import Movie from "../Movie/Movie";
import Location from "../Location/Location";
import { getMoviesList, getAllGenres } from "../../helpers/MovieApiHelper";
import fightClub from "../../helpers/fakeApi";
import "./ListView.css";
import MovieDetails from "../MovieDetails/MovieDetails";
import { motion, AnimatePresence } from "framer-motion";

export default function ListView() {
  // combines the api response with fight club json
  const [combinedMovies, setCombinedMovies] = useState([]);

  const { data: movies, isLoading: movieLoading, error } = getMoviesList();
  const { data: genreNames, isLoading: genresLoading } = getAllGenres();

  const [selectedMovie, setSelectedMovie] = useState(null);

  //the handle focus functions are written using Claude
  //added for screen readers to change the focus to the MovieDetails component after click on movie
  const handleMovieSelect = (movie) => {
    setSelectedMovie(movie);
    setTimeout(() => {
      document.getElementById("movie-details-container")?.focus();
    }, 100);
  };

  //added for screen readers to change the focus to the Movie component after click on close button
  const handleCloseDetails = () => {
    setSelectedMovie(null);
    setTimeout(() => {
      document.getElementById(`movie-${selectedMovie.id}`)?.focus();
    }, 100);
  };

  useEffect(() => {
    if (movies && !movieLoading && !genresLoading) {
      setCombinedMovies([...movies, fightClub]);
    }
  }, [movies, movieLoading, genresLoading]);

  //TODO: add UI element for error state
  //TODO: change genreNames to context or zod
  return (
    <main>
      {movieLoading || genresLoading ? (
        <Spinner />
      ) : error ? (
        <p role="alert">Error: {error.message}</p>
      ) : (
        <div className="list">
          <Location />
          <div className="list-wrapper">
            <div className="movies-list" aria-label="List of movies">
              {combinedMovies.map((movie, index) => (
                <Movie
                  key={index}
                  onClick={() => {
                    // console.log("clicked on ", movie.original_title);
                    handleMovieSelect(movie);
                  }}
                  movie={movie}
                  genres={genreNames}
                  movies={combinedMovies}
                />
              ))}
            </div>
          </div>
          <AnimatePresence>
            {selectedMovie && (
              <>
                {/* added this black background so on swipe the movie list doesnt show */}
                <div className="blured-background" aria-hidden="true"></div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: 1000,
                  }}
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="movie-details-title"
                >
                  <MovieDetails
                    movie={selectedMovie}
                    movies={combinedMovies}
                    genres={genreNames}
                    onClose={handleCloseDetails}
                  />
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      )}
    </main>
  );
}
