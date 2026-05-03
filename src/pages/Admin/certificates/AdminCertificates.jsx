import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getCertificates,
  approveCertificate,
  rejectCertificate,
  downloadCertificate,
} from "@/api/certificate.api";
import { toast } from "react-toastify";

const statusStyles = {
  PENDING: "bg-yellow-100 text-yellow-800",
  APPROVED: "bg-blue-100 text-blue-800",
  REJECTED: "bg-red-100 text-red-800",
  ISSUED: "bg-green-100 text-green-800",
};

const AdminCertificates = () => {
  const navigate = useNavigate();
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    issued: 0,
    rejected: 0,
  });

  // Filters
  const [filterStatus, setFilterStatus] = useState("ALL");
  const [filterType, setFilterType] = useState("ALL");
  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState({ from: "", to: "" });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 20;

  const fetchCertificates = async () => {
    try {
      setLoading(true);

      const params = {
        page,
        limit,
        status: filterStatus !== "ALL" ? filterStatus : undefined,
        type: filterType !== "ALL" ? filterType : undefined,
        search: searchTerm || undefined,
        appliedFrom: dateRange.from || undefined,
        appliedTo: dateRange.to || undefined,
        sortBy: "appliedAt",
        sortOrder: "desc",
      };

      const response = await getCertificates(params);
      const fetchedCertificates =
        response?.data?.certificates ||
        response?.certificates ||
        [];

      const apiStats = response?.data?.stats || response?.stats || response?.meta?.stats;
      const fallbackStats = fetchedCertificates.reduce(
        (acc, cert) => {
          acc.total += 1;
          if (cert.status === "PENDING") acc.pending += 1;
          if (cert.status === "APPROVED") acc.approved += 1;
          if (cert.status === "ISSUED") acc.issued += 1;
          if (cert.status === "REJECTED") acc.rejected += 1;
          return acc;
        },
        { total: 0, pending: 0, approved: 0, issued: 0, rejected: 0 }
      );

      setCertificates(fetchedCertificates);
      setTotalPages(response?.totalPages || response?.meta?.totalPages || 1);
      setStats({
        total: apiStats?.total ?? response?.total ?? fallbackStats.total,
        pending: apiStats?.pending ?? fallbackStats.pending,
        issued: apiStats?.issued ?? fallbackStats.issued,
        rejected: apiStats?.rejected ?? fallbackStats.rejected,
      });
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to load certificates");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCertificates();
  }, [page, filterStatus, filterType]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchCertificates();
  };

  const handleApprove = async (id) => {
    if (!window.confirm("Are you sure you want to approve and issue this certificate?")) {
      return;
    }

    try {
      await approveCertificate(id);
      toast.success("Certificate approved and issued successfully");
      fetchCertificates();
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Approval failed");
    }
  };

  const handleReject = async (id) => {
    const remarks = prompt("Enter rejection remarks:");
    if (!remarks) return;

    try {
      await rejectCertificate(id, remarks);
      toast.success("Certificate application rejected");
      fetchCertificates();
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Rejection failed");
    }
  };

  const handleDownload = async (id) => {
    try {
      const blob = await downloadCertificate(id);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `certificate_${id}.pdf`;
      link.click();
      window.URL.revokeObjectURL(url);
      toast.success("Certificate downloaded successfully");
    } catch (error) {
      console.error(error);
      toast.error("Download failed");
    }
  };

  const handleViewDetails = (id) => {
    navigate(`/admin/certificates/${id}`);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Certificate Applications</h1>
        <p className="text-gray-600 mt-1">Manage and process certificate requests</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard label="Total Applications" value={stats.total} color="blue" />
        <StatCard label="Pending" value={stats.pending} color="yellow" />
        <StatCard label="Issued" value={stats.issued} color="green" />
        <StatCard label="Rejected" value={stats.rejected} color="red" />
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow p-4 space-y-4">
        <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <input
            type="text"
            placeholder="Search by name, roll no..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          />
          
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="ALL">All Status</option>
            <option value="PENDING">Pending</option>
            <option value="APPROVED">Approved</option>
            <option value="REJECTED">Rejected</option>
            <option value="ISSUED">Issued</option>
          </select>

          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="ALL">All Types</option>
            <option value="BONAFIDE">Bonafide</option>
            <option value="CLC">CLC</option>
            <option value="CHARACTER">Character</option>
          </select>

          <input
            type="date"
            value={dateRange.from}
            onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
            className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 font-semibold transition"
          >
            Apply Filters
          </button>
        </form>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading certificates...</p>
          </div>
        ) : certificates.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            No certificate applications found
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Type</th>
                <th className="p-4 text-left">University Roll</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left">Payment</th>
                <th className="p-4 text-left">Applied Date</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {certificates.map((cert) => (
                <tr key={cert.id} className="border-b hover:bg-gray-50">
                  <td className="p-4 font-medium">{cert.name}</td>
                  <td className="p-4">{cert.type}</td>
                  <td className="p-4">{cert.universityRoll || "-"}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusStyles[cert.status]}`}>
                      {cert.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      cert.payment?.status === "SUCCESS"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}>
                      {cert.payment?.status || "N/A"}
                    </span>
                  </td>
                  <td className="p-4">
                    {new Date(cert.appliedAt).toLocaleDateString("en-IN")}
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2 justify-center">
                      <button
                        onClick={() => handleViewDetails(cert.id)}
                        className="px-3 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700"
                      >
                        View
                      </button>
                      {cert.status === "PENDING" && cert.payment?.status === "SUCCESS" && (
                        <>
                          <button
                            onClick={() => handleApprove(cert.id)}
                            className="px-3 py-1 bg-green-600 text-white rounded text-xs hover:bg-green-700"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleReject(cert.id)}
                            className="px-3 py-1 bg-red-600 text-white rounded text-xs hover:bg-red-700"
                          >
                            Reject
                          </button>
                        </>
                      )}
                      {cert.status === "ISSUED" && cert.pdfUrl && (
                        <button
                          onClick={() => handleDownload(cert.id)}
                          className="px-3 py-1 bg-gray-800 text-white rounded text-xs hover:bg-gray-900"
                        >
                          Download
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 p-4">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-4 py-2 border rounded-lg disabled:opacity-50 hover:bg-gray-50"
            >
              Previous
            </button>
            <span className="px-4 py-2">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-4 py-2 border rounded-lg disabled:opacity-50 hover:bg-gray-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const StatCard = ({ label, value, color }) => {
  const colorClasses = {
    blue: "bg-blue-50 border-blue-200 text-blue-700",
    yellow: "bg-yellow-50 border-yellow-200 text-yellow-700",
    green: "bg-green-50 border-green-200 text-green-700",
    red: "bg-red-50 border-red-200 text-red-700",
  };

  return (
    <div className={`rounded-xl border p-4 ${colorClasses[color]}`}>
      <p className="text-sm opacity-75">{label}</p>
      <p className="text-3xl font-bold mt-1">{value}</p>
    </div>
  );
};

export default AdminCertificates;
