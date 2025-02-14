import { useQuery } from "@tanstack/react-query";

const apiUrl = import.meta.env.VITE_MOVIE_API_URL;
const apiToken = import.meta.env.VITE_MOVIE_API_TOKEN;

const fetchMovies = async () => {
  const response = await fetch(
    `${apiUrl}3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${apiToken}`,
      },
    }
  );
  if (!response.ok) {
    throw new Error("The API call to fetch movies failed.");
  }
  const jsonResponse = await response.json();
  return jsonResponse.results;
};

const fetchGenres = async () => {
  const response = await fetch(`${apiUrl}3/genre/movie/list?language=en`, {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${apiToken}`,
    },
  });
  if (!response.ok) {
    throw new Error("The API call to fetch genres failed.");
  }
  const jsonResponse = await response.json();
  return jsonResponse.genres;
};

export function getMoviesList() {
  return useQuery({
    queryKey: ["moviesList"],
    queryFn: fetchMovies,
  });
}

export function getAllGenres() {
  return useQuery({
    queryKey: ["allGenres"],
    queryFn: fetchGenres,
  });
}

export function mapGenreIDsToNames(genre_ids, genres) {
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
}
