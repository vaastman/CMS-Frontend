import React from "react";

const TermsConditions = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-6 text-[var(--color-primary)]">
        Terms & Conditions – SSDM College
      </h1>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        1. Acceptance of Terms
      </h2>
      <p>
        By using this website, you agree to comply with all terms stated here.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        2. User Responsibilities
      </h2>
      <ul className="list-disc pl-6 space-y-2">
        <li>Provide accurate information</li>
        <li>Use platform for lawful purposes</li>
        <li>Maintain login confidentiality</li>
        <li>Complete assignments for certification</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        3. Payments & Refunds
      </h2>
      <p>
        All payments are non-refundable by default. Transaction fees are not refundable.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        4. Content Ownership
      </h2>
      <p>
        All materials are intellectual property of SSDM College.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        5. Limitation of Liability
      </h2>
      <p>
        SSDM College is not liable for technical issues or third-party disruptions.
      </p>
    </div>
  );
};

export default TermsConditions;
