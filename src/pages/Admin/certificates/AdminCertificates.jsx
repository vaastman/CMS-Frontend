import { useEffect, useState } from "react";
import {
  getCertificates,
  updateCertificateStatus,
  issueCertificate,
  downloadCertificate,
} from "@/api/certificate.api";
import { toast } from "react-toastify";

const statusStyles = {
  PENDING: "bg-yellow-100 text-yellow-700",
  APPROVED: "bg-blue-100 text-blue-700",
  REJECTED: "bg-red-100 text-red-700",
  ISSUED: "bg-green-100 text-green-700",
};

const AdminCertificates = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCertificates = async () => {
    try {
      setLoading(true);

      const res = await getCertificates();

      console.log("Certificates API Response:", res);

      const list =
        res?.data?.certificateRequests ||
        res?.certificateRequests ||
        [];

      setCertificates(list);

    } catch (error) {
      console.log("API ERROR:", error?.response?.data);

      toast.error(
        error?.response?.data?.message || "Failed to load certificates"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCertificates();
  }, []);

  const handleApprove = async (id) => {
    try {
      await updateCertificateStatus(id, { status: "APPROVED" });
      toast.success("Certificate Approved");
      fetchCertificates();
    } catch {
      toast.error("Approval failed");
    }
  };

  const handleReject = async (id) => {
    try {
      await updateCertificateStatus(id, { status: "REJECTED" });
      toast.success("Certificate Rejected");
      fetchCertificates();
    } catch {
      toast.error("Rejection failed");
    }
  };

  const handleIssue = async (id) => {
    try {
      await issueCertificate(id);
      toast.success("Certificate Issued");
      fetchCertificates();
    } catch {
      toast.error("Issuing failed");
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
    } catch {
      toast.error("Download failed");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">
        Certificate Applications
      </h1>

      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4 text-left">Student</th>
              <th>Reg No</th>
              <th>Certificate</th>
              <th>Department</th>
              <th>Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="text-center py-6">
                  Loading...
                </td>
              </tr>
            ) : certificates.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-6">
                  No certificate applications found
                </td>
              </tr>
            ) : (
              certificates.map((cert) => (
                <tr key={cert.id} className="border-b">

                  <td className="p-4">{cert.student?.name || "-"}</td>

                  <td>{cert.student?.reg_no || "-"}</td>

                  <td>{cert.type || cert.certificateType || "-"}</td>

                  <td>{cert.department?.name || "-"}</td>

                  <td>
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${
                        statusStyles[cert.status] ||
                        "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {cert.status}
                    </span>
                  </td>

                  <td className="text-center space-x-2">

                    {cert.status === "PENDING" && (
                      <>
                        <button
                          onClick={() => handleApprove(cert.id)}
                          className="px-3 py-1 bg-blue-600 text-white rounded text-xs"
                        >
                          Approve
                        </button>

                        <button
                          onClick={() => handleReject(cert.id)}
                          className="px-3 py-1 bg-red-600 text-white rounded text-xs"
                        >
                          Reject
                        </button>
                      </>
                    )}

                    {cert.status === "APPROVED" && (
                      <button
                        onClick={() => handleIssue(cert.id)}
                        className="px-3 py-1 bg-green-600 text-white rounded text-xs"
                      >
                        Issue
                      </button>
                    )}

                    {cert.status === "ISSUED" && (
                      <button
                        onClick={() => handleDownload(cert.id)}
                        className="px-3 py-1 bg-gray-800 text-white rounded text-xs"
                      >
                        Download
                      </button>
                    )}

                  </td>

                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminCertificates;