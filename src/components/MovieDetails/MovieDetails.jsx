import React, { useState, useRef } from "react";
import "./MovieDetails.css";
import { mapGenreIDsToNames } from "../../helpers/MovieApiHelper";
import Chat from "../Chat/Chat";
import { motion, AnimatePresence } from "framer-motion";

const MovieDetails = ({ movie, genres, movies, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(
    movies.findIndex((m) => m.id === movie.id)
  );
  const [direction, setDirection] = useState(0);

  const currentMovie = movies[currentIndex];

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };

  // The variants object defines different states of the animation
  const variants = {
    enter: (direction) => {
      return {
        x: direction > 0 ? "100%" : "-100%",
        opacity: 0,
      };
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction) => {
      return {
        zIndex: 0,
        x: direction < 0 ? "100%" : "-100%",
        opacity: 0,
      };
    },
  };

  const swipe = (newDirection) => {
    setDirection(newDirection);
    if (newDirection === 1) {
      setCurrentIndex((prevIndex) =>
        prevIndex < movies.length - 1 ? prevIndex + 1 : 0
      );
    } else {
      setCurrentIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : movies.length - 1
      );
    }
  };

  return (
    // The frame Motion div and variants are written using Claude
    <div
      className="details-view-container"
      role="dialog"
      aria-labelledby="movie-title"
      tabIndex="0"
    >
      <a href="#chat-section" className="visually-hidden">
        Skip to chat with the director
      </a>
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipeAmount = swipePower(offset.x, velocity.x);
            if (swipeAmount < -swipeConfidenceThreshold) {
              swipe(1); // going to the next movie (swipe left)
            } else if (swipeAmount > swipeConfidenceThreshold) {
              swipe(-1); // going to the prev movie (swipe right)
            }
          }}
          className="movie-details"
          style={{
            backgroundImage:
              `linear-gradient(to bottom, rgba(27, 0, 0, 0.45), rgba(0, 0, 0, 1)),` +
              `url(https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${currentMovie.backdrop_path})`,
            backgroundSize: "cover",
            backgroundPosition: "70% 30%",
          }}
        >
          <button
            role="button"
            aria-label="close"
            type="button"
            className="close-dialog"
            onClick={onClose}
          >
            {/* svg source from here: https://flowbite.com/docs/components/modal/ */}
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
            <h2 className="movie-title">{currentMovie.original_title}</h2>
            <div className="genres" aria-label="Movie genres">
              {mapGenreIDsToNames(currentMovie.genre_ids, genres)
                .slice(1, 3)
                .map((g, index) => (
                  <p key={index} className="genre">
                    {g}{" "}
                  </p>
                ))}
            </div>
            <div className="rating">
              <span className="visually-hidden">Rating: </span>
              <span aria-hidden="true">
                {Number(currentMovie.vote_average).toFixed(1)} / 10
              </span>
              <span className="visually-hidden">
                {Number(currentMovie.vote_average).toFixed(1)} out of 10
              </span>
            </div>
            <div className="about">
              <h2 className="about-title">About:</h2>
              <p className="about-summary">{currentMovie.overview}</p>
            </div>
          </div>
          <Chat
            movieTitle={currentMovie.original_title}
            movieSummary={currentMovie.overview}
            movieAnalysis={currentMovie.analysis}
            movieDirector={currentMovie.director}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default MovieDetails;
