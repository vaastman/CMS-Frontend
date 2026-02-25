import api from "./api";

export const getPublicAdmissionWindows = () => {
  return api.get("/admissions/windows", {
    params: { enabled: true },
  });
};