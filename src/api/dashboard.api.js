import api from "./api";
/* DASHBOARD STATS */
export const getDashboardStats = async () => {
  try {
    const res = await api.get("/admin-dashboard/stats");
    return res.data?.data || {};
  } catch (error) {
    console.warn("Stats API failed:", error);
    return {};
  }
};

/* LAST 10 ADMISSIONS */
export const getLast10Admissions = async () => {
  try {
    const res = await api.get("/admin-dashboard/admissions/last-10");
    return res.data?.data?.admissions || [];
  } catch (error) {
    console.warn("Admissions API failed:", error);
    return [];
  }
};

/* COMBINED DATA */
export const getDashboardData = async () => {
  const results = await Promise.allSettled([
    getDashboardStats(),
    getLast10Admissions(),
  ]);

  return {
    stats: results[0].status === "fulfilled" ? results[0].value : {},
    admissions: results[1].status === "fulfilled" ? results[1].value : [],
  };
};