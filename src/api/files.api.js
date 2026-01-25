import api from "./api";

export const getAdmissionFiles = (admissionId) => {
  return api.get(`/admissions/${admissionId}/files`);
};

export const verifyFile = (fileId) => {
  return api.patch(`/files/${fileId}/verify`);
};
