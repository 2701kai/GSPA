import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getSeriesById,
  saveSeriesById,
  removeSeriesById,
  getAllSeriesIds
} from "../services/api";

export default function Serie() {
  const { id } = useParams();
  const [serie, setSerie] = useState(null);
  const [modalImg, setModalImg] = useState(null);
  const [isWatched, setIsWatched] = useState(false);

  useEffect(() => {
    async function fetchSerie() {
      try {
        const data = await getSeriesById(Number(id));
        setSerie(data);

        const watchedIds = getAllSeriesIds();
        setIsWatched(watchedIds.includes(Number(id)));
      } catch (error) {
        setSerie(null);
      }
    }
    fetchSerie();
  }, [id]);

  const toggleWatch = () => {
    if (isWatched) {
      removeSeriesById(Number(id));
    } else {
      saveSeriesById(Number(id));
    }
    setIsWatched(!isWatched);
  };

  if (!serie) return <div className="text-center mt-10">Serie nicht gefunden...</div>;

  return (
    <div className="p-6">
      <div className="card bg-base-100 shadow-xl">
        <figure>
          <img
            src={serie.img_backdrop}
            alt="Backdrop"
            className="cursor-pointer"
            onClick={() => setModalImg(serie.img_backdrop)}
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {serie.title}
            <div className="badge badge-secondary">{serie.year}</div>
          </h2>
          <p className="text-gray-500 text-sm">{serie.genres?.join(", ")}</p>
          <p>{serie.overview}</p>

          <div className="card-actions justify-start items-center gap-4">
            {serie.img && (
              <img
                src={serie.img}
                alt="Poster"
                className="w-24 rounded cursor-pointer"
                onClick={() => setModalImg(serie.img)}
              />
            )}
            <button className="btn btn-primary" onClick={toggleWatch}>
              {isWatched ? "Unwatch" : "Watch"}
            </button>
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
              <button
                className="btn"
                onClick={() => setModalImg(null)}
              >
                Schließen
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
}
