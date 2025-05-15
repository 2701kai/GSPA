import React from "react";
import penguinImage from "../assets/penguin.webp";

export default function Hero() {
  return (
    <section className="bg-base-100 text-base-content py-16 md:min-h-screen flex items-center relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10 scale-110 blur-sm"
        style={{ backgroundImage: `url(${penguinImage})` }}
      ></div>
      <div className="relative z-10 container mx-auto px-4 flex flex-col md:flex-row items-center animate-fade-in">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h2 className="text-4xl font-extrabold leading-tight mb-4">
            One Planet.
            <br />
            Infinite Stories.
          </h2>
          <p className="mb-6 text-lg">
            Curated by us. Streamed for all. <br />
            <span className="italic opacity-80">Out of Many, One People.</span>
          </p>
          <a className="btn btn-primary text-lg">Browse Collection</a>
        </div>
        <div className="md:w-1/2">
          <img
            src={penguinImage}
            alt="The Penguin - Batman"
            className="rounded-2xl shadow-xl w-full max-w-md mx-auto"
          />
        </div>
      </div>
    </section>
  );
}
