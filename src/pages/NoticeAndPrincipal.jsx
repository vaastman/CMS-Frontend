import React, { useState, useEffect } from "react";
import principalImg from "../assets/image/principle.jpeg";
import noticeImg from "../assets/image/Apr_Notice.jpeg";

const NoticeAndPrincipal = () => {
  const [openModal, setOpenModal] = useState(false);

  // Close modal on 'Esc' key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setOpenModal(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const noticePoints = [
    "परीक्षा फॉर्म भरने के बाद महाविद्यालय के काउन्टर पर आकर निम्नांकित कागजात जमा कर दें।",
    "Semester VI के नामांकन के भुगतान रशीद",
    "Semester V के अंकपत्र के छायाप्रति",
    "Semester V के एडमिट कार्ड के (छायाप्रति)",
    "Semester VI के परीक्षा फॉर्म के प्रिंट आउट",
  ];

  return (
    <section className="w-full bg-[var(--color-page)] py-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        
        {/* ================= LEFT SIDE: NOTICES ================= */}
        <div className="lg:col-span-5 group">
  <div className="flex items-center gap-3 mb-8">
    <h2 className="text-3xl font-bold text-[var(--color-primary)] tracking-tight">
      Notices
    </h2>
    <div className="h-[2px] flex-grow bg-gradient-to-r from-[var(--color-primary)] to-transparent opacity-20"></div>
  </div>

  <div className="relative bg-[var(--color-surface)] border border-gray-100 rounded-2xl shadow-xl shadow-gray-200/50 overflow-hidden">
    {/* Accent Header */}
    <div className="bg-[var(--color-primary)] px-6 py-3 flex justify-between items-center">
      <span className="text-white font-medium text-sm tracking-wide uppercase">Announcements</span>
      <span className="flex h-2 w-2 relative">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
      </span>
    </div>

    <div className="p-6">
      <ul className="space-y-4">
        {noticePoints.map((point, index) => {
          // Check if it's the first instruction line for special styling
          const isUrgentHeader = index === 0;

          if (isUrgentHeader) {
            return (
              <li key={index} className="bg-amber-50 border border-amber-200 p-4 rounded-xl mb-6">
                <div className="flex gap-3">
                  <span className="text-amber-600 font-bold">📢</span>
                  <span className="text-sm md:text-base font-bold text-amber-900 leading-tight">
                    {point}
                  </span>
                </div>
              </li>
            );
          }

          return (
            <li key={index} className="flex gap-3 text-[var(--color-text-primary)] leading-relaxed border-b border-gray-50 pb-3 last:border-0 last:pb-0">
              <span className="text-[var(--color-primary)] mt-1.5">•</span>
              <span className="text-sm md:text-base font-medium">{point}</span>
            </li>
          );
        })}
      </ul>

      <button
        onClick={() => setOpenModal(true)}
        className="mt-8 w-full py-3 px-6 rounded-xl bg-[var(--color-primary)] text-white font-bold hover:shadow-lg hover:brightness-110 transition-all duration-300 transform hover:-translate-y-0.5"
      >
        View Full Notice Details
      </button>
    </div>
  </div>
</div>

        {/* ================= RIGHT SIDE: PRINCIPAL ================= */}
        <div className="lg:col-span-7">
          <h2 className="text-3xl font-bold text-[var(--color-primary)] mb-8 tracking-tight uppercase">
            Principal's Message
          </h2>

          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Image with Decorative Element */}
            <div className="relative shrink-0 mx-auto md:mx-0">
              <div className="absolute -bottom-3 -right-3 w-full h-full border-2 border-[var(--color-primary)] rounded-xl -z-10"></div>
              <img
                src={principalImg}
                alt="Principal"
                className="w-full md:w-[240px] h-[300px] object-cover rounded-xl shadow-md"
              />
            </div>

            <div className="flex flex-col">
              <div className="relative">
                <span className="absolute -top-6 -left-4 text-6xl text-[var(--color-primary)] opacity-10 font-serif">“</span>
                <div className="text-[var(--color-text-secondary)] text-base leading-relaxed space-y-4 text-justify italic">
                  <p>
                    It gives me immense pleasure to address you as the principal
                    of this prestigious institution. At Sant Sandhya Das Mahavidyalaya, 
                    we strive towards academic excellence and holistic development.
                  </p>
                  <p>
                    Our dedicated faculty ensures every student receives the best
                    opportunities to realize their full potential and navigate the 
                    challenges of the modern world.
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-100">
                <h4 className="text-lg font-bold text-[var(--color-text-primary)]">
                  Dr. Kaushal Kishore Singh
                </h4>
                <p className="text-[var(--color-primary)] text-sm font-medium">Principal, SSDM</p>
                
                <button className="mt-4 flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-[var(--color-primary)] hover:gap-3 transition-all">
                  Read Full Bio <span>→</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= MODAL ================= */}
      {openModal && (
        <div 
          className="fixed inset-0 bg-slate-900/90 backdrop-blur-sm flex items-center justify-center z-[100] p-4"
          onClick={() => setOpenModal(false)}
        >
          <div 
            className="bg-white rounded-2xl overflow-hidden max-w-4xl w-full shadow-2xl transition-all scale-100"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="font-bold text-gray-800">Official Notification</h3>
              <button
                onClick={() => setOpenModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition"
              >
                <span className="text-xl">✕</span>
              </button>
            </div>
            
            <div className="p-2 bg-gray-50 overflow-y-auto max-h-[80vh]">
              <img
                src={noticeImg}
                alt="Full Notice"
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default NoticeAndPrincipal;

// import React, { useState, useEffect } from "react";
// import { FaBullhorn } from "react-icons/fa";
// import { getNotices } from "@/api/cms.api";
// import principalImg from "../assets/image/principle.jpeg";

// const NoticeAndPrincipal = () => {
//   const [activeTab, setActiveTab] = useState("notice");
//   const [notices, setNotices] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [errorMsg, setErrorMsg] = useState("");

//   /* ================= FETCH NOTICES ================= */
//   const fetchNotices = async (category) => {
//     try {
//       setLoading(true);
//       setErrorMsg("");

//       // If backend supports filtering, pass category
//       const res = await getNotices({ category });

//       console.log("Notice API Response:", res.data);

//       const noticeItems = res?.data?.data?.noticeItems || [];

//       setNotices(Array.isArray(noticeItems) ? noticeItems : []);
//     } catch (err) {
//       console.error("Fetch Notices Error:", err);

//       if (err.response?.status === 500) {
//         setErrorMsg("Notice service is temporarily unavailable.");
//       } else if (err.response?.status === 404) {
//         setErrorMsg("Notice API endpoint not found.");
//       } else {
//         setErrorMsg("Unable to load notices.");
//       }

//       setNotices([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchNotices(activeTab);
//   }, [activeTab]);

//   return (
//     <section className="w-full bg-[var(--color-page)] py-16">
//       <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">

//         {/* LEFT SIDE */}
//         <div>
//           <h2 className="text-3xl font-semibold text-[var(--color-primary)] mb-6">
//             Notices & Announcements
//           </h2>

//           {/* Tabs */}
//           <div className="bg-[var(--color-surface)] rounded-full shadow-sm flex justify-between px-3 py-2 mb-8">
//             {[
//               { key: "notice", label: "Notice Board" },
//               { key: "exam", label: "Examination & Results" },
//               { key: "activity", label: "Activities & Events" },
//             ].map((tab) => (
//               <button
//                 key={tab.key}
//                 onClick={() => setActiveTab(tab.key)}
//                 className={`px-5 py-2 rounded-full text-sm font-semibold transition
//                   ${
//                     activeTab === tab.key
//                       ? "bg-[var(--color-primary)] text-white"
//                       : "text-[var(--color-text-secondary)] hover:bg-[var(--color-page)]"
//                   }`}
//               >
//                 {tab.label}
//               </button>
//             ))}
//           </div>

//           {/* Notices */}
//           <div className="min-h-[160px]">
//             {loading && (
//               <p className="text-gray-500 text-sm">Loading notices...</p>
//             )}

//             {!loading && errorMsg && (
//               <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-lg text-sm">
//                 {errorMsg}
//               </div>
//             )}

//             {!loading && !errorMsg && notices.length === 0 && (
//               <p className="text-gray-500 text-sm">
//                 No notices available.
//               </p>
//             )}

//             {!loading && !errorMsg && notices.length > 0 && (
//               <ul className="space-y-4 text-[var(--color-text-primary)]">
//                 {notices.map((item) => (
//                   <li
//                     key={item.id}
//                     className="flex items-start gap-3"
//                   >
//                     <FaBullhorn className="mt-1 text-[var(--color-secondary)]" />
//                     <span className="hover:underline cursor-pointer">
//                       {item.title}
//                     </span>
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>

//           <button
//             className="mt-8 px-6 py-2 rounded-md font-semibold
//                        border border-[var(--color-primary)]
//                        text-[var(--color-primary)]
//                        hover:bg-[var(--color-primary)]
//                        hover:text-white
//                        transition"
//           >
//             View More
//           </button>
//         </div>

//         {/* RIGHT SIDE */}
//         <div>
//           <h2 className="text-3xl font-semibold text-[var(--color-primary)] mb-6 uppercase">
//             From the Desk of Principal
//           </h2>

//           <div className="flex flex-col md:flex-row gap-6">
//             <img
//               src={principalImg}
//               alt="Principal"
//               className="w-full md:w-[220px] h-[260px] object-cover rounded-lg shadow-sm"
//             />

//             <div className="text-[var(--color-text-secondary)] text-sm leading-relaxed text-justify">
//               <p>
//                 It gives me immense pleasure to address you as the principal
//                 of this prestigious institution.
//               </p>

//               <p className="mt-3">
//                 At Sant Sandhya Das Mahavidyalaya, we strive towards academic
//                 excellence and holistic development of our students.
//               </p>

//               <p className="mt-3">
//                 Our dedicated faculty ensures every student receives the best
//                 opportunities to realize their full potential.
//               </p>

//               <p className="mt-4 font-semibold text-[var(--color-text-primary)]">
//                 Dr. Kaushal Kishore Singh (Principal)
//               </p>

//               <button className="mt-2 text-[var(--color-primary)] font-semibold hover:underline">
//                 Read More
//               </button>
//             </div>
//           </div>
//         </div>

//       </div>
//     </section>
//   );
// };

// export default NoticeAndPrincipal;
