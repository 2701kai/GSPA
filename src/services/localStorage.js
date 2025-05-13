const MOVIES_KEY = "movies";
const SERIES_KEY = "series";

function getAll(key) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
}

function getAllIds(key) {
  return getAll(key).map((item) => item.id);
}

function saveItem(key, obj) {
  const data = getAll(key);
  if (!data.some((item) => item.id === obj.id)) {
    data.push(obj);
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  }
  return false;
}

function saveGenres(key, obj) {
  localStorage.setItem(`genres ${key}`, JSON.stringify(obj));
  return true;
}

function getGenres(key) {
  const data = localStorage.getItem(`genres ${key}`);
  return data ? JSON.parse(data) : [];
}

function removeItem(key, id) {
  const data = getAll(key);
  const newData = data.filter((item) => item.id !== id);
  localStorage.setItem(key, JSON.stringify(newData));
  return true;
}

function getItem(key, id) {
  return getAll(key).find((item) => item.id === id);
}

export const getAllMovies = () => getAll(MOVIES_KEY);
export const getAllMovieIds = () => getAllIds(MOVIES_KEY);
export const saveMovie = (obj) => saveItem(MOVIES_KEY, obj);
export const removeMovie = (id) => removeItem(MOVIES_KEY, id);
export const getMovie = (id) => getItem(MOVIES_KEY, id);
export const saveMoviesGenres = (obj) => saveGenres(MOVIES_KEY, obj);
export const getMoviesGenres = () => getGenres(MOVIES_KEY);

export const getAllSeries = () => getAll(SERIES_KEY);
export const getAllSeriesIds = () => getAllIds(SERIES_KEY);
export const saveSeries = (obj) => saveItem(SERIES_KEY, obj);
export const removeSeries = (id) => removeItem(SERIES_KEY, id);
export const getSeries = (id) => getItem(SERIES_KEY, id);
export const saveSeriesGenres = (obj) => saveGenres(SERIES_KEY, obj);
export const getSeriesGenres = () => getGenres(SERIES_KEY);
