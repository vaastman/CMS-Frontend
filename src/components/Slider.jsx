import React, { useEffect, useState } from "react";

const Slider = ({ images = [], autoPlay = true, interval = 4500 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!autoPlay || images.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === images.length - 1 ? 0 : prev + 1
      );
    }, interval);

    return () => clearInterval(timer);
  }, [autoPlay, interval, images.length]);

  if (!images.length) return null;

  return (
    <section className="relative w-full h-[300px] md:h-[520px] lg:h-[620px] overflow-hidden">

      {/* ================= SLIDES ================= */}
      {images.map((img, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000
            ${currentIndex === index ? "opacity-100 z-10" : "opacity-0 z-0"}`}
        >
          <img
            src={img}
            alt={`Slide ${index + 1}`}
            className="w-full h-full object-cover"
            draggable={false}
          />

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/55" />
        </div>
      ))}

      {/* ================= HERO CONTENT ================= */}
      <div className="relative z-20 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-white">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight max-w-3xl">
            Shaping Futures Through Quality Education
          </h1>

          <p className="mt-5 text-base md:text-lg text-white/85 max-w-2xl">
            Empowering students with knowledge, innovation, and excellence for a brighter tomorrow.
          </p>

          <div className="mt-8 flex gap-4">
            <button className="px-6 py-3 bg-[var(--color-secondary)] text-black font-semibold rounded-md hover:opacity-90 transition">
              Explore Programs
            </button>

            <button className="px-6 py-3 border border-white/70 rounded-md hover:bg-white hover:text-black transition">
              Admissions
            </button>
          </div>
        </div>
      </div>

      {/* ================= DOT INDICATORS ================= */}
      <div className="absolute bottom-6 w-full flex justify-center gap-3 z-20">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition
              ${currentIndex === index ? "bg-white" : "bg-white/40"}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Slider;
