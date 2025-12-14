import React, { useState } from 'react'
import { assets } from '../assets/assest'
import { FaFacebook, FaInstagramSquare, FaLinkedin, FaTwitter } from 'react-icons/fa'

const Header = () => {
  const [open, setOpen] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()

    const formData = new FormData(e.target)
    const data = Object.fromEntries(formData.entries())

    // Basic validation
    if (!data.course || !data.name || !data.mobile || !data.email) {
      alert('Please fill all fields')
      return
    }

    console.log('Admission Enquiry:', data)

    alert('Enquiry submitted successfully!')
    setOpen(false)
    e.target.reset()
  }

  return (
    <>
      {/* ================= HEADER ================= */}
      <header className="w-full bg-white shadow-md py-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4">

            {/* LEFT */}
            <div className="flex items-center gap-4">
              <img src={assets.nm_logo} alt="College Logo" className="w-20 h-20 object-contain" />
              <div>
                <h2 className="text-sm md:text-xl font-bold">
                  संत संध्या दास महिला कॉलेज, बाढ़ (पटना)
                </h2>
                <h2 className="text-base md:text-xl font-bold">
                  Sant Sandhya Das Mahavidyalaya, Barh, Patna
                </h2>
                <p className="hidden md:block text-sm text-gray-600">
                  Affiliated to Patliputra University, Patna
                </p>
              </div>
            </div>

            {/* RIGHT */}
            <div className="flex flex-col items-center md:items-end gap-3">
              <nav className="hidden md:flex items-center gap-4 text-sm font-medium">
                <a className="hover:text-blue-600 cursor-pointer">Admission Portal</a>
                <a className="hover:text-blue-600 cursor-pointer">Gallery</a>
                <a className="hover:text-blue-600 cursor-pointer">Feedback</a>
                <a className="hover:text-blue-600 cursor-pointer">Location</a>

                <FaFacebook className="text-blue-700 cursor-pointer" />
                <FaTwitter className="text-blue-700 cursor-pointer" />
                <FaInstagramSquare className="text-blue-700 cursor-pointer" />
                <FaLinkedin className="text-blue-700 cursor-pointer" />
              </nav>

              <div className="flex items-center gap-4 text-sm">
                <div>
                  <p className="font-semibold">Tel: +91-7549298333</p>
                  <p className="font-semibold">Email: ssdmcollege78@gmail.com</p>
                </div>

                <button
                  onClick={() => setOpen(true)}
                  className="px-4 py-2 bg-red-700 text-white rounded-md hover:bg-red-800"
                >
                  Online Admission
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ================= MODAL ================= */}
      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6 relative">

            <button
              onClick={() => setOpen(false)}
              className="absolute top-2 right-3 text-xl font-bold"
            >
              ×
            </button>

            <h2 className="text-xl font-bold text-center mb-4">
              Online Admission Enquiry
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">

              <select name="course" className="w-full border rounded-md px-3 py-2" required>
                <option value="">Select Course</option>
                <option>B.A</option>
                <option>B.Sc</option>
                <option>B.Com</option>
                <option>M.A</option>
              </select>

              <input
                name="name"
                type="text"
                placeholder="Student Name"
                className="w-full border rounded-md px-3 py-2"
                required
              />

              <input
                name="mobile"
                type="tel"
                placeholder="Mobile Number"
                className="w-full border rounded-md px-3 py-2"
                required
              />

              <input
                name="email"
                type="email"
                placeholder="Email Address"
                className="w-full border rounded-md px-3 py-2"
                required
              />

              <button
                type="submit"
                className="w-full bg-red-700 text-white py-2 rounded-md hover:bg-red-800"
              >
                Submit Enquiry
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default Header
