import { getMovie, saveMovie, getSeries, saveSeries } from "./localstorage";

const MOVIE = "movie";
const SERIE = "serie";

function setStar(type, id, rating) {
  const stars = JSON.parse(localStorage.getItem(`${type}-stars`)) || {};
  stars[id] = rating;
  localStorage.setItem(`${type}-stars`, JSON.stringify(stars));

  if (type === "movie") {
    const movie = getMovie(Number(id));
    if (movie) {
      movie.stars = rating;
      saveMovie(movie);
    }
  }
  if (type === "serie") {
    const serie = getSeries(Number(id));
    if (serie) {
      serie.stars = rating;
      saveSeries(serie);
    }
  }
}

function getAllStars(type) {
  const stars = JSON.parse(localStorage.getItem(`${type}-stars`)) || {};
  return stars;
}

export function setMovieStar(id, rating) {
  setStar(MOVIE, id, rating);
}
export function setSerieStar(id, rating) {
  setStar(SERIE, id, rating);
}
export function getMovieStars() {
  return getAllStars(MOVIE);
}
export function getSerieStars() {
  return getAllStars(SERIE);
}
