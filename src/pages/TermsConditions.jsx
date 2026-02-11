import React from "react";

const TermsConditions = () => {
  return (
    <div className="bg-[var(--color-page)] py-16">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">

        {/* Header */}
        <div className="text-center mb-14">
          <h1 className="text-4xl font-bold text-[var(--color-primary)]">
            Terms & Conditions
          </h1>
          <p className="mt-4 text-gray-600 max-w-3xl mx-auto">
            Welcome to Sant Sandhya Das Mahila College (SSDM). By accessing,
            browsing, enrolling, or using our website and services, you agree
            to abide by the following Terms & Conditions.
          </p>
        </div>

        {/* Content Card */}
        <div className="bg-white shadow-lg rounded-2xl p-8 lg:p-12 space-y-10 text-gray-700 leading-relaxed">

          {/* Section 1 */}
          <section>
            <h2 className="text-2xl font-semibold text-[var(--color-primary)] mb-4">
              1. Acceptance of Terms
            </h2>
            <p>
              By using this platform, you confirm that you have read,
              understood, and agreed to these Terms & Conditions. If you do
              not agree, you must discontinue the use of our services
              immediately.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-2xl font-semibold text-[var(--color-primary)] mb-4">
              2. User Responsibilities
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide accurate and complete personal and academic information.</li>
              <li>Use the website strictly for lawful and educational purposes.</li>
              <li>Maintain confidentiality of login credentials.</li>
              <li>Not copy, reproduce, or redistribute website content without permission.</li>
              <li>Complete required assignments/tasks for certification eligibility.</li>
            </ul>
            <p className="mt-3">
              Any misuse of the platform may result in suspension of access
              or legal action where necessary.
            </p>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-2xl font-semibold text-[var(--color-primary)] mb-4">
              3. Program Enrollment
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Enrollment confirms acceptance of program guidelines and timelines.</li>
              <li>Certificates are issued only after successful completion of program requirements.</li>
              <li>SSDM College reserves the right to modify or discontinue programs if required.</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-2xl font-semibold text-[var(--color-primary)] mb-4">
              4. Payments & Refunds
            </h2>
            <p className="mb-3">
              All payments made towards admissions, internships, training
              programs, or related services are non-refundable by default.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Refunds, if approved, are processed only after review by the Accounts Department.</li>
              <li>Transaction fees are non-refundable under any circumstances.</li>
              <li>Any bank or card charges shall be borne by the cardholder.</li>
              <li>No instant, digital, or automatic refund methods are provided.</li>
            </ul>
            <p className="mt-3">
              Please refer to the Refund Policy page for complete details.
            </p>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-2xl font-semibold text-[var(--color-primary)] mb-4">
              5. Content Ownership
            </h2>
            <p>
              All content on this website including text, graphics, logos,
              documents, videos, and program materials are the intellectual
              property of SSDM College. Unauthorized reproduction,
              distribution, or modification is strictly prohibited.
            </p>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-2xl font-semibold text-[var(--color-primary)] mb-4">
              6. External Links
            </h2>
            <p>
              Our website may contain links to third-party websites.
              SSDM College is not responsible for the content, policies,
              or practices of such external platforms.
            </p>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="text-2xl font-semibold text-[var(--color-primary)] mb-4">
              7. Limitation of Liability
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Technical issues such as server downtime or internet disruptions.</li>
              <li>Loss of data due to user negligence.</li>
              <li>Any misunderstanding between students and partner organizations.</li>
            </ul>
            <p className="mt-3">
              All services are provided on an "as-is" basis.
            </p>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className="text-2xl font-semibold text-[var(--color-primary)] mb-4">
              8. Changes to Terms
            </h2>
            <p>
              SSDM College reserves the right to update or modify these Terms
              & Conditions at any time. Users are encouraged to review this
              page periodically.
            </p>
          </section>

          {/* Contact Section */}
          <section className="border-t pt-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              Contact Information
            </h2>
            <p>
              <strong>Sant Sandhya Das Mahila College</strong><br />
              Gulabbag, Barh, Patna – 803213<br />
              Phone: 7549298333<br />
              Email: principalssdmcbarh@gmail.com
            </p>
          </section>

        </div>
      </div>
    </div>
  );
};

export default TermsConditions;
