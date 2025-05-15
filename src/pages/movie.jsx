import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMovieById, saveMovieById, removeMovieById } from "../services/api";
import { getAllMovieIds } from "../services/localstorage";
import { WatchButton } from "../components/watch.comp";
import { Rating } from "../components/rating.comp";

export default function Movie() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [modalImg, setModalImg] = useState(null);
  const [isWatched, setIsWatched] = useState(false);

  useEffect(() => {
    async function fetchMovie() {
      try {
        const data = await getMovieById(Number(id));
        setMovie(data);

        // watchlist durumu kontrol
        const watchedIds = getAllMovieIds();
        setIsWatched(watchedIds.includes(Number(id)));
      } catch (error) {
        setMovie(null);
      }
    }
    fetchMovie();
  }, [id]);

  const toggleWatch = () => {
    if (isWatched) {
      removeMovieById(Number(id));
    } else {
      saveMovieById(Number(id));
    }
    setIsWatched(!isWatched);
  };

  if (!movie)
    return <div className="text-center mt-10">Film nicht gefunden...</div>;

  return (
    <div className="p-6">
      <div className="card bg-base-100 shadow-xl">
        <figure>
          <img
            src={movie.img_backdrop}
            alt="Backdrop"
            className="cursor-pointer"
            onClick={() => setModalImg(movie.img_backdrop)}
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {movie.title}
            <div className="badge badge-secondary">{movie.year}</div>
          </h2>
          <Rating id={movie.id} type="movies" />
          <p className="text-gray-500 text-sm">{movie.genres?.join(", ")}</p>
          <p>{movie.overview}</p>

          <div className="card-actions justify-start items-center gap-4">
            {movie.img && (
              <img
                src={movie.img}
                alt="Poster"
                className="w-24 rounded cursor-pointer"
                onClick={() => setModalImg(movie.img)}
              />
            )}
            <WatchButton isWatched={isWatched} onToggle={toggleWatch} />
          </div>
        </div>
      </div>

      {/* Modal */}
      {modalImg && (
        <dialog
          open
          className="modal modal-open"
          onClick={() => setModalImg(null)}
        >
          <div className="modal-box w-11/12 max-w-5xl">
            <img src={modalImg} alt="Großansicht" className="w-full rounded" />
            <div className="modal-action">
              <button className="btn" onClick={() => setModalImg(null)}>
                Schließen
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
}
