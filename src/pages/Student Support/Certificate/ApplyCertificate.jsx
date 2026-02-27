import CertificateForm from "./CertificateForm";

const ApplyCertificate = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Application for College Leaving / Transfer / Character Certificate
        </h1>

        <CertificateForm />
      </div>
    </div>
  );
};

export default ApplyCertificate;