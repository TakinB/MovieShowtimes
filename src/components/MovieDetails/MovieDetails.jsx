import React from "react";
import "./MovieDetails.css";
import { mapGenreIDsToNames } from "../../Helper/APIHelper";

// TODO: Add animation to open the MovieDetails component
const MovieDetails = ({ movie, genres, setDetailedViewOpen }) => {
  return (
    // TODO: add the background color for close button on hover
    <div
      className="movie-details"
      style={{
        backgroundImage:
          ` linear-gradient(to bottom, rgba(0, 0, 0, 0.90), rgba(0, 0, 0, 0)),` +
          `url( https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${movie.backdrop_path})`,
        backgroundSize: "cover",
        backgroundPosition: "70% 30%",
      }}
    >
      <button
        type="button"
        className="close-dialog"
        onClick={(e) => {
          e.stopPropagation();
          setDetailedViewOpen(false);
        }}
      >
        <svg
          className="close-dialog-svg"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="grey"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
      <div className="movie-summary-details">
        <h2 className="movie-title">{movie.original_title}</h2>
        <div className="genres">
          {mapGenreIDsToNames(movie.genre_ids, genres)
            .slice(1, 3)
            .map((g, index) => (
              <p key={index} className="genre">
                {g}{" "}
              </p>
            ))}
        </div>

        <p className="rating">{Number(movie.vote_average).toFixed(1)} / 10</p>
      </div>
      {/* Add your movie details content here */}
    </div>
  );
};

export default MovieDetails;
