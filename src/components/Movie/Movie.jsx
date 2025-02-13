import React, { useEffect } from "react";
import "./Movie.css";
import Spinner from "../Spinner/Spinner";

const Movie = ({ movie, genres }) => {
  const mapGenreIDsToNames = (genre_ids) => {
    const genre_names = [];
    try {
      for (let i = 0; i < genre_ids.length; i++) {
        const genre = genre_ids[i];
        const genre_name = genres.find((g) => g.id === genre)?.name;
        if (genre_name) {
          genre_names.push(genre_name);
        }
      }
      return genre_names;
    } catch (err) {
      console.log(err);
      return [];
    }
  };

  //TODO: add UI element for error state
  return (
    <div
      className="movie"
      style={{
        backgroundImage:
          ` linear-gradient(to top, rgba(0, 0, 0, 0.70), rgba(0, 0, 0, 0)),` +
          `url( https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${movie.backdrop_path})`,
        backgroundSize: "cover",
        backgroundPosition: "70% 30%",
      }}
    >
      <div className="movie-details">
        <h2 className="movie-title">{movie.original_title}</h2>
        <div className="genres">
          {mapGenreIDsToNames(movie.genre_ids)
            .slice(1, 3)
            .map((g) => (
              <p>{g} </p>
            ))}
        </div>

        <p className="rating">{Number(movie.vote_average).toFixed(1)}</p>
      </div>
    </div>
  );
};

export default Movie;
