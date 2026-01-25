import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdmissionHome = () => {
  const navigate = useNavigate();
  const [, forceUpdate] = useState(0);

  /* ========= FORCE RERENDER FOR COUNTDOWN ========= */
  useEffect(() => {
    const timer = setInterval(() => {
      forceUpdate((p) => p + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  /* ========= NOTICE DATA ========= */
  const notices = [
    "📌 Last date for B.A / B.Sc admission is 30 April 2027",
    "📌 B.Com applicants must have Commerce background",
    "📌 Incomplete applications will be rejected",
    "📌 Fees payment is ONLINE only",
  ];

  /* ========= STUDENT PROFILE (TEMP) ========= */
  const studentProfile = {
    ugCompleted: true,
    commerceBackground: true,
    pgCompleted: true,
  };

  /* ========= PROGRAM DATA ========= */
  const admissions = [
    {
      title: "B.A / B.Sc (Semester II)",
      session: "2025 – 2029",
      course: "ba-bsc",
      startDate: new Date("2025-02-01"),
      endDate: new Date("2027-04-30"),
      eligible: studentProfile.ugCompleted,
      reason: "UG qualification required",
    },
    {
      title: "B.Com (S.F) Semester II",
      session: "2025 – 2029",
      course: "bcom",
      startDate: new Date("2025-03-10"),
      endDate: new Date("2027-05-15"),
      eligible: studentProfile.commerceBackground,
      reason: "Commerce background required",
    },
    {
      title: "M.A / M.Sc (Semester IV)",
      session: "2024 – 2026",
      course: "ma-msc",
      startDate: new Date("2025-01-20"),
      endDate: new Date("2025-03-31"),
      eligible: studentProfile.pgCompleted,
      reason: "PG qualification required",
    },
  ];

  /* ========= HELPERS ========= */
  const getTimeLeft = (endDate) => {
    const diff = endDate - new Date();
    if (diff <= 0) return null;

    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / 1000 / 60) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  };

  const formatDate = (date) =>
    date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  return (
    <div className="min-h-screen bg-[color:var(--color-page)]">
      {/* ================= NOTICE TICKER ================= */}
      <div className="sticky top-0 bg-[color:var(--color-secondary)] text-white overflow-hidden">
        <div className="animate-marquee whitespace-nowrap flex gap-12 px-6 py-2 text-sm font-medium">
          {notices.map((notice, i) => (
            <span key={i}>{notice}</span>
          ))}
        </div>
      </div>

      {/* ================= HEADER ================= */}
      <section className="bg-[color:var(--color-surface)] border-b border-[color:var(--color-divider)]">
        <div className="max-w-7xl mx-auto px-6 py-10 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-[color:var(--color-text-primary)]">
            Online Admission Portal
          </h1>
          <p className="mt-2 text-sm text-[color:var(--color-text-secondary)]">
            Apply online for Undergraduate & Postgraduate Programs
          </p>
        </div>
      </section>

      {/* ================= PROGRAMS ================= */}
      <section className="max-w-6xl mx-auto px-6 py-14">
        <h2 className="text-2xl font-semibold text-center mb-12">
          Available Programs
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {admissions.map((item, i) => {
            const now = new Date();
            const isStarted = now >= item.startDate;
            const isClosed = now > item.endDate;
            const isOpen = isStarted && !isClosed;
            const timeLeft = getTimeLeft(item.endDate);

            let buttonText = "Apply Now";
            if (!isStarted) buttonText = "Not Started";
            else if (isClosed) buttonText = "Closed";
            else if (!item.eligible) buttonText = "Not Eligible";

            const disabled = !isOpen || !item.eligible;

            return (
              <div
                key={i}
                className="bg-[color:var(--color-surface)] border border-[color:var(--color-border)] rounded-2xl p-6 shadow-sm hover:shadow-md transition"
              >
                <h3 className="text-lg font-semibold text-[color:var(--color-text-primary)]">
                  {item.title}
                </h3>

                <p className="text-sm text-[color:var(--color-text-secondary)] mt-1">
                  Session: {item.session}
                </p>

                <div className="mt-4 text-sm space-y-1">
                  <p>
                    <strong>Start:</strong> {formatDate(item.startDate)}
                  </p>
                  <p>
                    <strong>End:</strong> {formatDate(item.endDate)}
                  </p>
                </div>

                {/* Countdown */}
                {isOpen && timeLeft && (
                  <div className="mt-4 flex gap-3 text-center text-sm">
                    {Object.entries(timeLeft).map(([k, v]) => (
                      <div
                        key={k}
                        className="bg-[color:var(--color-primary)]/10 rounded-lg px-3 py-2"
                      >
                        <p className="font-bold">{v}</p>
                        <p className="uppercase text-xs">{k}</p>
                      </div>
                    ))}
                  </div>
                )}

                {!item.eligible && isOpen && (
                  <p className="mt-3 text-sm text-[color:var(--color-danger)]">
                    ⚠ {item.reason}
                  </p>
                )}

                <button
                  disabled={disabled}
                  onClick={() =>
                    navigate(
                      `/admission/student-registration?course=${item.course}`
                    )
                  }
                  className={`mt-6 w-full rounded-xl py-2.5 font-medium ${
                    disabled
                      ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                      : "bg-[color:var(--color-primary)] text-white hover:opacity-90"
                  }`}
                >
                  {buttonText}
                </button>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default AdmissionHome;
