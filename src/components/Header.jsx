import React from 'react'
import { assets } from '../assets/assest'
import { FaFacebook, FaInstagramSquare, FaLinkedin, FaTwitter } from 'react-icons/fa'

const Header = () => {
  return (
    <header className="w-full bg-white shadow-md py-4">
      <div className="max-w-7xl mx-auto ">

        {/* GRID LAYOUT */}
        <div className="grid grid-cols-1 md:grid-cols-2 items-center">

          {/* LEFT — LOGO + COLLEGE NAME */}
          <div className="flex flex-row md:text-left md:items-start text-center ">

            <img
              src={assets.nm_logo}
              alt="College Logo"
              className="w-20 h-20 object-contain ml-10 md:ml-0 mr-4"
            />

            <div>
              <h2 className="text-[13px] md:text-xl font-bold text-gray-900 leading-tight">
                संत संध्या दास महिला कॉलेज, बाढ़ (पटना)
              </h2>
              <h2 className="text-[16px] md:text-xl font-bold text-gray-900">
                Sant Sandhya Das Mahavidyalaya, Barh, Patna
              </h2>
              <p className="hidden md:block text-sm text-gray-600">
                Affiliated to Patliputra University, Patna
              </p>
            </div>
          </div>

          {/* RIGHT — NAV + CONTACT */}
          <div className="flex flex-col items-center md:items-end gap-4">

            <div className="hidden md:block items-center md:items-start ">
                {/* TOP NAV LINKS */}
                <nav className="flex flex-wrap justify-center md:justify-end gap-3 text-sm font-medium text-gray-800">
                  <a href="#" className="hover:text-blue-600 cursor-pointer">Admission Portal</a>
                  <a href="#" className="hover:text-blue-600 cursor-pointer">Gallery</a>
                  <a href="#" className="hover:text-blue-600 cursor-pointer">Feedback</a>
                  <a href="#" className="hover:text-blue-600 cursor-pointer">Location</a>
                  <a href="#" className='hover:text-blue-600 text-blue-800 cursor-pointer'><FaFacebook size={20} /></a>
                  <a href="#" className='hover:text-blue-600 text-blue-800 cursor-pointer'><FaTwitter size={20} /></a>
                  <a href="#" className='hover:text-blue-600 text-blue-800 cursor-pointer'><FaInstagramSquare size={20} /></a>
                  <a href="#" className='hover:text-blue-600 text-blue-800 cursor-pointer'><FaLinkedin size={20} /></a>
                </nav>
              </div>

            {/* CONTACT */}
            <div className="flex flex-row gap-3 items-center md:items-end text-center md:text-right text-sm text-gray-700 leading-tight">
              <div>
                <p className="font-semibold">Tel: +91-7549298333</p>
              <p className="font-semibold">
                Email: <span className="text-gray-800">ssdmcollege78@gmail.com</span>
              </p>
              </div>
              <div>
                <button className="px-3 py-2 bg-red-700 text-white rounded-md hover:bg-red-800 cursor-pointer text-sm font-medium">
                  Online Admission
                </button>
              </div>
            </div>
           

          </div>

        </div>
      </div>
    </header>
  )
}

export default Header
