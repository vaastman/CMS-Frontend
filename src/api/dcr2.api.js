import api from "./api";

/**
 * Get DCR2 Report - Certificate Finance Report
 */
export const getDcr2Report = async () => {
  const res = await api.get("/admin/reports/dcr2");
  return res.data;
};

/**
 * Export DCR2 CSV - Certificate Payment Report
 */
export const exportDcr2CSV = async (startDate, endDate) => {
  const params = {};
  if (startDate) params.startDate = startDate;
  if (endDate) params.endDate = endDate;

  const res = await api.get("/admin/reports/dcr2/export", {
    params,
    responseType: "blob",
  });

  const url = window.URL.createObjectURL(new Blob([res.data]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute(
    "download",
    `DCR2_Certificate_${new Date().toISOString().split("T")[0]}.csv`
  );
  document.body.appendChild(link);
  link.click();
  link.remove();
};
