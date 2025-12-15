import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FiMenu, FiX, FiChevronDown } from "react-icons/fi";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [mobileDropdown, setMobileDropdown] = useState(null);

  const menu = [
    { label: "Home", to: "/" },
    {
      label: "About Us",
      dropdown: [
        { label: "About College", to: "/about_college" },
        { label: "Vision & Mission", to: "/vision-mission" },
      ],
    },
    {
      label: "Admissions",
      dropdown: [
        { label: "Courses Offered", to: "/courses" },
        { label: "Admission Process", to: "/admissions" },
      ],
    },
    {
      label: "Academics",
      dropdown: [
        { label: "Faculty", to: "/faculty" },
        { label: "Administrative Staff", to: "/staff" },
        { label: "Holiday List", to: "/holidays" },
        { label: "Certificate Courses", to: "/certificates" },
        { label: "Academic Calendar", to: "/calendar" },
      ],
    },
    { label: "Examination", to: "/examination" },
    {
      label: "Student Support",
      dropdown: [
        { label: "Scholarship", to: "/scholarship" },
        { label: "Grievance Cell", to: "/grievance" },
      ],
    },
    { label: "Gallery", to: "/gallery" },
    { label: "Contact Us", to: "/contact" },
  ];

  return (
    <>
      {/* DESKTOP NAVBAR */}
      <nav className="hidden md:block bg-[#1A237E] text-white shadow-md z-50">
        <ul className="flex justify-center items-center gap-8 py-3 text-sm font-medium">
          {menu.map((item, i) => (
            <li key={i} className="relative group">
              {item.dropdown ? (
                <>
                  <span className="flex items-center gap-1 cursor-pointer hover:text-yellow-400">
                    {item.label}
                    <FiChevronDown />
                  </span>

                  {/* DROPDOWN */}
                  <ul className="absolute top-full left-0 mt-3 w-56 bg-white text-slate-800 rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                    {item.dropdown.map((sub, j) => (
                      <li key={j}>
                        <NavLink
                          to={sub.to}
                          className="block px-4 py-2 hover:bg-slate-100"
                        >
                          {sub.label}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    isActive
                      ? "text-yellow-400"
                      : "hover:text-yellow-400"
                  }
                >
                  {item.label}
                </NavLink>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* MOBILE MENU BUTTON */}
      <button
        className="md:hidden fixed top-3 left-3 z-50 text-3xl text-yellow-400"
        onClick={() => setOpen(true)}
      >
        <FiMenu />
      </button>

      {/* MOBILE SIDEBAR */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-white z-50 shadow-lg transform transition-transform ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center px-4 py-4 border-b">
          <span className="font-semibold text-lg">Sant Sandhya Das Mahavidyalaya</span>
          <FiX
            className="text-2xl cursor-pointer"
            onClick={() => setOpen(false)}
          />
        </div>

        <ul className="flex flex-col px-4 py-4 gap-2">
          {menu.map((item, i) => (
            <li key={i}>
              {item.dropdown ? (
                <>
                  <button
                    className="flex justify-between w-full py-2 font-medium"
                    onClick={() =>
                      setMobileDropdown(
                        mobileDropdown === i ? null : i
                      )
                    }
                  >
                    {item.label}
                    <FiChevronDown />
                  </button>

                  {mobileDropdown === i && (
                    <ul className="ml-4">
                      {item.dropdown.map((sub, j) => (
                        <li key={j}>
                          <NavLink
                            to={sub.to}
                            onClick={() => setOpen(false)}
                            className="block py-1 text-slate-600"
                          >
                            {sub.label}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <NavLink
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="block py-2 font-medium"
                >
                  {item.label}
                </NavLink>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* OVERLAY */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar;
