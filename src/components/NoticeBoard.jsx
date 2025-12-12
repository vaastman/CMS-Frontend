import React from 'react'

const NoticeBoard = () => {

    const notices = [
    "Notice regarding verification and online admission process for BBA, BCA & B.Sc Bio-Tech.",
    "Notice regarding required documents for admission (BBA, BCA & B.Sc Bio-Tech), 2025.",
    "Notice regarding filling of U.G. Semester-I examination forms and attendance verification.",
    "Notice regarding downloading and submitting Offline Examination Forms.",
    "Verification of 75% attendance and submission of offline exam forms.",
    "U.G. Semester I Exam Form (Session 2025-2029).",
    "Class Commencement Schedule for BCA, BBA and B.Sc Bio-Tech.",
    "Holiday notice on the occasion of Dr. Rajendra Prasad Jayanti.",
  ];

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-3xl font-serif font-semibold text-neutral-900">
          Notice
        </h2>

        <button className="text-sm text-red-700 font-medium hover:underline underline-offset-4">
          View All →
        </button>
      </div>

      {/* Notice Card */}
      <div className="bg-white border border-neutral-200 rounded-xl shadow-sm p-5">
        <ul className="space-y-3">
          {notices.map((item, index) => (
            <li
              key={index}
              className="text-[15px] text-neutral-700 hover:text-red-700 hover:underline underline-offset-2 cursor-pointer transition-all"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default NoticeBoard