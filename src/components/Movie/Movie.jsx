import React, { useEffect, useState } from "react";
import "./Movie.css";
import Spinner from "../Spinner/Spinner";
import MovieDetails from "../MovieDetails/MovieDetails";
import { mapGenreIDsToNames } from "../../helpers/MovieApiHelper";
import { motion, AnimatePresence } from "framer-motion";

const Movie = ({ currentIndex, movie, genres, movies }) => {
  const [detailedViewOpen, setDetailedViewOpen] = useState(false);
  const [currentMovie, setCurrentMovie] = useState(movie);

  const handleNextMovie = () => {
    const nextIndex = (movies.indexOf(currentMovie) + 1) % movies.length;
    setDetailedViewOpen(false);
    setCurrentMovie(movies[nextIndex]);
    setDetailedViewOpen(true);
  };

  const handleExMovie = () => {
    const prevIndex =
      (movies.indexOf(currentMovie) - 1 + movies.length) % movies.length;
    setDetailedViewOpen(false);
    setCurrentMovie(movies[prevIndex]);
    setDetailedViewOpen(true);
  };

  useEffect(() => {
    setCurrentMovie(movie);
  }, [movie]);

  //TODO: add UI element for error state
  return (
    <div
      className="movie"
      style={{
        backgroundImage:
          ` linear-gradient(to top, rgba(0, 0, 0, 0.90), rgba(0, 0, 0, 0)),` +
          `url( https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${movie.backdrop_path})`,
        backgroundSize: "cover",
        backgroundPosition: "70% 30%",
      }}
      onClick={() => {
        setCurrentMovie(movie);
        setDetailedViewOpen(true);
      }}
    >
      <div className="movie-summary">
        <h2 className="movie-title">{movie.original_title}</h2>
        <div className="genres">
          {mapGenreIDsToNames(movie.genre_ids, genres)
            .slice(0, 2)
            .map((g, index) => (
              <p key={index} className="genre">
                {g}{" "}
              </p>
            ))}
        </div>

        <p className="rating">{Number(movie.vote_average).toFixed(1)} / 10</p>
      </div>
      <AnimatePresence>
        {detailedViewOpen && (
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
              movie={currentMovie}
              genres={genres}
              setDetailedViewOpen={setDetailedViewOpen}
              onNextMovie={handleNextMovie}
              OnExMovie={handleExMovie}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Movie;
