import React, { useEffect, useState } from "react";

const Slider = ({ images = [], autoPlay = true, interval = 4000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // ================= AUTOPLAY =================
  useEffect(() => {
    if (!autoPlay || images.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === images.length - 1 ? 0 : prev + 1
      );
    }, interval);

    return () => clearInterval(timer);
  }, [autoPlay, interval, images.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  if (!images.length) return null;

  return (
    <div className="relative w-full h-[260px] md:h-[520px] overflow-hidden
                    bg-[var(--color-surface)] shadow-lg">

      {/* ================= SLIDES ================= */}
      <div
        className="flex h-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`slide-${index + 1}`}
            className="w-full h-full object-cover flex-shrink-0"
            draggable="false"
          />
        ))}
      </div>

      {/* ================= PREV ================= */}
      <button
        onClick={prevSlide}
        aria-label="Previous Slide"
        className="absolute left-4 top-1/2 -translate-y-1/2
                   bg-black/40 hover:bg-black/60
                   text-white w-10 h-10 rounded-full
                   flex items-center justify-center
                   transition"
      >
        ❮
      </button>

      {/* ================= NEXT ================= */}
      <button
        onClick={nextSlide}
        aria-label="Next Slide"
        className="absolute right-4 top-1/2 -translate-y-1/2
                   bg-black/40 hover:bg-black/60
                   text-white w-10 h-10 rounded-full
                   flex items-center justify-center
                   transition"
      >
        ❯
      </button>

      {/* ================= DOTS ================= */}
      <div className="absolute bottom-4 w-full flex justify-center gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-2.5 rounded-full transition-all
              ${
                currentIndex === index
                  ? "w-6 bg-[var(--color-secondary)]"
                  : "w-2.5 bg-white/60 hover:bg-white"
              }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;
