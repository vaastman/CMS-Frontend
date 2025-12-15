import React from 'react'
import { NavLink } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";

const VisionMission = () => {
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
                    <h1 className="text-white text-4xl font-bold">Vision & Mission</h1>
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
                            "Vision & Mission",
                            "College Founder",
                            "Infrastructure"
                            
                        ].map((item, i) => (
                            <li key={i}>
                                <NavLink
                                    to="#"
                                    className="text-blue-600 hover:text-blue-800 hover:underline"
                                >
                                    • {item}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </aside>

                {/* ===== RIGHT CONTENT ===== */}
                <section className="md:col-span-3 text-gray-800 leading-7 text-[15px]">
                    <h3 className='text-blue-700 font-semibold  pb-2'>Our Vision</h3>
                    <p className="mb-4">
                        To further evolve into an institution capable of imparting world-class education through skill training and value-based education, aimed at making significant contribution to nation building and cater to the needs of the community. The objective is to create an academic pedestal that disseminates the values of conscious co-existence and achievement of excellence.
                    </p>

                    <h3 className='text-blue-700 font-semibold pb-2'>Our Mission</h3>
                    <p className="mb-4">
                        The mission of Sant Sandhya Das Mahavidyalaya,Barh,Patna is to provide the right opportunity to the students from all sectors of the country and other countries, with the intention to improve the socio-economic status of the society. The prime objective of Baghmara College is to elevate the level of value-based education and skill-based teaching and training.
                    </p>


                </section>
            </div>

        </div>
    )
}

export default VisionMission