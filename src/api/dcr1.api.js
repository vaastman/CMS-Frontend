import api from "./api";

/**
 * Get Full DCR1 Report
 */
export const getDcr1Report = async () => {
  const res = await api.get("/payments/dcr1-report");
  return res.data;
};

/**
 * Get DCR1 Report by Date Range
 */
export const getDcr1ReportByDate = async (startDate, endDate) => {
  const res = await api.get("/payments/dcr1-report/date-range", {
    params: { startDate, endDate },
  });

  return res.data;
};

/**
 * Export DCR1 CSV (Authenticated Download)
 */
export const exportDcr1CSV = async (startDate, endDate) => {
  const res = await api.get("/payments/dcr1-report/date-range", {
    params: { startDate, endDate, format: "csv" },
    responseType: "blob",
  });

  const url = window.URL.createObjectURL(new Blob([res.data]));
  const link = document.createElement("a");

  link.href = url;
  link.setAttribute(
    "download",
    `DCR1_${startDate}_to_${endDate}.csv`
  );

  document.body.appendChild(link);
  link.click();
  link.remove();
};

/**
 * Get Today's Collection
 */
export const getTodayCollection = async () => {
  const res = await api.get("/payments/dcr1-report/today");
  return res.data;
};

/**
 * Get Monthly Collection
 */
export const getMonthCollection = async () => {
  const res = await api.get("/payments/dcr1-report/month");
  return res.data;
};