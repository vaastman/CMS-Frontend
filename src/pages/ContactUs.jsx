import React from "react";
import { FaMapMarkedAlt, FaPhoneAlt, FaClock } from "react-icons/fa";

const ContactUs = () => {
  return (
    <div className="w-full">

      {/* ---------- Contact Information ---------- */}
      <div className="text-center py-14">
        <h2 className="text-4xl font-serif font-semibold text-[#0c1230]">
          Contact Information
        </h2>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 px-6 sm:px-20 mt-12">

          {/* Address */}
          <div className="bg-[#f4f4f4] flex flex-col items-center gap-4 p-10 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300">
            <FaMapMarkedAlt className="text-5xl text-[#911c31]" />
            <p className="text-center text-lg leading-6 text-[#0c1230]">
              MIG Rd, Chiraiyatand,<br />
              Khasmahal, Mithapur, Patna,<br />
              Bihar 800001
            </p>
          </div>

          {/* Phone */}
          <div className="bg-[#f4f4f4] flex flex-col items-center gap-4 p-10 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300">
            <FaPhoneAlt className="text-5xl text-[#911c31]" />
            <p className="text-lg font-medium text-[#0c1230]">
              0612-2353295
            </p>
          </div>

          {/* Working Hours */}
          <div className="bg-[#f4f4f4] flex flex-col items-center gap-4 p-10 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300">
            <FaClock className="text-5xl text-[#911c31]" />
            <p className="text-lg text-[#0c1230]">
              Mon–Sat: 9 AM – 5 PM
            </p>
          </div>
        </div>
      </div>

      {/* ---------- Get in Touch Form ---------- */}
      <div className="py-14 bg-white">
        <h2 className="text-4xl text-center font-serif font-semibold text-[#0c1230]">
          Get in Touch
        </h2>

        <form
          className="max-w-3xl mx-auto px-6 mt-12 flex flex-col gap-8"
        >
          {/* Name */}
          <div>
            <label className="block text-lg mb-2">Full name *</label>
            <input
              type="text"
              placeholder="Your name"
              className="w-full border border-gray-400 p-4 rounded-md focus:outline-none focus:border-[#911c31]"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-lg mb-2">Email address *</label>
            <input
              type="email"
              placeholder="Your email"
              className="w-full border border-gray-400 p-4 rounded-md focus:outline-none focus:border-[#911c31]"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-lg mb-2">How can we Help? *</label>
            <textarea
              rows="7"
              placeholder="Your Message"
              className="w-full border border-gray-400 p-4 rounded-md focus:outline-none focus:border-[#911c31]"
            ></textarea>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-40 mx-auto bg-[#911c31] text-white py-3 text-lg rounded-md hover:bg-[#6b1123] transition-all duration-300"
          >
            Submit
          </button>
        </form>
      </div>

      {/* ---------- Google Map ---------- */}
      <div className="py-14">
        <iframe
          title="College Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3593.432178714587!2d85.71612019999999!3d25.479286599999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f27bb79da118c1%3A0x441797082d015665!2sSant%20Sandhyadas%20College!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
          width="100%"
          height="450"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen=""
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};

export default ContactUs;
