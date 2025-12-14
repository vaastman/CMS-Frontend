import React, { useState } from "react"
import { FaBullhorn } from "react-icons/fa"
import principalImg from "../assets/image/pic02.jpg"

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
}

const NoticeAndPrincipal = () => {
  const [activeTab, setActiveTab] = useState("notice")

  return (
    <section className="w-full bg-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">

        {/* ================= LEFT : NOTICES ================= */}
        <div>
          <h2 className="text-3xl font-medium text-blue-700 mb-6">
            Notices & Announcements
          </h2>

          {/* Tabs */}
          <div className="bg-white rounded-full shadow flex justify-between px-4 py-3 mb-8">
            <button
              onClick={() => setActiveTab("notice")}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition
                ${activeTab === "notice"
                  ? "bg-yellow-600 text-white"
                  : "text-blue-700 hover:bg-gray-100"}
              `}
            >
              Notice Board
            </button>

            <button
              onClick={() => setActiveTab("exam")}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition
                ${activeTab === "exam"
                  ? "bg-yellow-600 text-white"
                  : "text-blue-700 hover:bg-gray-100"}
              `}
            >
              Examination & Results
            </button>

            <button
              onClick={() => setActiveTab("activity")}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition
                ${activeTab === "activity"
                  ? "bg-yellow-600 text-white"
                  : "text-blue-700 hover:bg-gray-100"}
              `}
            >
              Activities & Events
            </button>
          </div>

          {/* Notices List (Filtered) */}
          <ul className="space-y-4 text-blue-700">
            {noticeData[activeTab].map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <FaBullhorn className="mt-1 text-black" />
                <span className="hover:underline cursor-pointer">
                  {item}
                </span>
              </li>
            ))}
          </ul>

          <button className="mt-8 px-6 py-2 border-2 border-yellow-600 text-blue-700 font-semibold hover:bg-yellow-600 hover:text-white transition">
            VIEW MORE
          </button>
        </div>

        {/* ================= RIGHT : PRINCIPAL DESK ================= */}
        <div>
          <h2 className="text-3xl font-medium text-blue-700 mb-6 uppercase">
            From the Desk of Principal.
          </h2>

          <div className="flex flex-col md:flex-row gap-6">
            <img
              src={principalImg}
              alt="Principal"
              className="w-full md:w-[220px] h-[260px] object-cover rounded shadow"
            />

            <div className="text-gray-800 text-sm leading-relaxed text-justify">
              <p>
                It gives me utmost pleasure and pride to address all of you as
                the principal of this very prestigious institution and its
                bright students.
              </p>

              <p className="mt-3">
                At Sant Sandhya Das Mahavidyalaya, we strive towards achieving
                the epitome of academic and maintaining training discipline
                amongst the student and faculty alike. Knowledge, skill and
                learning are our three pillars of strength based on which we
                aim to mould our dynamic students into excellent professionals.
              </p>

              <p className="mt-3">
                Here, we have a dedicated team of esteemed faculty focused on
                providing our students with appropriate knowledge and all the
                opportunities necessary for them to realize their true
                potential and achieve exemplary success.
              </p>

              <p className="mt-4 font-semibold">Thank you</p>
              <p className="font-semibold">
                Dr. Kaushal Kishore Singh (Principal)
              </p>
              <p className="font-semibold">M.Sc. (Chemistry), Ph.D.</p>
              <p className="font-semibold">
                SSDM College, Barh, Patna
              </p>

              <button className="mt-2 text-red-600 font-semibold hover:underline">
                Read More.
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

export default NoticeAndPrincipal
