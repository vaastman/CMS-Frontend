import React, { useState, useEffect } from "react";
import { FaBullhorn } from "react-icons/fa";
import { getNotices } from "@/api/cms.api";
import principalImg from "../assets/image/pic02.jpg";

const NoticeAndPrincipal = () => {
  const [activeTab, setActiveTab] = useState("notice");
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  /* ================= FETCH NOTICES ================= */
  const fetchNotices = async (category) => {
    try {
      setLoading(true);
      setErrorMsg("");

      // If backend supports filtering, pass category
      const res = await getNotices({ category });

      console.log("Notice API Response:", res.data);

      const noticeItems = res?.data?.data?.noticeItems || [];

      setNotices(Array.isArray(noticeItems) ? noticeItems : []);
    } catch (err) {
      console.error("Fetch Notices Error:", err);

      if (err.response?.status === 500) {
        setErrorMsg("Notice service is temporarily unavailable.");
      } else if (err.response?.status === 404) {
        setErrorMsg("Notice API endpoint not found.");
      } else {
        setErrorMsg("Unable to load notices.");
      }

      setNotices([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotices(activeTab);
  }, [activeTab]);

  return (
    <section className="w-full bg-[var(--color-page)] py-16">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">

        {/* LEFT SIDE */}
        <div>
          <h2 className="text-3xl font-semibold text-[var(--color-primary)] mb-6">
            Notices & Announcements
          </h2>

          {/* Tabs */}
          <div className="bg-[var(--color-surface)] rounded-full shadow-sm flex justify-between px-3 py-2 mb-8">
            {[
              { key: "notice", label: "Notice Board" },
              { key: "exam", label: "Examination & Results" },
              { key: "activity", label: "Activities & Events" },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition
                  ${
                    activeTab === tab.key
                      ? "bg-[var(--color-primary)] text-white"
                      : "text-[var(--color-text-secondary)] hover:bg-[var(--color-page)]"
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Notices */}
          <div className="min-h-[160px]">
            {loading && (
              <p className="text-gray-500 text-sm">Loading notices...</p>
            )}

            {!loading && errorMsg && (
              <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-lg text-sm">
                {errorMsg}
              </div>
            )}

            {!loading && !errorMsg && notices.length === 0 && (
              <p className="text-gray-500 text-sm">
                No notices available.
              </p>
            )}

            {!loading && !errorMsg && notices.length > 0 && (
              <ul className="space-y-4 text-[var(--color-text-primary)]">
                {notices.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-start gap-3"
                  >
                    <FaBullhorn className="mt-1 text-[var(--color-secondary)]" />
                    <span className="hover:underline cursor-pointer">
                      {item.title}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>

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

        {/* RIGHT SIDE */}
        <div>
          <h2 className="text-3xl font-semibold text-[var(--color-primary)] mb-6 uppercase">
            From the Desk of Principal
          </h2>

          <div className="flex flex-col md:flex-row gap-6">
            <img
              src={principalImg}
              alt="Principal"
              className="w-full md:w-[220px] h-[260px] object-cover rounded-lg shadow-sm"
            />

            <div className="text-[var(--color-text-secondary)] text-sm leading-relaxed text-justify">
              <p>
                It gives me immense pleasure to address you as the principal
                of this prestigious institution.
              </p>

              <p className="mt-3">
                At Sant Sandhya Das Mahavidyalaya, we strive towards academic
                excellence and holistic development of our students.
              </p>

              <p className="mt-3">
                Our dedicated faculty ensures every student receives the best
                opportunities to realize their full potential.
              </p>

              <p className="mt-4 font-semibold text-[var(--color-text-primary)]">
                Dr. Kaushal Kishore Singh (Principal)
              </p>

              <button className="mt-2 text-[var(--color-primary)] font-semibold hover:underline">
                Read More
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default NoticeAndPrincipal;
