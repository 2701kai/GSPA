import React from "react";

export default function Hero() {
  const backgroundImage = "/assets/astro.jpg";
  const foregroundImage = "/assets/earth.png";

  return (
    <section className="bg-base-100 text-base-content py-12 md:py-20 min-h-screen flex items-center relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-15 scale-110 blur-sm"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      ></div>

      <div className="relative z-10 w-full px-6 sm:px-8 max-w-screen-lg mx-auto flex flex-col md:flex-row items-center gap-10 animate-fade-in">
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-snug mb-4 break-words">
            <span className="block">One Planet.</span>
            <span className="block">Infinite Stories.</span>
          </h2>
          <p className="mb-6 text-base sm:text-lg leading-relaxed">
            Curated by us. Streamed for all.
            <br />
            <span className="italic opacity-80">Out of Many, One People.</span>
          </p>
          <a className="btn btn-primary text-base sm:text-lg mt-2">
            Browse Collection
          </a>
        </div>
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src={foregroundImage}
            alt="Earth"
            className="rounded-2xl shadow-xl w-full max-w-xs sm:max-w-sm md:max-w-md"
          />
        </div>
      </div>
    </section>
  );
}
