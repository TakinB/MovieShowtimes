const apiUrl = import.meta.env.VITE_API_URL;
const API_TOKEN = import.meta.env.VITE_API_TOKEN;

export const fetchGenres = async () => {
  const response = await fetch(`${apiUrl}3/genre/movie/list?language=en`, {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${API_TOKEN}`,
    },
  });
  if (!response.ok) {
    throw new Error("The API call to fetch genres failed.");
  }
  const jsonResponse = await response.json();
  return jsonResponse.genres;
};

export const mapGenreIDsToNames = async (genre_ids) => {
  const genre_names = [];

  try {
    const genres = await fetchGenres();
    for (let i = 0; i < genre_ids.length; i++) {
      const genre = genre_ids[i];
      const genre_name = genres.find((g) => g.id === genre)?.name;
      if (genre_name) {
        genre_names.push(genre_name);
      }
    }
    return genre_names;
  } catch (e) {
    throw new Error(e);
  }
};

export const fetchMovies = async () => {
  const response = await fetch(
    `${apiUrl}3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_TOKEN}`,
      },
    }
  );
  if (!response.ok) {
    throw new Error("The API call to fetch movies failed.");
  }
  const jsonResponse = await response.json();
  return jsonResponse.results;
};
