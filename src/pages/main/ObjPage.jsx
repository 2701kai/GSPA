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
    <div className="p-4 space-y-4">
      <h1 className="text-3xl font-bold">{movieData.title}</h1>
      <div className="text-gray-400">{movieData.genres.join(", ")} | {movieData.year}</div>
      <div className="flex space-x-4">
        <img src={movieData.img} alt="Poster" className="w-32 rounded" />
        <img src={movieData.img_backdrop} alt="Backdrop" className="w-64 rounded" />
      </div>
      <button className="btn btn-primary">Watch</button>
      <p className="text-sm">{movieData.overview}</p>
    </div>
  );
};

export default ObjPage;
