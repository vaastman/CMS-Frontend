import api from "./api";

/**
 * Get DCR1 Report
 */
export const getDcr1Report = async () => {
  const res = await api.get("/payments/dcr1-report");
  return res.data; // already contains { status, message, data }
};

/**
 * Get DCR1 Report by Date Range
 */
export const getDcr1ReportByDate = async (startDate, endDate) => {
  const res = await api.get(
    `/payments/dcr1-report/date-range?startDate=${startDate}&endDate=${endDate}`
  );
  return res.data;
};

/**
 * Export DCR1 CSV
 */
export const exportDcr1CSV = (startDate, endDate) => {
  window.open(
    `/api/v1/payments/dcr1-report/date-range?startDate=${startDate}&endDate=${endDate}&format=csv`
  );
};
export const getTodayCollection = async () => {
  const res = await api.get("/payments/dcr1-report/today");
  return res.data;
};

export const getMonthCollection = async () => {
  const res = await api.get("/payments/dcr1-report/month");
  return res.data;
};

export const getDCR1Report = async () => {
  const res = await api.get("/payments/dcr1-report");
  return res.data;
};