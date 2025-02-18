import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../Spinner/Spinner";
import Movie from "../Movie/Movie";
import Location from "../Location/Location";
import { getMoviesList, getAllGenres } from "../../helpers/MovieApiHelper";
import fightClub from "../../helpers/fakeApi";
import "./ListView.css";
import MovieDetails from "../MovieDetails/MovieDetails";

export default function ListView() {
  const [combinedMovies, setCombinedMovies] = useState([]);

  const { data: movies, isLoading: movieLoading, error } = getMoviesList();
  const { data: genreNames, isLoading: genresLoading } = getAllGenres();

  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    if (movies && !movieLoading && !genresLoading) {
      setCombinedMovies([fightClub, ...movies]);
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

          {selectedMovie && (
            <MovieDetails
              movie={selectedMovie}
              movies={combinedMovies}
              genres={genreNames}
              onClose={() => setSelectedMovie(null)}
            />
          )}
        </div>
      )}
    </>
  );
}
