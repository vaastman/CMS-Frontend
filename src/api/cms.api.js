import api from "./api";

/* ================= GALLERY ================= */

export const getGallery = (params) => {
  return api.get("/cms/gallery", { params });
};

export const createGallery = (data) => {
  return api.post("/cms/gallery", data);
};

export const updateGallery = (id, data) => {
  return api.patch(`/cms/gallery/${id}`, data);
};

export const deleteGallery = (id) => {
  return api.delete(`/cms/gallery/${id}`);
};

/* ================= NEWS ================= */

export const getNews = (params) => {
  return api.get("/cms/news", { params }); // ✅ fixed
};

export const createNews = (data) => {
  return api.post("/cms/news", data); // ✅ fixed
};

export const updateNews = (id, data) => {
  return api.patch(`/cms/news/${id}`, data);
};

export const deleteNews = (id) => {
  return api.delete(`/cms/news/${id}`);
};

/* ================= NOTICE ================= */

// export const getNotices = () => {
//   return api.get("/cms/notices"); // ❌ remove params
// };
export const getNotices = (params) => {
  return api.get("/cms/notices", { params });
};

export const createNotice = (data) => {
  return api.post("/cms/notices", data);
};

export const updateNotice = (id, data) => {
  return api.patch(`/cms/notices/${id}`, data);
};

export const deleteNotice = (id) => {
  return api.delete(`/cms/notices/${id}`);
};
