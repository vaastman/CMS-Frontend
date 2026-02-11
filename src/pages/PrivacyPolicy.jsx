import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="bg-[var(--color-page)] py-16">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">

        {/* Header */}
        <div className="text-center mb-14">
          <h1 className="text-4xl font-bold text-[var(--color-primary)]">
            Privacy Policy
          </h1>
          <p className="mt-4 text-gray-600 max-w-3xl mx-auto">
            Sant Sandhya Das Mahila College (SSDM) values your privacy and is
            committed to protecting your personal information. This policy
            explains how we collect, use, and safeguard your data.
          </p>
        </div>

        {/* Content Card */}
        <div className="bg-white shadow-lg rounded-2xl p-8 lg:p-12 space-y-10 text-gray-700 leading-relaxed">

          {/* Section 1 */}
          <section>
            <h2 className="text-2xl font-semibold text-[var(--color-primary)] mb-4">
              1. Information We Collect
            </h2>
            <p className="mb-3">
              We may collect the following types of information:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Personal details (name, email address, phone number, residential address).</li>
              <li>Academic information (course, specialization, enrollment details).</li>
              <li>Payment information (processed securely via authorized payment gateways).</li>
              <li>Website usage data (device type, browser, pages visited, session time).</li>
            </ul>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-2xl font-semibold text-[var(--color-primary)] mb-4">
              2. How We Use Your Information
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>To process registrations, admissions, and payments.</li>
              <li>To communicate updates, schedules, and important announcements.</li>
              <li>To verify identity and eligibility for academic programs.</li>
              <li>To improve website functionality and user experience.</li>
              <li>To comply with legal and regulatory requirements.</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-2xl font-semibold text-[var(--color-primary)] mb-4">
              3. Data Protection & Security
            </h2>
            <p>
              SSDM College implements appropriate technical and administrative
              safeguards to protect your information from unauthorized access,
              misuse, alteration, or disclosure.
            </p>
            <p className="mt-3">
              However, no digital platform can guarantee 100% security.
              Users are responsible for safeguarding their login credentials
              and personal access details.
            </p>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-2xl font-semibold text-[var(--color-primary)] mb-4">
              4. Cookies & Tracking Technologies
            </h2>
            <p className="mb-3">
              Our website may use cookies to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Enhance user browsing experience.</li>
              <li>Understand user preferences and behavior.</li>
              <li>Improve service quality and website performance.</li>
            </ul>
            <p className="mt-3">
              You may disable cookies in your browser settings; however,
              certain features of the website may not function properly.
            </p>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-2xl font-semibold text-[var(--color-primary)] mb-4">
              5. User Rights
            </h2>
            <p className="mb-3">
              You have the right to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Request access to your personal data.</li>
              <li>Request correction of inaccurate information.</li>
              <li>Request deletion of your data (subject to policy limitations).</li>
            </ul>
            <p className="mt-3">
              Requests may be submitted through the official college email.
            </p>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-2xl font-semibold text-[var(--color-primary)] mb-4">
              6. Data Retention
            </h2>
            <p>
              Your information is retained only as long as necessary for
              educational purposes, certification tracking, legal compliance,
              and service improvement.
            </p>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="text-2xl font-semibold text-[var(--color-primary)] mb-4">
              7. Children’s Privacy
            </h2>
            <p>
              Our services are generally intended for students above 18 years
              of age. We do not knowingly collect personal data from children
              below this age without verified guardian consent.
            </p>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className="text-2xl font-semibold text-[var(--color-primary)] mb-4">
              8. Policy Updates
            </h2>
            <p>
              SSDM College reserves the right to update or revise this Privacy
              Policy periodically. Updated versions will be published on this page.
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

export default PrivacyPolicy;
