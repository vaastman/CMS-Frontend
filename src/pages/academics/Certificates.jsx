import React from 'react'

const Certificates = () => {
  return (
     <div className="w-full">

            {/* ================= HERO SECTION ================= */}
            <div
                className="relative h-[300px] md:h-[380px] bg-cover bg-center"
                style={{
                    backgroundImage:
                        "url('https://images.unsplash.com/photo-1519682337058-a94d519337bc')",
                }}
            >
                <div className="absolute inset-0 bg-black/40"></div>

                <div className="relative z-10 h-full flex items-center px-10 md:px-24">
                    <h1 className="text-white text-4xl md:text-5xl font-semibold">
                       Certificates
                    </h1>
                </div>
            </div>

            {/* ================= ANNOUNCEMENT BAR ================= */}
            <div className="bg-yellow-600 text-white py-3 px-6 flex items-center gap-4 text-sm md:text-base">
                <span className="font-semibold uppercase">Important Announcements</span>
                <span className="hidden md:inline">||</span>
                <marquee className="flex-1">
                    ▶ Welcome to SSDM College, Barh &nbsp;&nbsp;
                    ▶ Regarding admission form 3rd sem-2025 &nbsp;&nbsp;
                    ▶ Notice Regard
                </marquee>
            </div>

            {/* ================= BREADCRUMB ================= */}
            <div className="px-6 md:px-24 py-6 text-sm text-gray-600">
                Home &gt; <span className="text-black">Academics</span>
            </div>

            {/* ================= MAIN CONTENT ================= */}
            <div className="px-6 md:px-24 pb-16 grid grid-cols-1 md:grid-cols-4 gap-10">

                {/* ===== LEFT SIDEBAR ===== */}
                <aside className="md:col-span-1">
                    <h3 className="text-blue-700 font-semibold mb-4">Sub Menu</h3>
                    <ul className="space-y-2 text-blue-600">
                        <li className="hover:text-yellow-600 cursor-pointer">Courses</li>
                        <li className="hover:text-yellow-600 cursor-pointer">Faculty</li>
                        <li className="hover:text-yellow-600 cursor-pointer">
                            Academics Calendar
                        </li>
                        <li className="hover:text-yellow-600 cursor-pointer">
                            Administrative Staff
                        </li>
                        <li className="hover:text-yellow-600 cursor-pointer">Faculty</li>
                        <li className="hover:text-yellow-600 cursor-pointer">
                            Holiday List
                        </li>
                    </ul>
                </aside>

                {/* ===== RIGHT CONTENT ===== */}
                <section className="md:col-span-3">
                    <div>

                        <h2 className="text-blue-700 text-xl font-semibold mb-3">
                            Bachelor of Arts (B.A.)
                        </h2>

                        <p className="text-gray-700 leading-relaxed mb-4">
                            Bachelor of Arts or BA is an undergraduate program that comes under
                            the discipline of humanities/arts. BA course duration is 3 years.
                            One having 10+2 degree in any stream can take up this course. The
                            subjects offered in BA are:
                        </p>

                        <ul className="list-disc list-inside space-y-2 text-gray-700">
                            <li>B.A. Ancient History (AIAS) (Major)</li>
                            <li>B.A. Economics (Major)</li>
                            <li>B.A. English (Major)</li>
                            <li>B.A. Hindi (Major)</li>
                            <li>B.A. History (Major)</li>
                            <li>B.A. Home Science (Major)</li>
                            <li>B.A. Labour and Social Welfare (Major)</li>
                            <li>B.A. Philosophy (Major)</li>
                            <li>B.A. Political Science (Major)</li>
                            <li>B.A. Psychology (Major)</li>
                            <li>B.A. Sanskrit (Major)</li>
                            <li>B.A. Sociology (Major)</li>
                            <li>B.A. Urdu (Major)</li>
                        </ul>
                        <p className="mt-6">The general procedure for admission to the course is merit-based, marks obtained by the candidate at the 10+2 level. B.A. Course is one of the oldest known courses and with the completion of the course one can pursue for M.A course. Interested students can contact us today.
                        </p>
                        <p>For each subject we have experienced and qualified teachers.</p>
                    </div>
                     <div className="mt-6">

                        <h2 className="text-blue-700 text-xl font-semibold mb-3">
                            Bachelor of Science (B.Sc.)
                        </h2>

                        <p className="text-gray-700 leading-relaxed mb-4">
                            B.Sc or Bachelor of Science is an undergraduate degree of three years duration. A few of the common B.S. 
                            courses students generally undertake after 10+2 are B.Sc. in Mathematics, Physics, Chemistry, Botany & Zoology.
                        </p>

                        <ul className="list-disc list-inside space-y-2 text-gray-700">
                            <li>B.A. Ancient History (AIAS) (Major)</li>
                            <li>B.A. Economics (Major)</li>
                            <li>B.A. English (Major)</li>
                            <li>B.A. Hindi (Major)</li>
                            <li>B.A. History (Major)</li>
                                                    </ul>
                        <p className="mt-6">The general procedure for admission to the course is merit-based, marks obtained by the candidate at the 10+2 level. B.A. Course is one of the oldest known courses and with the completion of the course one can pursue for M.A course. Interested students can contact us today.
                        </p>
                        <p>For each subject we have experienced and qualified teachers.</p>
                    </div>
                </section>
            </div>

        </div>
  )
}

export default Certificates