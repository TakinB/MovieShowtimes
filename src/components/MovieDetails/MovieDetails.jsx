import React from "react";
import "./MovieDetails.css";

const MovieDetails = () => {
  return (
    // TODO: add the background color for close button on hover
    <div className="movie-details">
      <button type="button" className="close-dialog">
        <svg
          className="close-dialog-svg"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
      <h1>Movie Details</h1>
      {/* Add your movie details content here */}
    </div>
  );
};

export default MovieDetails;
