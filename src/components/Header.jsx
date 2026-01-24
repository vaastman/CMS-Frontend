import React, { useState } from "react";
import { assets } from "../assets/assest";
import {
  FaFacebook,
  FaInstagramSquare,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";


const Header = () => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();


  return (
    <>
      {/* ================= HEADER ================= */}
      <header className="w-full bg-[var(--color-surface)] border-b border-[var(--color-divider)] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-6">

            {/* LEFT */}
            <div className="flex items-center gap-4">
              <img
                src={assets.nm_logo}
                alt="College Logo"
                className="w-16 h-16 md:w-20 md:h-20 object-contain"
              />
              <div>
                <h2 className="text-sm md:text-lg font-bold text-[var(--color-text-primary)]">
                  संत संध्या दास महिला कॉलेज, बाढ़ (पटना)
                </h2>
                <h2 className="text-sm md:text-lg font-bold text-[var(--color-text-primary)]">
                  Sant Sandhya Das Mahavidyalaya, Barh, Patna
                </h2>
                <p className="hidden md:block text-sm text-[var(--color-text-secondary)]">
                  Affiliated to Patliputra University, Patna
                </p>
              </div>
            </div>

            {/* RIGHT */}
            <div className="flex flex-col items-center md:items-end gap-3">
              <nav className="hidden md:flex items-center gap-4 text-sm font-medium text-[var(--color-text-secondary)]">
                <a className="hover:text-[var(--color-primary)] cursor-pointer">
                  Admission Portal
                </a>
                <a className="hover:text-[var(--color-primary)] cursor-pointer">Gallery</a>
                <a className="hover:text-[var(--color-primary)] cursor-pointer">Feedback</a>
                <a className="hover:text-[var(--color-primary)] cursor-pointer">Location</a>

                <FaFacebook className="hover:text-[var(--color-primary)] cursor-pointer" />
                <FaTwitter className="hover:text-[var(--color-primary)] cursor-pointer" />
                <FaInstagramSquare className="hover:text-[var(--color-primary)] cursor-pointer" />
                <FaLinkedin className="hover:text-[var(--color-primary)] cursor-pointer" />
              </nav>

              <div className="flex items-center gap-4 text-sm text-[var(--color-text-primary)]">
                <div className="text-right">
                  <p className="font-semibold">📞 +91-7549298333</p>
                  <p className="font-semibold">✉ ssdmcollege78@gmail.com</p>
                </div>

                <button
                   onClick={() => navigate("/admission/admission-portal")}
                  className="px-4 py-2 rounded-md font-semibold text-white
                             bg-[var(--color-primary)]
                             hover:bg-[var(--color-secondary)]
                             transition"
                >
                  Online Admission
                </button>
              </div>
            </div>

          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
