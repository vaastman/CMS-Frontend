import api from "./api";

export const getAdmissionFiles = (admissionId) => {
  return api.get(`/admissions/${admissionId}/files`);
};

export const verifyFile = (fileId) => {
  return api.patch(`/files/${fileId}/verify`);
};

/* ================= GET STUDENT DOCUMENTS ================= */
export const getStudentDocuments = (studentId) => {
  if (!studentId) {
    throw new Error("studentId is required");
  }

  return api.get(`/files/students/${studentId}/documents`);
};


/* ================= VERIFY DOCUMENT ================= */
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

export const uploadStudentDocument = (formData) => {
  return api.post("/files", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
