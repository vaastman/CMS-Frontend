import React from "react";
import { assets } from "../assets/assest.js";

const Campus = () => {
  const studentLife = [
    {
      img: assets.art04,
      title: "Counselling Cell",
      text: "Provides academic, career, and personal guidance in a confidential and supportive environment, helping students grow personally and academically."
    },
    {
      img: assets.ncc,
      title: "NCC",
      text: "Instills discipline, leadership, and patriotism through training, drills, and community service, preparing responsible citizens."
    },
    {
      img: assets.sports01,
      title: "NSS",
      text: "Promotes social responsibility and community engagement through activities like cleanliness drives, blood donation, and outreach programs."
    }
  ];

  const artsCulture = [
    {
      img: assets.art01,
      title: "Cultural Events",
      text: "Students participate in dance, drama, music, and cultural shows that nurture creativity and national spirit."
    },
    {
      img: assets.art02,
      title: "Festivals & Celebrations",
      text: "The college celebrates festivals and traditional events, encouraging unity and cultural pride."
    },
    {
      img: assets.art03,
      title: "Art Exhibitions",
      text: "Learners display paintings, crafts, and creative work promoting artistic expression and talent."
    }
  ];

  const athletics = [
    {
      img: assets.sports01,
      title: "Sports & Athletics",
      text: "Provides opportunities in cricket, football, volleyball, and athletics to build fitness, teamwork, and discipline."
    },
    {
      img: assets.art01,
      title: "Recreation Activities",
      text: "Students enjoy fitness activities, indoor games, and wellness programs that support a healthy lifestyle."
    },
    {
      img: assets.wellness01,
      title: "Health & Wellness",
      text: "Awareness programs, yoga sessions, and health camps help maintain mental and physical well-being."
    }
  ];

  const renderSection = (title, dataArr) => (
    <div className="w-full max-w-7xl mx-auto py-14 px-4">
      <h1 className="text-4xl md:text-5xl font-serif font-semibold text-center mb-3 text-neutral-900">
        {title}
      </h1>
      <div className="h-1 w-20 bg-gray-300 mx-auto mb-10 rounded"></div>

      <div className="grid md:grid-cols-3 gap-10">
        {dataArr.map((item, index) => (
          <div
            key={index}
            className="p-4 border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300"
          >
            <img
              src={item.img}
              className="w-full h-60 object-cover rounded-md mb-4"
              alt={item.title}
            />
            <h2 className="text-2xl font-serif text-neutral-900 mb-2">
              {item.title}
            </h2>
            <p className="text-gray-700 leading-relaxed">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="w-full">
      
      {/* MAIN HEADING */}
      <div className="text-center py-10 px-4">
        <h1 className="text-5xl font-serif font-semibold text-neutral-900">
          Campus Life
        </h1>
        <p className="max-w-3xl mx-auto text-gray-700 mt-4 leading-relaxed">
          Campus Life at our college is a blend of learning, culture, sports, and community engagement.
          With vibrant activities and a supportive environment, students experience holistic growth
          and build unforgettable memories.
        </p>
      </div>

      {/* BIG HERO IMAGE */}
      <div className="w-full max-w-6xl mx-auto mb-20 px-4">
        <img
          src={assets.campusMain}
          className="w-full object-contain object-cover rounded-xl  shadow-md"
          alt="Campus"
        />
      </div>

      {/* SECTIONS */}
      {renderSection("Student Life", studentLife)}
      {renderSection("Arts & Culture", artsCulture)}
      {renderSection("Athletics, Recreation & Wellness", athletics)}
    </div>
  );
};

export default Campus;
