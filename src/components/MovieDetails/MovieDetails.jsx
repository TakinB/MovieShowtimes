import React, { useState, useRef } from "react";
import "./MovieDetails.css";
import { mapGenreIDsToNames } from "../../helpers/MovieApiHelper";
import Chat from "../Chat/Chat";

const MovieDetails = ({ movie, genres, movies, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(
    movies.findIndex((m) => m.id === movie.id)
  );
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const componentRef = useRef(null);

  const currentMovie = movies[currentIndex];

  // the required distance between touchStart and touchEnd to be detected as a swipe
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);

    // Calculate the distance moved
    const distance = touchStart - e.targetTouches[0].clientX;
    if (componentRef.current) {
      componentRef.current.style.transform = `translateX(${-distance}px)`;
    }
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe || isRightSwipe) {
      // Animate the swipe out
      setIsTransitioning(true);
      if (componentRef.current) {
        componentRef.current.style.transform = "translateX(-100%)";
      }

      // Wait for animation to complete before calling onNextMovie
      setTimeout(() => {
        if (isLeftSwipe) {
          setCurrentIndex((currentIndex + 1) % movies.length);
        } else {
          setCurrentIndex((currentIndex - 1 + movies.length) % movies.length);
        }
        // Reset position after switching
        if (componentRef.current) {
          componentRef.current.style.transform = "translateX(0)";
        }
        setIsTransitioning(false);
      }, 300);
    } else {
      // Reset position if swipe wasn't far enough
      if (componentRef.current) {
        componentRef.current.style.transform = "translateX(0)";
      }
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  return (
    // TODO: add the background color for close button on hover
    <div
      ref={componentRef}
      className="movie-details"
      style={{
        backgroundImage:
          `linear-gradient(to bottom, rgba(27, 0, 0, 0.45), rgba(0, 0, 0, 1)),` +
          `url(https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${currentMovie.backdrop_path})`,
        backgroundSize: "cover",
        backgroundPosition: "70% 30%",
        transition: isTransitioning ? "transform 0.3s ease-out" : "none",
        touchAction: "pan-y pinch-zoom",
      }}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <button type="button" className="close-dialog" onClick={onClose}>
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
        <div className="genres">
          {mapGenreIDsToNames(currentMovie.genre_ids, genres)
            .slice(1, 3)
            .map((g, index) => (
              <p key={index} className="genre">
                {g}{" "}
              </p>
            ))}
        </div>
        <p className="rating">
          {Number(currentMovie.vote_average).toFixed(1)} / 10
        </p>
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
    </div>
  );
};

export default MovieDetails;
