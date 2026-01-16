import React, { useRef, useState } from "react";
import { FaPause, FaPlay } from "react-icons/fa";

const announcements = [
  "Welcome to SSDM College, Barh",
  "Regarding admission form 3rd sem-2025",
  "Notice Regarding Mop-Up Admission Round of sem-1 (2025)",
  "Notice Regarding Admission in UG Regular Sem-1 (2025)",
  "Regarding Admission of 2nd sem-2025",
  "Regarding Admission Payment of 4th Sem. (2025)",
];

const AnnouncementBar = () => {
  const marqueeRef = useRef(null);
  const [paused, setPaused] = useState(false);

  const togglePlay = () => {
    if (!paused) {
      marqueeRef.current.style.animationPlayState = "paused";
      setPaused(true);
    } else {
      marqueeRef.current.style.animationPlayState = "running";
      setPaused(false);
    }
  };

  return (
    <div className="w-full bg-[#D09821] text-white">
      <div className="max-w-7xl mx-auto px-6 flex items-center h-12">

        {/* BADGE */}
        <div className="hidden md:flex items-center font-semibold text-xs uppercase
                        bg-black/20 px-4 h-full tracking-wider">
          Notice
        </div>

        {/* MARQUEE */}
        <div className="flex-1 overflow-hidden mx-4">
          <div
            ref={marqueeRef}
            className="flex gap-10 whitespace-nowrap animate-marquee text-sm"
          >
            {[...announcements, ...announcements].map((text, index) => (
              <a
                key={index}
                href="#"
                className="hover:underline"
              >
                {text}
              </a>
            ))}
          </div>
        </div>

        {/* CONTROL */}
        <button
          onClick={togglePlay}
          aria-label={paused ? "Play announcements" : "Pause announcements"}
          className="flex items-center justify-center w-8 h-8
                     border border-white/40 rounded-full
                     hover:bg-white/20 transition"
        >
          {paused ? <FaPlay size={12} /> : <FaPause size={12} />}
        </button>
      </div>
    </div>
  );
};

export default AnnouncementBar;
