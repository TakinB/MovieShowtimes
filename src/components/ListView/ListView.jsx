import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../Spinner/Spinner";
import Movie from "../Movie/Movie";
import Location from "../Location/Location";
import { getMoviesList, getAllGenres } from "../../Helper/MovieAPIHelper";
import fightClub from "../../Helper/fakeAPI";
import "./ListView.css";

export default function ListView() {
  const [combinedMovies, setCombinedMovies] = useState([]);

  const { data: movies, isLoading: movieLoading, error } = getMoviesList();
  const { data: genreNames, isLoading: genresLoading } = getAllGenres();

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
                <Movie key={index} movie={movie} genres={genreNames} />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
