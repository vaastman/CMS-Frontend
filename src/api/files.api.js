import api from "./api";

/**
 * Verify a file (document)
 * Backend: PATCH /files/:id/verify
 */
export const verifyFile = (fileId) => {
  return api.patch(`/files/${fileId}/verify`);
};

/**
 * Download a file
 * Backend: GET /files/:id/download
 */
export const downloadFile = (fileId) => {
  return api.get(`/files/${fileId}/download`, {
    responseType: "blob",
  });
};
