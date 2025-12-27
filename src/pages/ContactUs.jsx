import React from "react";
import { FaMapMarkedAlt, FaPhoneAlt, FaClock } from "react-icons/fa";

const ContactUs = () => {
  return (
    <div className="w-full bg-[color:var(--color-page)]">

      {/* ================= CONTACT INFO ================= */}
      <section className="text-center py-20">
        <h2 className="text-4xl md:text-5xl font-semibold text-[color:var(--color-text-primary)]">
          Contact Information
        </h2>
        <p className="mt-3 text-[color:var(--color-text-secondary)]">
          We’re here to help and answer any question you might have
        </p>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 px-6 sm:px-20 mt-14">

          {/* Address */}
          <div className="bg-[color:var(--color-surface)] flex flex-col items-center gap-4 p-10 rounded-2xl shadow-md hover:shadow-xl transition">
            <FaMapMarkedAlt className="text-5xl text-[color:var(--color-primary)]" />
            <p className="text-center text-lg leading-6 text-[color:var(--color-text-primary)]">
              MIG Rd, Chiraiyatand,<br />
              Khasmahal, Mithapur, Patna,<br />
              Bihar 800001
            </p>
          </div>

          {/* Phone */}
          <div className="bg-[color:var(--color-surface)] flex flex-col items-center gap-4 p-10 rounded-2xl shadow-md hover:shadow-xl transition">
            <FaPhoneAlt className="text-5xl text-[color:var(--color-primary)]" />
            <p className="text-lg font-medium text-[color:var(--color-text-primary)]">
              0612-2353295
            </p>
          </div>

          {/* Working Hours */}
          <div className="bg-[color:var(--color-surface)] flex flex-col items-center gap-4 p-10 rounded-2xl shadow-md hover:shadow-xl transition">
            <FaClock className="text-5xl text-[color:var(--color-primary)]" />
            <p className="text-lg text-[color:var(--color-text-primary)]">
              Mon – Sat : 9 AM – 5 PM
            </p>
          </div>
        </div>
      </section>

      {/* ================= CONTACT FORM ================= */}
      <section className="py-20 bg-[color:var(--color-surface)]">
        <h2 className="text-4xl md:text-5xl text-center font-semibold text-[color:var(--color-text-primary)]">
          Get in Touch
        </h2>

        <form className="max-w-3xl mx-auto px-6 mt-14 flex flex-col gap-8">

          {/* Name */}
          <div>
            <label className="block text-lg mb-2 text-[color:var(--color-text-primary)]">
              Full Name *
            </label>
            <input
              type="text"
              placeholder="Your name"
              className="
                w-full p-4 rounded-lg border
                border-[color:var(--color-divider)]
                focus:outline-none
                focus:border-[color:var(--color-primary)]
              "
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-lg mb-2 text-[color:var(--color-text-primary)]">
              Email Address *
            </label>
            <input
              type="email"
              placeholder="Your email"
              className="
                w-full p-4 rounded-lg border
                border-[color:var(--color-divider)]
                focus:outline-none
                focus:border-[color:var(--color-primary)]
              "
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-lg mb-2 text-[color:var(--color-text-primary)]">
              How can we help? *
            </label>
            <textarea
              rows="7"
              placeholder="Your message"
              className="
                w-full p-4 rounded-lg border
                border-[color:var(--color-divider)]
                focus:outline-none
                focus:border-[color:var(--color-primary)]
              "
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="
              w-44 mx-auto py-3 text-lg font-medium rounded-lg
              bg-[color:var(--color-primary)] text-white
              hover:opacity-90 transition
            "
          >
            Submit
          </button>
        </form>
      </section>

      {/* ================= GOOGLE MAP ================= */}
      <section className="py-20">
        <iframe
          title="College Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3593.432178714587!2d85.71612019999999!3d25.479286599999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f27bb79da118c1%3A0x441797082d015665!2sSant%20Sandhyadas%20College!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
          width="100%"
          height="450"
          style={{ border: 0 }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>
    </div>
  );
};

export default ContactUs;
