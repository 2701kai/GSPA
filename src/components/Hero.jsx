import React from "react";
import penguinImage from "../assets/penguin.webp"; // Adjust the path as necessary

export default function Hero() {
  return (
    <section className="bg-base-100 text-base-content py-16">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h2 className="text-4xl font-extrabold leading-tight mb-4">
            Welcome to the streamIT Movieverse
          </h2>
          <p className="mb-6 text-lg">
            Dive into a curated collection of cinematic greatness, handpicked
            for true fans.
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
