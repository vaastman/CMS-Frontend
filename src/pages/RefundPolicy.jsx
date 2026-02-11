import React from "react";

const RefundPolicy = () => {
  return (
    <div className="bg-[var(--color-page)] py-16">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">

        {/* Header Section */}
        <div className="text-center mb-14">
          <h1 className="text-4xl font-bold text-[var(--color-primary)]">
            Refund Policy
          </h1>
          <p className="mt-4 text-gray-600 max-w-3xl mx-auto">
            Sant Sandhya Das Mahila College (SSDM) is committed to maintaining
            transparency and fairness in all financial transactions.
            Please read this policy carefully before making any payment.
          </p>
        </div>

        {/* Card Container */}
        <div className="bg-white shadow-lg rounded-2xl p-8 lg:p-12 space-y-10 text-gray-700 leading-relaxed">

          {/* Section 1 */}
          <section>
            <h2 className="text-2xl font-semibold text-[var(--color-primary)] mb-4">
              1. General Refund Policy
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                All payments made towards admissions, bonafide, CLC, internships,
                training programs, workshops, or related services are
                <span className="font-semibold"> non-refundable by default.</span>
              </li>
              <li>
                Refund requests, if applicable, are subject to review by the
                Accounts Department and concerned banking authority.
              </li>
              <li>
                No automatic, instant, or system-generated refunds will be issued
                under any circumstances.
              </li>
              <li>
                A refund request must be valid, justified, and supported with
                appropriate documentation.
              </li>
            </ul>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-2xl font-semibold text-[var(--color-primary)] mb-4">
              2. Eligibility for Refund Consideration
            </h2>
            <p className="mb-3">
              Refunds may be considered only under the following exceptional
              circumstances:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Duplicate payment made for the same program.</li>
              <li>Technical failure due to bank server or payment gateway error.</li>
              <li>Eligibility mismatch due to verified administrative oversight.</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-2xl font-semibold text-[var(--color-primary)] mb-4">
              3. Refund Request Procedure
            </h2>
            <ol className="list-decimal pl-6 space-y-2">
              <li>
                Submit a written request through the official college email
                or by submitting an application at the Office of the Principal.
              </li>
              <li>
                Clearly mention your full name, registered email address,
                mobile number, and transaction ID.
              </li>
              <li>
                Provide your bank account number, IFSC code, and detailed
                reason for the refund request.
              </li>
              <li>
                The request will be reviewed and forwarded to the Accounts
                Department for verification and approval.
              </li>
            </ol>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-2xl font-semibold text-[var(--color-primary)] mb-4">
              4. Mode of Refund
            </h2>
            <p>
              If approved, refunds will be processed strictly through offline
              methods or direct bank transfer. No digital, instant, or automated
              refund methods will be used. Refunds may be issued via bank transfer,
              cheque, or other offline mode as determined appropriate by the
              Accounts Department.
            </p>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-2xl font-semibold text-[var(--color-primary)] mb-4">
              5. Non-Transferable Payments
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Payments made for any program cannot be transferred to another
                student, course, or batch.
              </li>
              <li>
                Fees cannot be adjusted against any other program or purpose.
              </li>
            </ul>
          </section>

          {/* Final Note */}
          <section className="border-t pt-6">
            <p className="font-semibold text-gray-900">
              Final Note
            </p>
            <p className="mt-2">
              By proceeding with any payment on the SSDM College website,
              you acknowledge that you have read, understood, and agreed to
              the terms outlined in this Refund Policy.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
};

export default RefundPolicy;
