import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { fetchGenres } from "../../Helper/APIHelper";

const Movie = ({ key, movie }) => {
  const [Loading, setIsLoading] = React.useState(false);
  const [genreNames, setGenreNames] = React.useState([]);

  useEffect()(() => {
    try {
      setIsLoading(true);
      const fetchedGenres = mapGenreIDsToNames(movie.genre_ids);
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
        <div key={key}>
          <h2>{movie.original_title}</h2>
          <p>{movie.genre_ids}</p>
          <p>{movie.vote_average}</p>
        </div>
      )}
    </>
  );
};

export default Movie;
