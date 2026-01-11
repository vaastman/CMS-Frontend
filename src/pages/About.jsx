import React from "react";
import about1 from "../assets/image/pic01.jpg";
import about2 from "../assets/image/pic02.jpg";

const About = () => {
  return (
    <section className="w-full bg-[var(--color-page)] py-16">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* LEFT CONTENT */}
        <div>
          <h2 className="text-4xl font-semibold text-[var(--color-primary)] mb-6">
            About
          </h2>

          <p className="text-[var(--color-text-secondary)] leading-relaxed text-justify">
            Sant Sandhya Das Mahila College, Barh (Patna) received affiliation
            up to graduate prestige level by Patliputra University, Patna and
            Government of Bihar. The organization’s ability to expand Sandhya
            Das, the saint of flood situated on the banks of Ganga, the meeting
            place of Mithila and Magadh. The college got the only affiliation
            from Barahiya to Patna City and Barh situated in the middle of
            Patna City. It is an important center of women’s education.
            Which since 1978 has been a symbol of historical, educational
            and cultural tolerance. It is an immortal symbol and has its
            limitless potential for expansion embedded in its numbers...
          </p>

          <button
            className="mt-8 px-6 py-2 rounded-md font-semibold
                       border border-[var(--color-primary)]
                       text-[var(--color-primary)]
                       hover:bg-[var(--color-primary)]
                       hover:text-white
                       transition"
          >
            View More
          </button>
        </div>

        {/* RIGHT IMAGES */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <img
            src={about1}
            alt="Students learning"
            className="w-full h-[300px] object-cover rounded-lg shadow-sm"
          />
          <img
            src={about2}
            alt="Library study"
            className="w-full h-[300px] object-cover rounded-lg shadow-sm"
          />
        </div>

      </div>
    </section>
  );
};

export default About;
