import api from "./api";

/* ================= GALLERY ================= */

export const getGallery = async (params) => {
  const { data } = await api.get("/cms/gallery", { params });
  return data;
};

export const createGallery = async (payload) => {
  const { data } = await api.post("/cms/gallery", payload);
  return data;
};

export const updateGallery = async (id, payload) => {
  const { data } = await api.patch(`/cms/gallery/${id}`, payload);
  return data;
};

export const deleteGallery = async (id) => {
  const { data } = await api.delete(`/cms/gallery/${id}`);
  return data;
};

/* ================= FILE UPLOAD ================= */

export const generatePresignedUrl = async (payload) => {
  const { data } = await api.post("/files/presign-upload", payload);
  return data; 
  // returns:
  // {
  //   status: "success",
  //   data: { uploadUrl, fileUrl }
  // }
};

/* ================= NEWS ================= */

export const getNews = async (params) => {
  const { data } = await api.get("/cms/news", { params });
  return data;
};

export const createNews = async (payload) => {
  const { data } = await api.post("/cms/news", payload);
  return data;
};

export const updateNews = async (id, payload) => {
  const { data } = await api.patch(`/cms/news/${id}`, payload);
  return data;
};

export const deleteNews = async (id) => {
  const { data } = await api.delete(`/cms/news/${id}`);
  return data;
};

/* ================= NOTICE ================= */

export const getNotices = async (params) => {
  const { data } = await api.get("/cms/notices", { params });
  return data;
};

export const createNotice = async (payload) => {
  const { data } = await api.post("/cms/notices", payload);
  return data;
};

export const updateNotice = async (id, payload) => {
  const { data } = await api.patch(`/cms/notices/${id}`, payload);
  return data;
};

export const deleteNotice = async (id) => {
  const { data } = await api.delete(`/cms/notices/${id}`);
  return data;
};