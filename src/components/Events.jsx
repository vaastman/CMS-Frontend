import React, { useState } from "react";
import { assets } from "../assets/assest";

const Events = () => {
  const [category, setCategory] = useState("all");

  const events = [
    {
      title: "Console Gaming",
      category: "tech",
      img: assets.img01,
      desc: "Join intense console gaming battles and competitions.",
    },
    {
      title: "Annual Sports Fest",
      category: "sports",
      img: assets.img02,
      desc: "Participate in exciting sports events and win medals.",
    },
    {
      title: "Cultural Night",
      category: "cultural",
      img: assets.img03,
      desc: "A night full of music, dance and fun celebrations.",
    },
    {
      title: "Hackathon",
      category: "tech",
      img: assets.img04,
      desc: "Build, innovate and compete with the brightest minds.",
    },
  ];

  const filtered =
    category === "all"
      ? events
      : events.filter((e) => e.category === category);

  return (
    <section className="w-full px-4 py-16 bg-[var(--color-page)]">

      {/* Heading */}
      <h1 className="text-4xl sm:text-5xl font-serif font-bold
                     text-center mb-12
                     text-[var(--color-text-primary)]">
        Events & Activities
      </h1>

      {/* Tabs */}
      <div className="flex justify-center gap-4 mb-10 flex-wrap">
        {["all", "sports", "cultural", "tech"].map((tab) => (
          <button
            key={tab}
            onClick={() => setCategory(tab)}
            className={`px-6 py-2 rounded-full border text-sm font-semibold transition
              ${
                category === tab
                  ? "bg-[var(--color-primary)] text-white border-[var(--color-primary)]"
                  : "border-[var(--color-divider)] text-[var(--color-text-secondary)] hover:bg-[var(--color-primary)] hover:text-white"
              }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Event Cards */}
      <div
        className="
          flex gap-6
          overflow-x-auto
          scroll-smooth
          no-scrollbar
          snap-x snap-mandatory
          pb-6
        "
      >
        {filtered.map((ev, i) => (
          <div
            key={i}
            className="
              snap-center
              flex-shrink-0
              w-[85%]
              sm:w-[55%]
              lg:w-[30%]
              bg-[var(--color-surface)]
              rounded-2xl
              shadow-lg
              p-5
              transition
              hover:-translate-y-2
              hover:shadow-2xl
            "
          >
            {/* Image */}
            <div className="overflow-hidden rounded-xl mb-5 h-56">
              <img
                src={ev.img}
                alt={ev.title}
                className="w-full h-full object-cover"
              />
            </div>

            <h2 className="text-2xl font-bold text-center mb-2
                           text-[var(--color-text-primary)]">
              {ev.title}
            </h2>

            <p className="text-center text-[var(--color-text-secondary)] mb-6">
              {ev.desc}
            </p>

            <div className="text-center">
              <button
                className="px-6 py-2 rounded-md font-semibold
                           border border-[var(--color-primary)]
                           text-[var(--color-primary)]
                           hover:bg-[var(--color-primary)]
                           hover:text-white
                           transition"
              >
                View Event
              </button>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
};

export default Events;
