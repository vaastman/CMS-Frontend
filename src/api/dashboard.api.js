// src/api/dashboard.api.js
import api from "./api";

/* ================= DASHBOARD STATS ================= */
export const getDashboardStats = async () => {
  const res = await api.get("/admin-dashboard/stats");
  return res.data?.data;
};

/* ================= LAST 10 ADMISSIONS ================= */
export const getLast10Admissions = async () => {
  const res = await api.get("/admin-dashboard/admissions/last-10");
  return res.data?.data?.admissions || [];
};

/* ================= COMBINED DASHBOARD DATA ================= */
export const getDashboardData = async () => {
  const [stats, admissions] = await Promise.all([
    getDashboardStats(),
    getLast10Admissions(),
  ]);

  return {
    stats,
    admissions,
  };
};
