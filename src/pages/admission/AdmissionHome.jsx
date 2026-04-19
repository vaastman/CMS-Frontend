import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPublicAdmissionWindows } from "@/api/publicAdmission.api";
import { FaCalendarAlt, FaArrowRight } from "react-icons/fa";

const AdmissionHome = () => {
  const navigate = useNavigate();
  const [, forceUpdate] = useState(0);
  const [admissions, setAdmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ========= COUNTDOWN RERENDER ========= */
  useEffect(() => {
    const timer = setInterval(() => {
      forceUpdate((p) => p + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  /* ========= FETCH DATA ========= */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getPublicAdmissionWindows();
        const windows = res?.data?.data?.admissionWindows || [];

        const formatted = windows.map((w) => ({
          id: w.id,
          title: w.title,
          courseName: "UG SEM-IV",
          startDate: new Date(w.startDate),
          endDate: new Date(w.endDate),
        }));

        setAdmissions(formatted);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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

  const getStatus = (start, end) => {
    const now = new Date();
    if (now < start) return "UPCOMING";
    if (now > end) return "CLOSED";
    return "OPEN";
  };

  return (
    <div className="min-h-screen bg-[color:var(--color-page)]">

      {/* ================= HERO ================= */}
      <section
        className="py-16 text-center text-white"
        style={{
          background:
            "linear-gradient(135deg, var(--color-primary), #072a50)",
        }}
      >
        <h1 className="text-4xl font-bold">
          Online Admission Portal
        </h1>
        <p className="mt-3 text-sm opacity-90">
          Apply for Undergraduate & Postgraduate Programs
        </p>

        <div
          className="mt-6 w-20 h-1 mx-auto rounded-full"
          style={{ backgroundColor: "var(--color-secondary)" }}
        />
      </section>

      {/* ================= PROGRAM SECTION ================= */}
      <section className="max-w-7xl mx-auto px-6 py-14">
        <h2
          className="text-2xl font-semibold text-center mb-12"
          style={{ color: "var(--color-text-primary)" }}
        >
          Available Admissions
        </h2>

        {loading ? (
          <p className="text-center text-[color:var(--color-text-secondary)] animate-pulse">
            Loading admission windows...
          </p>
        ) : admissions.length === 0 ? (
          <div className="text-center bg-[color:var(--color-surface)] shadow rounded-xl p-10 border border-[color:var(--color-divider)]">
            <p className="text-[color:var(--color-text-secondary)]">
              No admission windows are currently open.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {admissions.map((item) => {
              const status = getStatus(item.startDate, item.endDate);
              const isOpen = status === "OPEN";
              const timeLeft = getTimeLeft(item.endDate);

              return (
                <div
                  key={item.id}
                  className="bg-[color:var(--color-surface)] border border-[color:var(--color-border)] rounded-2xl p-6 shadow-sm hover:shadow-lg transition"
                >
                  {/* STATUS BADGE */}
                  <div className="flex justify-between items-center mb-4">
                    <span
                      className="text-xs px-3 py-1 rounded-full font-semibold"
                      style={{
                        backgroundColor:
                          status === "OPEN"
                            ? "var(--color-success)"
                            : status === "UPCOMING"
                            ? "var(--color-warning)"
                            : "var(--color-divider)",
                        color: status === "CLOSED"
                          ? "var(--color-text-secondary)"
                          : "#fff",
                      }}
                    >
                      {status}
                    </span>

                    <FaCalendarAlt
                      style={{ color: "var(--color-secondary)" }}
                    />
                  </div>

                  <h3
                    className="text-lg font-bold"
                    style={{ color: "var(--color-primary)" }}
                  >
                    {item.title}
                  </h3>

                  <p className="text-sm text-[color:var(--color-text-secondary)] mt-1">
                    {item.courseName}
                  </p>

                  <div className="mt-4 text-sm space-y-1">
                    <p>
                      <strong>Start:</strong> {formatDate(item.startDate)}
                    </p>
                    <p>
                      <strong>End:</strong> {formatDate(item.endDate)}
                    </p>
                  </div>

                  {/* COUNTDOWN */}
                  {isOpen && timeLeft && (
                    <div className="mt-5 grid grid-cols-4 gap-2 text-center text-sm">
                      {Object.entries(timeLeft).map(([k, v]) => (
                        <div
                          key={k}
                          className="rounded-lg py-3 border"
                          style={{
                            borderColor: "var(--color-divider)",
                            backgroundColor: "var(--color-page)",
                          }}
                        >
                          <p
                            className="font-bold"
                            style={{ color: "var(--color-primary)" }}
                          >
                            {v}
                          </p>
                          <p className="uppercase text-xs text-[color:var(--color-text-secondary)]">
                            {k}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* APPLY BUTTON */}
                  <button
                    disabled={!isOpen}
                    onClick={() =>
                      navigate(
                        `/admission/student-registration?windowId=${item.id}`
                      )
                    }
                    className="mt-6 w-full rounded-xl py-2.5 font-medium flex items-center justify-center gap-2 transition"
                    style={{
                      backgroundColor: isOpen
                        ? "var(--color-primary)"
                        : "var(--color-divider)",
                      color: isOpen
                        ? "#fff"
                        : "var(--color-text-secondary)",
                    }}
                  >
                    {isOpen ? "Apply Now" : status}
                    <FaArrowRight size={12} />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};

export default AdmissionHome;