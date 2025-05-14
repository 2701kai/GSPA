import React from 'react';

const ObjPage = () => {
  const movieData = {
    id: 1,
    title: "Inception",
    overview: "A thief who steals corporate secrets through dream-sharing technology...",
    genres: ["Action", "Sci-Fi"],
    year: 2010,
    img: "https://via.placeholder.com/150",
    img_backdrop: "https://via.placeholder.com/300x150"
  };

  return (
    <div className="p-6">
      <div className="card bg-base-100 shadow-xl">
        <figure><img src={movieData.img_backdrop} alt="Backdrop" /></figure>
        <div className="card-body">
          <h2 className="card-title">
            {movieData.title}
            <div className="badge badge-secondary">{movieData.year}</div>
          </h2>
          <p className="text-sm text-gray-400">{movieData.genres.join(", ")}</p>
          <p>{movieData.overview}</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Watch</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ObjPage;
