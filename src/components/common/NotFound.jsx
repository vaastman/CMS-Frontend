import React from "react";
import { NavLink } from "react-router-dom";
import { FiHome, FiAlertTriangle } from "react-icons/fi";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1A237E] to-[#3949AB] px-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full text-center p-10">
        
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <FiAlertTriangle className="text-yellow-500 text-6xl" />
        </div>

        {/* 404 */}
        <h1 className="text-6xl font-extrabold text-[#1A237E] mb-2">
          404
        </h1>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-slate-800 mb-3">
          Page Not Found
        </h2>

        {/* Description */}
        <p className="text-slate-600 mb-8">
          Sorry, the page you are looking for does not exist, may have been
          removed, or the URL is incorrect.
        </p>

        {/* Button */}
        <NavLink
          to="/"
          className="inline-flex items-center gap-2 bg-[#1A237E] hover:bg-[#0d154a] text-white px-6 py-3 rounded-full text-sm font-medium transition-all"
        >
          <FiHome className="text-lg" />
          Back to Home
        </NavLink>
      </div>
    </div>
  );
};

export default NotFound;
