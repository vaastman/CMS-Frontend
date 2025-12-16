import React from 'react'
import { NavLink } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";

const PrincipalDesk = () => {
    return (
        <div className="w-full">
            {/* ===== HERO SECTION ===== */}
            <div
                className="relative h-[320px] flex items-center"
                style={{
                    backgroundImage:
                        "url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <div className="absolute inset-0 bg-black/50"></div>
                <div className="relative z-10 max-w-7xl mx-auto px-6">
                    <h1 className="text-white text-4xl font-bold">Principal's Desk</h1>
                </div>
            </div>

            {/* ===== ANNOUNCEMENT BAR ===== */}
            <div className="bg-[#d4a017] text-white py-3">
                <div className="max-w-7xl mx-auto px-6 flex items-center gap-4 text-sm">
                    <span className="font-semibold whitespace-nowrap">
                        IMPORTANT ANNOUNCEMENTS
                    </span>
                    <span className="opacity-80">|</span>
                    <marquee className="whitespace-nowrap">
                        UG Regular Sem-1 (2025) › Regarding Admission of 2nd Sem-2025 ›
                        Regarding Admission Payment of 4th Sem (2025)
                    </marquee>
                </div>
            </div>

            {/* ===== BREADCRUMB ===== */}
            <div className="max-w-7xl mx-auto px-6 py-4 text-sm text-gray-600">
                Home <FaChevronRight className="inline mx-2 text-xs" /> Academics
            </div>

            {/* ===== MAIN CONTENT ===== */}
            <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-10">
                {/* ===== LEFT SIDEBAR ===== */}
                <aside className="md:col-span-1">
                    <h3 className="text-blue-700 font-semibold mb-4 border-b pb-2">
                        Sub Menu
                    </h3>
                    <ul className="space-y-2 text-sm">
                        {[
                            "Secretary's Message",
                            "Principal's Desk",
                            "Others",
                        ].map((item, i) => (
                            <li key={i}>
                                <NavLink
                                    to="#"
                                    className="text-blue-800 hover:text-blue-800 hover:underline font-w-semibold"
                                >
                                    • {item}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </aside>

                {/* ===== RIGHT CONTENT ===== */}
                <section className="md:col-span-3 text-gray-800 leading-7 text-[15px]">
                    <p className="mb-4">
                        Sant Sandhya Das Mahila College, Barh (Patna) received affiliation
                        up to graduate prestige level by Patliputra University, Patna and
                        Government of Bihar. Organization’s ability to expand Sandhya Das,
                        the saint of flood situated on the banks of Ganga, the meeting place
                        of Mithila and Magadh.
                    </p>

                    <p className="mb-4">
                        The college got the only affiliation from Barhiyai to Patna City and
                        Barh situated in the middle of Patna City. It is an important center
                        of women’s education which since 1978 has been a symbol of
                        historical, educational and cultural tolerance.
                    </p>

                    <p className="mb-4">
                        It is an immortal symbol and has its limitless potential for
                        expansion embedded in its numbers. (a) Affiliated college with wide
                        land of the college, playground, well-organized laboratory, library
                        and good educational environment up to graduate prestige level.
                    </p>

                    <p className="mb-4">
                        (b) This college, situated near the National Highway, is slowly
                        growing like moonlight, occupying its place of progress in a
                        philosophical posture.
                    </p>

                    <p>
                        (c) For better arrangement of women’s education, arrangements for
                        conducting vocational courses can be developed in this college.
                    </p>
                </section>
            </div>

        </div>
    )
}

export default PrincipalDesk