import React, { useState } from "react";
import { assets } from "../assets/assest";
import {
  FaFacebook,
  FaInstagramSquare,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";

const Header = () => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    if (!data.course || !data.name || !data.mobile || !data.email) {
      setError("Please fill all required fields.");
      return;
    }

    console.log("Admission Enquiry:", data);
    setOpen(false);
    e.target.reset();
  };

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
                  onClick={() => setOpen(true)}
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

      {/* ================= MODAL ================= */}
      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[var(--color-surface)] w-full max-w-md rounded-lg shadow-xl p-6 relative">

            <button
              onClick={() => setOpen(false)}
              className="absolute top-2 right-3 text-xl font-bold
                         text-[var(--color-text-secondary)]
                         hover:text-[var(--color-danger)]"
            >
              ×
            </button>

            <h2 className="text-xl font-bold text-center text-[var(--color-text-primary)] mb-4">
              Online Admission Enquiry
            </h2>

            {error && (
              <p className="text-sm text-[var(--color-danger)] text-center mb-3">
                {error}
              </p>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {["course", "name", "mobile", "email"].map((field, i) =>
                field === "course" ? (
                  <select
                    key={i}
                    name="course"
                    className="w-full border border-[var(--color-divider)] rounded-md px-3 py-2
                               focus:ring-2 focus:ring-[var(--color-primary)]"
                  >
                    <option value="">Select Course</option>
                    <option>B.A</option>
                    <option>B.Sc</option>
                    <option>B.Com</option>
                    <option>M.A</option>
                  </select>
                ) : (
                  <input
                    key={i}
                    name={field}
                    type={field === "email" ? "email" : "text"}
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    className="w-full border border-[var(--color-divider)] rounded-md px-3 py-2
                               focus:ring-2 focus:ring-[var(--color-primary)]"
                  />
                )
              )}

              <button
                type="submit"
                className="w-full py-2 rounded-md font-semibold text-white
                           bg-[var(--color-primary)]
                           hover:bg-[var(--color-secondary)]
                           transition"
              >
                Submit Enquiry
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
