import React, { useState, useEffect } from "react";
import { FaBullhorn } from "react-icons/fa";
import { getNotices } from "@/api/cms.api";
import { toast } from "react-toastify";
import principalImg from "../assets/image/pic02.jpg";

const NoticeAndPrincipal = () => {
  const [activeTab, setActiveTab] = useState("notice");
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(false);

  // ================= FETCH NOTICES =================
  useEffect(() => {
    fetchNotices(activeTab);
  }, [activeTab]);

  const fetchNotices = async (type) => {
    try {
      setLoading(true);

      // If backend supports category filtering
      const res = await getNotices();


      // Adjust this depending on backend response structure
      const data =
        res?.data?.data?.notices ||
        res?.data?.data ||
        res?.data ||
        [];

      setNotices(data);
    } catch (err) {
      console.error("Fetch Notices Error:", err);
      toast.error("Failed to load notices");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full bg-[var(--color-page)] py-16">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">

        {/* ================= LEFT : NOTICES ================= */}
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

          {/* Notices List */}
          <ul className="space-y-4 text-[var(--color-text-primary)] min-h-[150px]">
            {loading ? (
              <li className="text-gray-500">Loading notices...</li>
            ) : notices.length > 0 ? (
              notices.map((item, index) => (
                <li
                  key={item.id || index}
                  className="flex items-start gap-3"
                >
                  <FaBullhorn className="mt-1 text-[var(--color-secondary)]" />
                  <span className="hover:underline cursor-pointer">
                    {item.title}
                  </span>
                </li>
              ))
            ) : (
              <li className="text-gray-500">
                No notices available.
              </li>
            )}
          </ul>

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

        {/* ================= RIGHT : PRINCIPAL DESK ================= */}
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
              <p className="font-semibold text-[var(--color-text-primary)]">
                M.Sc. (Chemistry), Ph.D.
              </p>
              <p className="font-semibold text-[var(--color-text-primary)]">
                SSDM College, Barh, Patna
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
