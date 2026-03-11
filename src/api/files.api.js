import api from "./api";

/* ================= GENERATE PRESIGNED URL ================= */

export const getPresignedUploadUrl = (data) => {
  return api.post("/files/presign-upload", data);
};


/* ================= UPLOAD FILE DIRECTLY TO CLOUDFLARE R2 ================= */

export const uploadFileToR2 = async (uploadUrl, file) => {
  const res = await fetch(uploadUrl, {
    method: "PUT",
    headers: {
      "Content-Type": file.type,
    },
    body: file,
  });

  if (!res.ok) {
    throw new Error("R2 Upload failed");
  }

  return true;
};


/* ================= COMPLETE FILE UPLOAD FLOW ================= */
/*
1 → Get presigned URL
2 → Upload file to R2
3 → Save metadata
*/
// export const uploadFile = async ({
//   file,
//   fileType = "document",
//   studentId,
//   documentType = "OTHER",
// }) => {

//   /* STEP 1 — GET PRESIGNED URL */

//   const presignRes = await getPresignedUploadUrl({
//     fileType,
//     fileName: file.name,
//     mimeType: file.type,
//   });

//   const { uploadUrl, fileUrl } = presignRes.data.data;

//   /* STEP 2 — UPLOAD TO R2 */

//   await uploadFileToR2(uploadUrl, file);

//   /* STEP 3 — SAVE METADATA */

//   await api.post("/files", {
//     fileType,
//     studentId,
//     documentType,
//     fileUrl,
//   });

//   return fileUrl;
// };
// export const uploadFile = async ({
//   file,
//   fileType = "photo",
//   studentId,
//   documentType
// }) => {

//   const formData = new FormData();

//   formData.append("file", file);
//   formData.append("fileType", fileType);
//   formData.append("studentId", studentId);

//   // Only send documentType when needed
//   if (fileType === "document" && documentType) {
//     formData.append("documentType", documentType);
//   }

//   const res = await api.post("/files", formData);

//   return res.data;
// };
export const uploadFile = async ({
  file,
  fileType = "document",
  studentId,
  documentType
}) => {

  const formData = new FormData();

  formData.append("file", file);
  formData.append("fileType", fileType);
  formData.append("studentId", studentId);

  if (fileType === "document") {
    formData.append("documentType", documentType);
  }

  const res = await api.post("/files", formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });

  return res.data;
};
/* ================= GET STUDENT DOCUMENTS ================= */

export const getStudentDocuments = (studentId) => {
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


/* ================= DELETE FILE ================= */

export const deleteFile = (id, fileType = "document") => {
  return api.delete(`/files/${id}/${fileType}`);
};