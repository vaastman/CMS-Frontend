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
        { label: "Principal Desk", to: "/principle-desk" },
      ],
    },
    {
      label: "Admissions",
      dropdown: [
        { label: "Online Admission Form", to: "/Online-admission-form" },
        { label: "Course And Subject", to: "/courses-and-subject" },
        { label: "Admission Process", to: "/admissions-process" },
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
        { label: "Attendance", to: "/attendence" },
        { label: "Anti-Ragging", to: "/anti-ragging" },
        { label: "Rules & Regulations", to: "/rules-regulations" },
        { label: "Student Grievance", to: "/student-grievance" },
      ],
    },
    { label: "Gallery", to: "/gallery" },
    { label: "Contact Us", to: "/contact" },
  ];

  return (
    <>
      {/* ================= DESKTOP NAVBAR ================= */}
      <nav className="hidden md:block bg-[var(--color-primary)] text-white shadow-md relative z-40">
        <ul className="flex justify-center items-center gap-8 py-3 text-sm font-medium">
          {menu.map((item, i) => (
            <li key={i} className="relative group">
              {item.dropdown ? (
                <>
                  <span className="flex items-center gap-1 cursor-pointer hover:text-[var(--color-secondary)] transition">
                    {item.label}
                    <FiChevronDown className="mt-[1px]" />
                  </span>

                  {/* DROPDOWN */}
                  <ul className="absolute top-full left-0 mt-3 w-56 bg-[var(--color-surface)] 
                                 text-[var(--color-text-primary)] rounded-md shadow-lg
                                 opacity-0 invisible group-hover:opacity-100 group-hover:visible
                                 translate-y-2 group-hover:translate-y-0 transition-all z-50">
                    {item.dropdown.map((sub, j) => (
                      <li key={j}>
                        <NavLink
                          to={sub.to}
                          className="block px-4 py-2 text-sm hover:bg-[var(--color-secondary)] hover:text-white transition"
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
                    `transition ${
                      isActive
                        ? "text-[var(--color-secondary)]"
                        : "hover:text-[var(--color-secondary)]"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* ================= MOBILE MENU BUTTON ================= */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 text-3xl
                   text-[var(--color-secondary)]"
        onClick={() => setOpen(true)}
      >
        <FiMenu />
      </button>

      {/* ================= MOBILE SIDEBAR ================= */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-[var(--color-surface)] z-50 shadow-xl
                    transform transition-transform duration-300
                    ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex justify-between items-center px-4 py-4 border-b border-[var(--color-divider)]">
          <span className="font-semibold text-sm text-[var(--color-text-primary)]">
            Sant Sandhya Das Mahavidyalaya
          </span>
          <FiX
            className="text-2xl cursor-pointer text-[var(--color-text-secondary)]"
            onClick={() => setOpen(false)}
          />
        </div>

        <ul className="flex flex-col px-4 py-4 gap-1 text-sm">
          {menu.map((item, i) => (
            <li key={i}>
              {item.dropdown ? (
                <>
                  <button
                    className="flex justify-between w-full py-2 font-medium
                               text-[var(--color-text-primary)]"
                    onClick={() =>
                      setMobileDropdown(mobileDropdown === i ? null : i)
                    }
                  >
                    {item.label}
                    <FiChevronDown
                      className={`transition ${
                        mobileDropdown === i ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {mobileDropdown === i && (
                    <ul className="ml-4 border-l border-[var(--color-divider)] pl-3">
                      {item.dropdown.map((sub, j) => (
                        <li key={j}>
                          <NavLink
                            to={sub.to}
                            onClick={() => setOpen(false)}
                            className="block py-1 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
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
                  className="block py-2 font-medium text-[var(--color-text-primary)]"
                >
                  {item.label}
                </NavLink>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* ================= OVERLAY ================= */}
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
