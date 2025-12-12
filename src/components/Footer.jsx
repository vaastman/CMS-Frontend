import React from 'react'
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assest';

const Footer = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-[#032f5d] text-white px-6 sm:px-16 lg:px-24 pt-16 pb-8">

      {/* TOP SECTION */}
      <div className="grid grid-cols-1 sm:grid-cols-[1.4fr_1fr_1fr_1fr] gap-14">

        {/* Logo + About */}
        <div className="space-y-6">
          <img 
            src={assets.nm_logo} 
            alt="Logo" 
            className="w-24 h-24 mx-auto sm:mx-0"
          />

          <p className="text-2xl font-semibold underline underline-offset-4">
            ABOUT US
          </p>

          <p className="text-base leading-6 opacity-90">
            Sant Sandhya Das Mahila College, Barh (Patna) received affiliation up to
            graduate level from Patliputra University, Patna and Government of Bihar.
            The institute stands near the holy banks of river Ganga, the meeting point 
            of Mithila and Magadh, inspired by Saint Sandhya Das.
          </p>
        </div>

        {/* Quick Links */}
        <div className="">
          <p className="text-2xl font-semibold underline underline-offset-4 mb-5">
            QUICK LINKS
          </p>

          <ul className="flex flex-col text-base gap-3">
            <li 
              className="cursor-pointer hover:text-blue-300 transition"
              onClick={() => { navigate("/"); scrollTo(0,0); }}
            >
              Home
            </li>
            <li 
              className="cursor-pointer hover:text-blue-300 transition"
              onClick={() => { navigate("/about"); scrollTo(0,0); }}
            >
              About Us
            </li>
            <li 
              className="cursor-pointer hover:text-blue-300 transition"
              onClick={() => { navigate("/students"); scrollTo(0,0); }}
            >
              Students
            </li>
            <li 
              className="cursor-pointer hover:text-blue-300 transition"
              onClick={() => { navigate("/campus-life"); scrollTo(0,0); }}
            >
              Campus Life
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <p className="text-2xl font-semibold underline underline-offset-4 mb-5">
            CONTACT US
          </p>

          <p className="text-base opacity-90 leading-6">
            Sant Sandhya Das Mahavidyalaya, Barh,  
            <br />
            Bihar, Patna – 803213
          </p>

          <p className="mt-4 opacity-80">
            Email: info@santsandhyadascollege.in  
            <br />
            Phone: +91 9876543210
          </p>
        </div>

        {/* Location Map */}
        <div>
          <p className="text-2xl font-semibold underline underline-offset-4 mb-5">
            LOCATION
          </p>

          <div className="rounded-lg overflow-hidden shadow-lg">
            <iframe
              title="College Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3593.432178714587!2d85.71612019999999!3d25.479286599999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f27bb79da118c1%3A0x441797082d015665!2sSant%20Sandhyadas%20College!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="250"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="mt-14">
        <hr className="border-gray-500" />
        <p className="text-center text-sm py-3 opacity-80">
          © 2025  — All Rights Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
