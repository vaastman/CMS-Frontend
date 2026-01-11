import React from "react"
import {
  FaFileDownload,
  FaMoneyBillWave,
  FaUserGraduate,
  FaUniversity,
  FaCalendarAlt,
  FaClipboardList,
  FaBook,
  FaListAlt,
} from "react-icons/fa"

const links = [
  { title: "Download\nBrochure", icon: <FaFileDownload size={30} /> },
  { title: "Fee\nStructure", icon: <FaMoneyBillWave size={30} /> },
  { title: "Placement &\nInternship", icon: <FaUserGraduate size={30} /> },
  { title: "Freeship &\nScholarships", icon: <FaUniversity size={30} /> },
  { title: "Time\nTables", icon: <FaCalendarAlt size={30} /> },
  { title: "Online\nRegistration", icon: <FaClipboardList size={30} /> },
  { title: "Library", icon: <FaBook size={30} /> },
  { title: "Syllabus", icon: <FaListAlt size={30} /> },
]

const QuickLinks = () => {
  return (
    <section className="w-full bg-[var(--color-primary)] py-14">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-8 text-center">

        {links.map((item, index) => (
          <div
            key={index}
            className="group cursor-pointer flex flex-col items-center gap-4"
          >
            {/* ICON CIRCLE */}
            <div
              className="
                w-24 h-24 rounded-full
                border-4 border-white
                flex items-center justify-center
                bg-transparent
                transition-colors duration-500
                group-hover:bg-[var(--color-secondary)]
              "
            >
              {/* ICON (FLIP ON HOVER – SAME AS YOUR CODE) */}
              <div
                className="
                  text-white
                  transition-transform duration-500
                  transform
                  group-hover:rotate-y-180
                "
                style={{ transformStyle: "preserve-3d" }}
              >
                {item.icon}
              </div>
            </div>

            {/* TEXT */}
            <p className="
              text-white text-sm font-semibold whitespace-pre-line
              group-hover:text-[var(--color-secondary)]
            ">
              {item.title}
            </p>
          </div>
        ))}

      </div>
    </section>
  )
}

export default QuickLinks
