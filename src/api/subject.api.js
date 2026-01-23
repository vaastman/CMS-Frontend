import api from "./api";

/* ================= STUDENT SUBJECT ================= */

// GET with filters
export const getStudentSubjects = (params = {}) => {
  return api.get("/student-subjects", { params });
};

// CREATE (assign subject)
export const createStudentSubject = (data) => {
  if (!data?.studentId || !data?.subjectId || !data?.semesterId) {
    throw new Error("studentId, subjectId and semesterId are required");
  }

  return api.post("/student-subjects", data);
};

// DELETE assignment
export const deleteStudentSubject = (id) => {
  if (!id) throw new Error("ID is required");
  return api.delete(`/student-subjects/${id}`);
};
