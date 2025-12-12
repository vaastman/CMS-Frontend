import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const navItems = [
    { to: "/", label: "Home" },
    { to: "/mou", label: "MOUs" },
    { to: "/campus", label: "Campus" },
    { to: "/contact", label: "Contact Us" },
    { to: "/gallery", label: "Gallery" },
  ];

  return (
    <>
      {/* NAVBAR - Desktop remains the same */}
      <nav className="backdrop-blur-xl hidden md:block py-1 bg-white/60 shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between ">
          {/* Desktop Menu CENTERED */}
          <ul className="hidden md:flex items-center gap-10 absolute left-1/2 transform -translate-x-1/2 text-[15px] font-medium">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    isActive
                      ? "text-[#1A237E] font-semibold border-b-2 border-[#1A237E] pb-1"
                      : "text-slate-700 hover:text-[#1A237E] hover:border-b-2 hover:border-[#1A237E] pb-1 transition-all"
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* MOBILE/TABLET Hamburger */}
      <button
        onClick={() => setOpen(true)}
        className="md:hidden fixed top-2 left-1 z-50 text-4xl text-slate-700 "
      >
        <FiMenu />
      </button>

      {/* MOBILE SIDEBAR */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-xl z-50 transform transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-64"
        }`}
      >
        {/* Close Button */}
        <div className="flex items-center justify-between px-4 py-4 border-b">
          <button onClick={() => setOpen(false)} className="text-3xl text-slate-700">
            <FiX />
          </button>
        </div>

        {/* Sidebar Links */}
        <ul className="flex flex-col gap-6 px-6 mt-6 font-medium text-[16px]">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  isActive
                    ? "text-[#1A237E] font-semibold border-l-4 border-[#1A237E] pl-3"
                    : "text-slate-700 hover:text-[#1A237E] pl-3 transition-all"
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {/* BG Overlay for mobile */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden"
        ></div>
      )}
    </>
  );
};

export default Navbar;
