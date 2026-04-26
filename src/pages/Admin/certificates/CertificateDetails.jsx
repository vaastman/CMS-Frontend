import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getCertificateById,
  approveCertificate,
  rejectCertificate,
  updateCertificate,
  downloadCertificate,
} from "@/api/certificate.api";
import { toast } from "react-toastify";
import CertificateEditModal from "./CertificateEditModal";

const CertificateDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [certificate, setCertificate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const fetchCertificate = async () => {
    try {
      setLoading(true);
      const response = await getCertificateById(id);
      setCertificate(response.data.certificate);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load certificate details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCertificate();
  }, [id]);

  const handleApprove = async () => {
    if (!window.confirm("Approve and issue this certificate?")) return;

    try {
      setProcessing(true);
      await approveCertificate(id);
      toast.success("Certificate approved and issued successfully");
      fetchCertificate();
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Approval failed");
    } finally {
      setProcessing(false);
    }
  };

  const handleReject = async () => {
    const remarks = prompt("Enter rejection remarks:");
    if (!remarks) return;

    try {
      setProcessing(true);
      await rejectCertificate(id, remarks);
      toast.success("Certificate application rejected");
      fetchCertificate();
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Rejection failed");
    } finally {
      setProcessing(false);
    }
  };

  const handleDownload = async () => {
    try {
      const blob = await downloadCertificate(id);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${certificate.certificateNo || "certificate"}.pdf`;
      link.click();
      window.URL.revokeObjectURL(url);
      toast.success("Certificate downloaded successfully");
    } catch (error) {
      console.error(error);
      toast.error("Download failed");
    }
  };

  const handleEditSave = async (editedData) => {
    try {
      await updateCertificate(id, editedData);
      toast.success("Certificate application updated");
      fetchCertificate();
      setShowEditModal(false);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Update failed");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading certificate details...</p>
        </div>
      </div>
    );
  }

  if (!certificate) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600 text-xl">Certificate not found</p>
      </div>
    );
  }

  const certificateNoValue =
    certificate.certificateNo ||
    (certificate.status === "PENDING"
      ? "Will be generated after approval"
      : certificate.status === "REJECTED"
      ? "Not generated"
      : "-");

  const issuedDateValue = certificate.issuedAt
    ? new Date(certificate.issuedAt).toLocaleString("en-IN")
    : certificate.status === "PENDING"
    ? "Will be set when approved"
    : certificate.status === "REJECTED"
    ? "Not issued"
    : "-";

  const remarksValue =
    certificate.remarks ||
    (certificate.status === "REJECTED"
      ? "No rejection remarks added"
      : "No remarks");

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Certificate Application Details</h1>
          <p className="text-gray-600 mt-1">ID: {certificate.id}</p>
        </div>
        <button
          onClick={() => navigate("/admin/certificates")}
          className="px-4 py-2 border rounded-lg hover:bg-gray-50"
        >
          ← Back to List
        </button>
      </div>

      {/* Status Badge */}
      <div className="bg-white rounded-xl shadow p-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Application Status</h2>
          <span
            className={`px-4 py-2 rounded-full text-sm font-semibold ${
              certificate.status === "ISSUED"
                ? "bg-green-100 text-green-800"
                : certificate.status === "PENDING"
                ? "bg-yellow-100 text-yellow-800"
                : certificate.status === "REJECTED"
                ? "bg-red-100 text-red-800"
                : "bg-blue-100 text-blue-800"
            }`}
          >
            {certificate.status}
          </span>
        </div>
      </div>

      {/* Student Information */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4 border-b pb-2">Student Information</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <DetailItem label="Name" value={certificate.name} />
          <DetailItem label="Father's Name" value={certificate.fatherName} />
          <DetailItem label="Mother's Name" value={certificate.motherName} />
          <DetailItem
            label="Date of Birth"
            value={certificate.dob ? new Date(certificate.dob).toLocaleDateString("en-IN") : "-"}
          />
        </div>
      </div>

      {/* Academic Information */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4 border-b pb-2">Academic Information</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <DetailItem label="University Roll" value={certificate.universityRoll} />
          <DetailItem label="Registration No" value={certificate.registrationNo} />
          <DetailItem label="College Roll" value={certificate.collegeRoll} />
          <DetailItem label="Course" value={certificate.courseName} />
          <DetailItem label="Department" value={certificate.departmentName} />
          <DetailItem label="Semester" value={certificate.semester} />
          <DetailItem label="Session" value={certificate.session} />
        </div>
      </div>

      {/* Certificate Information */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4 border-b pb-2">Certificate Information</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <DetailItem label="Certificate Type" value={certificate.type} />
          <DetailItem label="Certificate No" value={certificateNoValue} />
          <DetailItem
            label="Applied Date"
            value={new Date(certificate.appliedAt).toLocaleString("en-IN")}
          />
          <DetailItem label="Issued Date" value={issuedDateValue} />
          <DetailItem label="Purpose" value={certificate.purpose} />
          <DetailItem label="Remarks" value={remarksValue} />
        </div>
      </div>

      {/* Payment Information */}
      {certificate.payment && (
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4 border-b pb-2">Payment Information</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <DetailItem label="Payment Status" value={certificate.payment.status} />
            <DetailItem
              label="Amount"
              value={`₹${Number(certificate.payment.totalAmount).toFixed(2)}`}
            />
            <DetailItem label="Transaction ID" value={certificate.payment.txnId} />
            <DetailItem label="Receipt No" value={certificate.payment.receiptNo} />
            <DetailItem
              label="Payment Date"
              value={new Date(certificate.payment.createdAt).toLocaleString("en-IN")}
            />
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Actions</h2>
        <div className="flex gap-4">
          <button
            onClick={() => setShowEditModal(true)}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
          >
            ✏️ Edit Application
          </button>

          {certificate.status === "PENDING" && certificate.payment?.status === "SUCCESS" && (
            <>
              <button
                onClick={handleApprove}
                disabled={processing}
                className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white py-3 rounded-lg font-semibold transition"
              >
                ✅ Approve & Issue
              </button>
              <button
                onClick={handleReject}
                disabled={processing}
                className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white py-3 rounded-lg font-semibold transition"
              >
                ❌ Reject
              </button>
            </>
          )}

          {certificate.status === "ISSUED" && certificate.pdfUrl && (
            <button
              onClick={handleDownload}
              className="flex-1 bg-gray-800 hover:bg-gray-900 text-white py-3 rounded-lg font-semibold transition"
            >
              📥 Download Certificate
            </button>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <CertificateEditModal
          certificate={certificate}
          onSave={handleEditSave}
          onClose={() => setShowEditModal(false)}
        />
      )}
    </div>
  );
};

const DetailItem = ({ label, value }) => (
  <div>
    <p className="text-xs text-gray-500 mb-1">{label}</p>
    <p className="font-medium text-gray-800">{value || "-"}</p>
  </div>
);

export default CertificateDetails;
