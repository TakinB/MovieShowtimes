import React, { useEffect, useState } from "react";
import "./Movie.css";
import Spinner from "../Spinner/Spinner";
import MovieDetails from "../MovieDetails/MovieDetails";
import { mapGenreIDsToNames } from "../../helpers/MovieApiHelper";
import { motion, AnimatePresence } from "framer-motion";

const Movie = ({ onClick, movie, genres, movies }) => {
  //TODO: add UI element for error state
  return (
    <div
      className="movie"
      style={{
        backgroundImage:
          ` linear-gradient(to top, rgba(0, 0, 0, 0.90), rgba(0, 0, 0, 0)),` +
          `url( https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${movie.backdrop_path})`,
        backgroundSize: "cover",
        backgroundPosition: "70% 30%", //70% 30% showed better coverage by try and error
      }}
      onClick={() => {
        onClick();
      }}
    >
      <div className="movie-summary">
        <h2 aria-label="movie title" className="movie-title">
          {movie.original_title}
        </h2>
        {/* just shows the first two genres */}
        <div aria-label="genres" className="genres">
          {/* converst genre IDs to genre names using another API call reponse */}
          {mapGenreIDsToNames(movie.genre_ids, genres)
            .slice(0, 2)
            .map((g, index) => (
              <p key={index} className="genre">
                {g}{" "}
              </p>
            ))}
        </div>

        <p aria-label="rating" className="rating">
          {/* round up the rating to one decimal */}
          {Number(movie.vote_average).toFixed(1)} / 10
        </p>
      </div>
    </div>
  );
};

export default Movie;
