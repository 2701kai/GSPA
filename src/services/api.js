import { getData, saveData } from "./localstorage";

const API_KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMGEwZWViNWE4MTZiMGRkNDhkZWE5NjBjMWY2Y2M1MyIsIm5iZiI6MTc0NzA2MTQ1MC43MjIsInN1YiI6IjY4MjIwYWNhNjVkMGM4ZjNiZTJkMWMzMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yzk7LqG-1fF8ZnYZ0OTaECGo7QDbgiQJ_j-XkFPpJQw";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

const options = {
  method: "GET",
  headers: { accept: "application/json", Authorization: `Bearer ${API_KEY}` },
};

let genreMap = {};

async function fetchGenres() {
  try {
    const response = await fetch(
      `${BASE_URL}/genre/movie/list?api_key=${API_KEY}`,
      options
    );
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    genreMap = data.genres.reduce((map, genre) => {
      map[genre.id] = genre.name;
      return map;
    }, {});
  } catch (error) {
    console.error("Failed to fetch genres:", error);
    throw error;
  }
}

async function getPopularMovies(page = 1) {
  try {
    if (Object.keys(genreMap).length === 0) {
      await fetchGenres();
    }
    const response = await fetch(
      `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`,
      options
    );
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    const results = data.results.map((movie) => ({
      id: movie.id,
      title: movie.title,
      overview: movie.overview,
      genres: movie.genre_ids.map((id) => genreMap[id] || "Unknown"),
      year: movie.release_date.split("-")[0],
      img: `${IMAGE_URL}${movie.poster_path}`,
    }));
    return results;
  } catch (error) {
    console.error("Failed to fetch popular movies:", error);
    throw error;
  }
}

async function getMovieDetails(movieId) {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`,
      options
    );
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    const result = {
      id: data.id,
      title: data.title,
      overview: data.overview,
      genres: data.genres.map((genre) => genre.name),
      year: data.release_date.split("-")[0],
      img: `${IMAGE_URL}${data.poster_path}`,
      img_backdrop: `${IMAGE_URL}${data.backdrop_path}`,
    };
    return result;
  } catch (error) {
    console.error(`Failed to fetch details for movie ID ${movieId}:`, error);
    throw error;
  }
}

export async function getMovies(page) {
  // const savedData = getData();
  // if (savedData) {
  //   return savedData;
  // }

  try {
    const movies = await getPopularMovies(page);
    const movie = await getMovieDetails(movies[0].id);
    return [movies, movie];
  } catch (error) {
    console.error("Failed to fetch movies:", error);
    throw error;
  }
}
