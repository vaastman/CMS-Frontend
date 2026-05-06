import React, { useState, useEffect } from "react";
import principalImg from "../assets/image/principle.jpeg";
import noticeImg from "../assets/image/Notice_SSDM.jpeg";

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
    "परीक्षा फॉर्म भरने के बाद महाविद्यालय के काउंटर पर आकर निम्नांकित documents जमा करा दें।",
    "semester III/I का के अंकपत्र के छायाप्रति",
    "Semester VI/II के नामांकन के भुगतान रशीद",
    "परीक्षा फॉर्म का भुगतान रसीद",
    "Aadhar Card के छायाप्रति",
    "Apaar ID Card के छायाप्रति",
    // "परीक्षा फॉर्म भरने के बाद महाविद्यालय के काउन्टर पर आकर निम्नांकित कागजात जमा कर दें।",

    // "Semester V के अंकपत्र के छायाप्रति",
    // "Semester V के एडमिट कार्ड के (छायाप्रति)",
    // "Semester VI के परीक्षा फॉर्म के प्रिंट आउट",
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