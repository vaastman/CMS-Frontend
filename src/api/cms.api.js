import api from "./api";

/* ================= GALLERY ================= */

export const getGallery = (params) => {
  return api.get("/gallery", { params });
};

export const createGallery = (data) => {
  return api.post("/gallery", data);
};

export const updateGallery = (id, data) => {
  return api.patch(`/gallery/${id}`, data);
};

export const deleteGallery = (id) => {
  return api.delete(`/gallery/${id}`);
};

/* ================= NEWS ================= */

export const getNews = (params) => {
  return api.get("/news", { params });
};

export const createNews = (data) => {
  return api.post("/news", data);
};

export const updateNews = (id, data) => {
  return api.patch(`/news/${id}`, data);
};

export const deleteNews = (id) => {
  return api.delete(`/news/${id}`);
};

/* ================= NOTICE ================= */

export const getNotices = (params) => {
  return api.get("/notices", { params });
};

export const createNotice = (data) => {
  return api.post("/notices", data);
};

export const updateNotice = (id, data) => {
  return api.patch(`/notices/${id}`, data);
};

export const deleteNotice = (id) => {
  return api.delete(`/notices/${id}`);
};
