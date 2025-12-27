import React, { useState } from "react";
import { assets } from "../assets/assest.js";

const Gallery = () => {
  const galleryData = [
    { src: assets.img01, category: "events" },
    { src: assets.img02, category: "campus" },
    { src: assets.img03, category: "events" },
    { src: assets.img04, category: "campus" },
    { src: assets.img05, category: "events" },
    { src: assets.img06, category: "campus" },
    { src: assets.img07, category: "events" },
    { src: assets.img08, category: "campus" },
  ];

  const [activeFilter, setActiveFilter] = useState("all");

  const filteredImages =
    activeFilter === "all"
      ? galleryData
      : galleryData.filter((item) => item.category === activeFilter);

  return (
    <div className="w-full bg-[color:var(--color-page)]">
      <div className="max-w-7xl mx-auto px-6 py-16">

        {/* ================= HEADER ================= */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-semibold text-[color:var(--color-text-primary)]">
              Gallery
            </h1>
            <p className="text-[color:var(--color-text-secondary)] mt-2">
              Explore moments, events, and campus life
            </p>
          </div>

          {/* ================= FILTER BUTTONS ================= */}
          <div className="flex gap-3">
            {["all", "events", "campus"].map((filter) => {
              const isActive = activeFilter === filter;

              return (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`
                    px-6 py-2 rounded-lg border font-medium transition
                    ${
                      isActive
                        ? "bg-[color:var(--color-primary)] text-white border-[color:var(--color-primary)]"
                        : "border-[color:var(--color-divider)] text-[color:var(--color-text-primary)] hover:bg-gray-200"
                    }
                  `}
                >
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </button>
              );
            })}
          </div>
        </div>

        {/* ================= GALLERY GRID ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredImages.length > 0 ? (
            filteredImages.map((item, index) => (
              <div
                key={index}
                className="
                  bg-[color:var(--color-surface)] rounded-2xl overflow-hidden
                  shadow-md hover:shadow-xl
                  transition-all duration-300
                  group cursor-pointer
                "
              >
                {/* Image */}
                <div className="relative overflow-hidden aspect-[4/3]">
                  <img
                    src={item.src}
                    alt="Gallery"
                    className="
                      w-full h-full object-cover
                      transition-transform duration-500
                      group-hover:scale-110
                    "
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition" />
                </div>

                {/* Accent Bar */}
                <div className="h-1 w-full bg-[color:var(--color-primary)]"></div>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-[color:var(--color-text-secondary)]">
              No images found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
