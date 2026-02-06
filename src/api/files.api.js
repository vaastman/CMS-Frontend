import api from "./api";

/* ================= UPLOAD FILE (PHOTO / DOCUMENT) ================= */
export const uploadStudentDocument = (formData) => {
  return api.post("/files", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

/* ================= GET STUDENT DOCUMENTS ================= */
export const getStudentDocuments = (studentId) => {
  if (!studentId) {
    throw new Error("studentId is required");
  }
  return api.get(`/files/students/${studentId}/documents`);
};

/* ================= VERIFY DOCUMENT (ADMIN / HOD) ================= */
export const verifyDocument = (documentId, verified = true, notes = "") => {
  return api.patch(`/files/documents/${documentId}/verify`, {
    verified,
    notes,
  });
};

/* ================= DOWNLOAD DOCUMENT ================= */
export const getDocumentDownloadUrl = (id, fileType = "document") => {
  return api.get(`/files/${id}/${fileType}/download`);
};

/* ================= DELETE FILE (ADMIN ONLY) ================= */
export const deleteFile = (id, fileType) => {
  return api.delete(`/files/${id}/${fileType}`);
};
