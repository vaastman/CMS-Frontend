import React from 'react';
import { assets } from '../assets/assest.js';

const Gallery = () => {
  const images = [
    assets.img01,
    assets.img02,
    assets.img03,
    assets.img04,
    assets.img05,
    assets.img06,
    assets.img07,
    assets.img08,
  ];

  return (
    <div className="w-full max-w-6xl mx-auto py-10 px-4">

      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-5xl font-serif font-semibold text-neutral-900">
          Gallery
        </h1>

        <div className="flex gap-4">
          <button className="px-6 py-2 border border-red-700 text-red-700 rounded-md hover:bg-red-700 hover:text-white">
            News
          </button>
        </div>
      </div>

      {/* 3D Tilt Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {images.map((src, index) => (
          <div
            key={index}
            className="
              bg-white rounded-xl overflow-hidden shadow-lg 
              transition-all duration-300 transform 
              hover:-translate-y-2 hover:shadow-2xl
              hover:scale-[1.03]
              hover:rotate-[1deg]
              cursor-pointer
              group
            "
          >
            {/* Image */}
            <div className="overflow-hidden">
              <img
                src={src}
                alt="gallery"
                className="
                  w-full h-64 object-cover 
                  transition-transform duration-500 
                  group-hover:scale-110 
                "
              />
            </div>

            {/* Light Bottom Glow */}
            <div className="h-2 w-full bg-gradient-to-r from-red-400/40 to-transparent"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
