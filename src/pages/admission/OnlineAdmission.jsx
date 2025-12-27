import React from "react";
import {
  FaUserGraduate,
  FaFileAlt,
  FaMoneyCheckAlt,
  FaCheckCircle,
} from "react-icons/fa";

const OnlineAdmission = () => {
  return (
    <div className="w-full bg-[color:var(--color-page)]">

      {/* ================= HERO SECTION ================= */}
     <div
  className="relative py-20 bg-cover bg-center"
  style={{
    backgroundImage:
      "url('https://images.unsplash.com/photo-1760917094679-d33f2ec13110')",
  }}
>
  {/* Overlay */}
  <div className="absolute inset-0 bg-black/60"></div>

  {/* Content */}
  <div className="relative max-w-7xl mx-auto px-6 text-white">
    <h1 className="text-4xl md:text-5xl font-semibold">
      Online Admission
    </h1>
    <p className="mt-3 text-sm md:text-base opacity-90 max-w-2xl">
      Apply online for admission by following the simple steps below.
      Ensure all details are correct before submission.
    </p>
  </div>
</div>


      {/* ================= STEPS ================= */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-semibold mb-10 text-[color:var(--color-text-primary)]">
          Admission Process
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            {
              icon: <FaUserGraduate />,
              title: "Register",
              desc: "Create your student account using a valid email and mobile number.",
            },
            {
              icon: <FaFileAlt />,
              title: "Fill Application",
              desc: "Enter personal, academic, and course-related details carefully.",
            },
            {
              icon: <FaMoneyCheckAlt />,
              title: "Pay Fees",
              desc: "Pay the application fee securely using online payment options.",
            },
            {
              icon: <FaCheckCircle />,
              title: "Submit & Track",
              desc: "Submit the form and track admission status from your dashboard.",
            },
          ].map((step, i) => (
            <div
              key={i}
              className="bg-[color:var(--color-surface)] rounded-2xl p-6 shadow-md hover:shadow-lg transition"
            >
              <div className="text-4xl text-[color:var(--color-primary)] mb-4">
                {step.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-[color:var(--color-text-secondary)]">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= ELIGIBILITY & NOTICE ================= */}
      <section className="bg-[color:var(--color-surface)] py-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10">

          {/* Eligibility */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">
              Eligibility Criteria
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-sm text-[color:var(--color-text-primary)]">
              <li>Applicants must have passed qualifying examination.</li>
              <li>Minimum marks as per university norms.</li>
              <li>Required documents must be uploaded correctly.</li>
              <li>Admission is subject to merit and seat availability.</li>
            </ul>
          </div>

          {/* Notice */}
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">
              Important Notice
            </h3>
            <p className="text-sm text-gray-700">
              Please ensure that all information entered in the online
              application form is correct. Incomplete or incorrect forms
              may be rejected without prior notice.
            </p>
          </div>
        </div>
      </section>

      {/* ================= ACTION SECTION ================= */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold mb-4">
            Ready to Apply?
          </h2>
          <p className="text-sm mb-8 text-[color:var(--color-text-secondary)]">
            Start your online admission process by clicking the button below.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 rounded-lg bg-[color:var(--color-primary)] text-white font-medium hover:opacity-90 transition">
              New Admission Registration
            </button>
            <button className="px-8 py-3 rounded-lg border border-[color:var(--color-primary)] text-[color:var(--color-primary)] font-medium hover:bg-gray-100 transition">
              Existing Applicant Login
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};

export default OnlineAdmission;
