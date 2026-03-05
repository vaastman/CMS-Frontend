import api from "./api";

/* ================= GET PRESIGNED URL ================= */
export const getPresignedUploadUrl = (data) => {
  return api.post("/files/presign-upload", data);
};

/* ================= UPLOAD FILE TO R2 ================= */
export const uploadFileToR2 = async (uploadUrl, file) => {
  return fetch(uploadUrl, {
    method: "PUT",
    headers: {
      "Content-Type": file.type,
    },
    body: file,
  });
};

/* ================= SIMPLE FILE UPLOAD ================= */
export const uploadStudentDocument = (formData) => {
  return api.post("/files", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

/* ================= GET STUDENT DOCUMENTS ================= */
export const getStudentDocuments = (studentId) => {
  return api.get(`/files/students/${studentId}/documents`);
};

/* ================= VERIFY DOCUMENT ================= */
export const verifyDocument = (documentId, verified = true) => {
  return api.patch(`/files/documents/${documentId}/verify`, {
    verified,
  });
};

/* ================= DOWNLOAD DOCUMENT ================= */
export const getDocumentDownloadUrl = (id, fileType = "document") => {
  return api.get(`/files/${id}/${fileType}/download`);
};

/* ================= DELETE FILE ================= */
export const deleteFile = (id, fileType = "document") => {
  return api.delete(`/files/${id}/${fileType}`);
};