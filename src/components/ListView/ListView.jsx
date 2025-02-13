import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../Spinner/Spinner";
import Movie from "../Movie/Movie";
import { fetchMovies } from "../../Helper/APIHelper";

export default function ListView() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(async () => {
    try {
      setIsLoading(true);
      const fetchedMovies = await fetchMovies();
      setMovies(fetchedMovies);
      console.log("here *****", fetchedMovies);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      setError(true);
      console.log(e);
    }
  }, []);

  //TODO: add UI element for error state
  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {movies.map((movie, index) => (
            <Movie key={index} movie={movie} />
          ))}
        </>
      )}
    </>
  );
}
