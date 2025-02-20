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
  const [combinedMovies, setCombinedMovies] = useState([]);

  const { data: movies, isLoading: movieLoading, error } = getMoviesList();
  const { data: genreNames, isLoading: genresLoading } = getAllGenres();

  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    if (movies && !movieLoading && !genresLoading) {
      setCombinedMovies([...movies, fightClub]);
    }
  }, [movies, movieLoading, genresLoading]);

  //TODO: add UI element for error state
  //TODO: change genreNames to context
  return (
    <>
      {movieLoading || genresLoading ? (
        <Spinner />
      ) : (
        <div className="list">
          <Location />
          <div className="list-wrapper">
            <div className="movies-list">
              {combinedMovies.map((movie, index) => (
                <Movie
                  key={index}
                  onClick={() => {
                    // console.log("clicked on ", movie.original_title);
                    setSelectedMovie(movie);
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
                <div className="blured-background"></div>
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
                >
                  <MovieDetails
                    movie={selectedMovie}
                    movies={combinedMovies}
                    genres={genreNames}
                    onClose={() => setSelectedMovie(null)}
                  />
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      )}
    </>
  );
}
