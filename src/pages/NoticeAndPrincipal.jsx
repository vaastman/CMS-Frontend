import React, { useState } from "react";
import { FaBullhorn } from "react-icons/fa";
import principalImg from "../assets/image/pic02.jpg";

const noticeData = {
  notice: [
    "Regarding admission form 3rd sem-2025",
    "Notice Regarding Mop-Up Admission Round of sem-1 (2025)",
    "Notice Regarding Admission in UG Regular Sem-1 (2025)",
    "Regarding Admission of 2nd sem-2025",
    "Regarding Admission Payment of 4th Sem. (2025)",
  ],
  exam: [
    "UG Semester-1 Examination Schedule 2025",
    "Notice Regarding Practical Examination Dates",
    "Result Declaration of UG Semester-2",
    "Backlog Examination Registration Open",
  ],
  activity: [
    "Annual Sports Meet 2025",
    "Cultural Program Registration Open",
    "NSS Blood Donation Camp",
    "Career Guidance & Placement Workshop",
  ],
};

const NoticeAndPrincipal = () => {
  const [activeTab, setActiveTab] = useState("notice");

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
          <ul className="space-y-4 text-[var(--color-text-primary)]">
            {noticeData[activeTab].map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <FaBullhorn className="mt-1 text-[var(--color-secondary)]" />
                <span className="hover:underline cursor-pointer">
                  {item}
                </span>
              </li>
            ))}
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
                It gives me utmost pleasure and pride to address all of you as
                the principal of this very prestigious institution and its
                bright students.
              </p>

              <p className="mt-3">
                At Sant Sandhya Das Mahavidyalaya, we strive towards achieving
                the epitome of academic excellence and maintaining discipline
                amongst the students and faculty alike. Knowledge, skill and
                learning are our three pillars of strength.
              </p>

              <p className="mt-3">
                We have a dedicated team of esteemed faculty focused on
                providing our students with appropriate knowledge and all the
                opportunities necessary to realize their true potential.
              </p>

              <p className="mt-4 font-semibold text-[var(--color-text-primary)]">
                Thank you
              </p>
              <p className="font-semibold text-[var(--color-text-primary)]">
                Dr. Kaushal Kishore Singh (Principal)
              </p>
              <p className="font-semibold text-[var(--color-text-primary)]">
                M.Sc. (Chemistry), Ph.D.
              </p>
              <p className="font-semibold text-[var(--color-text-primary)]">
                SSDM College, Barh, Patna
              </p>

              <button
                className="mt-2 text-[var(--color-primary)] font-semibold hover:underline"
              >
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
