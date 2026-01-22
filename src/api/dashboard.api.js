import api from "./api";

export const getAdminDashboard = () => {
  return api.get("/dashboard/admin");
};

export const getRecentAdmissions = (params = {}) => {
  return api.get("/admissions", { params });
};
