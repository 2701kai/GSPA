<a name="top"></a>

# Gruppenprojekt-SPA

# API Service Dokumentation (`src/services/api.js`)

## Filme (Movies)

- **getMovies(page)**

  > Holt eine Liste populärer Filme von der TMDB API.  
  > **Parameter:** `page` (optional, Standard: 1) – Seitenzahl der Ergebnisse.  
  > **Rückgabe:** Array von Film-Objekten.

- **getMovieById(id)**
  > Holt einen Film mit der angegebenen ID zuerst aus dem localStorage, falls vorhanden, sonst von der API.
  > **Parameter:** `id` – Die Film-ID.  
  > **Rückgabe:** Film-Objekt.

## für Watchlist

- **saveMovieById(id)**

  > Holt einen Film mit der angegebenen ID von der API und speichert ihn im localStorage, falls noch nicht vorhanden.  
  > **Parameter:** `id` – Die Film-ID.  
  > **Rückgabe:** `true` wenn gespeichert, sonst `false`.

- **removeMovieById(id)**

  > Entfernt einen Film mit der angegebenen ID aus dem localStorage.  
  > **Parameter:** `id` – Die Film-ID.

- **getAllMoviesLocal()**

  > Gibt alle lokal gespeicherten Filme als Array zurück.

---

[Nach oben](#top)

## Serien (Series)

- **getPopSeries(page)**

  > Holt eine Liste populärer Serien von der TMDB API.  
  > **Parameter:** `page` (optional, Standard: 1) – Seitenzahl der Ergebnisse.  
  > **Rückgabe:** Array von Serien-Objekten.

- **getSeriesById(id)**

  > Holt eine Serie mit der angegebenen ID zuerst aus dem localStorage, falls vorhanden, sonst von der API.  
  > **Parameter:** `id` – Die Serien-ID.  
  > **Rückgabe:** Serien-Objekt.

## für Watchlist

- **saveSeriesById(id)**

  > Holt eine Serie mit der angegebenen ID von der API und speichert sie im localStorage, falls noch nicht vorhanden.  
  > **Parameter:** `id` – Die Serien-ID.  
  > **Rückgabe:** `true` wenn gespeichert, sonst `false`.

- **removeSeriesById(id)**

  > Entfernt eine Serie mit der angegebenen ID aus dem localStorage.  
  > **Parameter:** `id` – Die Serien-ID.

- **getAllSeriesLocal()**

  > Gibt alle lokal gespeicherten Serien als Array zurück.

---

[Nach oben](#top)

## 📦 Localstorage Service Dokumentation `src/services/localstorage.js`

- **getAllMovieIds()**  
  Gibt ein Array von IDs aller Filme aus localStorage zurück, um zu prüfen, ob der Film in der Watchlist ist.

- **getAllSeriesIds()**  
  Gibt ein Array von IDs aller Serien aus localStorage zurück, um zu prüfen, ob die Serie in der Watchlist steht.

---

[Nach oben](#top)
