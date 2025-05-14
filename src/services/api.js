import {
  getAllMovies,
  saveMovie,
  removeMovie,
  getMovie,
  getAllSeries,
  saveSeries,
  removeSeries,
  getSeries,
  saveMoviesGenres,
  getMoviesGenres,
  saveSeriesGenres,
  getSeriesGenres,
} from "./localstorage";
import { getMovieStars, getSerieStars } from "./rating";

const API_KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMGEwZWViNWE4MTZiMGRkNDhkZWE5NjBjMWY2Y2M1MyIsIm5iZiI6MTc0NzA2MTQ1MC43MjIsInN1YiI6IjY4MjIwYWNhNjVkMGM4ZjNiZTJkMWMzMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yzk7LqG-1fF8ZnYZ0OTaECGo7QDbgiQJ_j-XkFPpJQw";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

const options = {
  method: "GET",
  headers: { accept: "application/json", Authorization: `Bearer ${API_KEY}` },
};

async function fetchGenres(type = "movie") {
  try {
    const response = await fetch(
      `${BASE_URL}/genre/${type}/list?api_key=${API_KEY}`,
      options
    );
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    return data.genres.reduce((map, genre) => {
      map[genre.id] = genre.name;
      return map;
    }, {});
  } catch (error) {
    console.error(`Failed to fetch ${type} genres:`, error);
    throw error;
  }
}

let genreMap = {};
async function moviesGenres() {
  genreMap = getMoviesGenres();
  if (!genreMap || Object.keys(genreMap).length === 0) {
    genreMap = await fetchGenres("movie");
    saveMoviesGenres(genreMap);
  }
  return genreMap;
}

let seriesGenreMap = {};
async function seriesGenres() {
  seriesGenreMap = getSeriesGenres();
  if (!seriesGenreMap || Object.keys(seriesGenreMap).length === 0) {
    seriesGenreMap = await fetchGenres("tv");
    saveSeriesGenres(seriesGenreMap);
  }
  return seriesGenreMap;
}

async function getPopularMovies(page = 1) {
  try {
    if (Object.keys(genreMap).length === 0) {
      await moviesGenres();
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
    const stars = getMovieStars();
    if (stars) {
      results.forEach((movies) => {
        if (stars[movies.id]) {
          movies.stars = stars[movies.id];
        }
      });
    }
    return results;
  } catch (error) {
    console.error("Failed to fetch popular movies:", error);
    throw error;
  }
}

async function getPopularSeries(page = 1) {
  try {
    if (Object.keys(seriesGenreMap).length === 0) {
      await seriesGenres();
    }
    const response = await fetch(
      `${BASE_URL}/tv/popular?api_key=${API_KEY}&page=${page}`,
      options
    );
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    const results = data.results.map((series) => ({
      id: series.id,
      title: series.name,
      overview: series.overview,
      genres: series.genre_ids.map((id) => seriesGenreMap[id] || "Unknown"),
      year: series.first_air_date ? series.first_air_date.split("-")[0] : "",
      img: `${IMAGE_URL}${series.poster_path}`,
    }));
    const stars = getSerieStars();
    if (stars) {
      results.forEach((series) => {
        if (stars[series.id]) {
          series.stars = stars[series.id];
        }
      });
    }
    return results;
  } catch (error) {
    console.error("Failed to fetch popular series:", error);
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
    const stars = getMovieStars();
    if (stars) {
      result.stars = stars[data.id];
    }
    return result;
  } catch (error) {
    console.error(`Failed to fetch details for movie ID ${movieId}:`, error);
    throw error;
  }
}

async function getSeriesDetails(seriesId) {
  try {
    const response = await fetch(
      `${BASE_URL}/tv/${seriesId}?api_key=${API_KEY}`,
      options
    );
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    const result = {
      id: data.id,
      title: data.name,
      overview: data.overview,
      genres: data.genres.map((genre) => genre.name),
      year: data.first_air_date ? data.first_air_date.split("-")[0] : "",
      img: `${IMAGE_URL}${data.poster_path}`,
      img_backdrop: `${IMAGE_URL}${data.backdrop_path}`,
    };
    const stars = getSerieStars();
    if (stars) {
      result.stars = stars[data.id];
    }
    return result;
  } catch (error) {
    console.error(`Failed to fetch details for series ID ${seriesId}:`, error);
    throw error;
  }
}

export async function getMovies(page) {
  try {
    const movies = await getPopularMovies(page);
    return movies;
  } catch (error) {
    console.error("Failed to fetch movies:", error);
    throw error;
  }
}

export async function getPopSeries(page) {
  try {
    const series = await getPopularSeries(page);
    return series;
  } catch (error) {
    console.error("Failed to fetch series:", error);
    throw error;
  }
}

export async function getMovieById(id) {
  const local = getMovie(id);
  if (local) {
    return local;
  }
  return await getMovieDetails(id);
}

export async function getSeriesById(id) {
  const local = getSeries(id);
  if (local) {
    return local;
  }
  return await getSeriesDetails(id);
}

export async function saveMovieById(id) {
  const obj = await getMovieDetails(id);
  if (obj) {
    return saveMovie(obj);
  }
  return false;
}

export async function saveSeriesById(id) {
  const obj = await getSeriesDetails(id);
  if (obj) {
    return saveSeries(obj);
  }
  return false;
}

export function removeMovieById(id) {
  return removeMovie(id);
}
export function removeSeriesById(id) {
  return removeSeries(id);
}

export function getAllMoviesLocal() {
  return getAllMovies();
}
export function getAllSeriesLocal() {
  return getAllSeries();
}
