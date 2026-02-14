// src/api/dashboard.api.js
import { getAdmissions } from "./admissions.api";
import { fetchStudents } from "./student.api";

/* ================= DASHBOARD DATA ================= */

export const getDashboardData = async () => {
  const [studentsRes, admissionsRes] = await Promise.all([
    fetchStudents(),
    getAdmissions(),
  ]);

  return {
    students:
      studentsRes?.data?.data?.students || [],
    admissions:
      admissionsRes?.data?.data?.admissions || [],
  };
};
