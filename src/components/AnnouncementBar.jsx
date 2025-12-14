import React, { useRef, useState } from "react"
import { FaPause, FaPlay, FaCaretRight } from "react-icons/fa"

const announcements = [
  "Welcome to SSDM College, Barh",
  "Regarding admission form 3rd sem-2025",
  "Notice Regarding Mop-Up Admission Round of sem-1 (2025)",
  "Notice Regarding Admission in UG Regular Sem-1 (2025)",
  "Regarding Admission of 2nd sem-2025",
  "Regarding Admission Payment of 4th Sem. (2025)",
]

const AnnouncementBar = () => {
  const marqueeRef = useRef(null)
  const [paused, setPaused] = useState(false)

  const handlePause = () => {
    marqueeRef.current.style.animationPlayState = "paused"
    setPaused(true)
  }

  const handlePlay = () => {
    marqueeRef.current.style.animationPlayState = "running"
    setPaused(false)
  }

  return (
    <div className="w-full bg-[#D09821] text-white py-2 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-12 items-center gap-2">

        {/* LEFT TEXT */}
        <div className="hidden md:block col-span-2 text-xs uppercase">
          IMPORTANT ANNOUNCEMENTS
        </div>

        {/* CONTROLS */}
        <div className="col-span-2 md:col-span-1 flex gap-3">
          <button onClick={handlePause} aria-label="Pause">
            <FaPause />
          </button>
          <button onClick={handlePlay} aria-label="Play">
            <FaPlay />
          </button>
        </div>

        {/* MARQUEE */}
        <div className="col-span-10 md:col-span-9 overflow-hidden relative">
          <div
            ref={marqueeRef}
            className="flex gap-8 whitespace-nowrap animate-marquee"
          >
            {[...announcements, ...announcements].map((text, index) => (
              <span key={index} className="flex items-center gap-2 text-sm">
                <FaCaretRight />
                <a href="#" className="hover:underline">
                  {text}
                </a>
              </span>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}

export default AnnouncementBar
