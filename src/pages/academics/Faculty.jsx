import React from 'react'

const Faculty = () => {
  return (
    <>
    <div className="w-full">

            {/* ================= HERO SECTION ================= */}
            <div
                className="relative h-[300px] md:h-[380px] bg-cover bg-center"
                style={{
                    backgroundImage:
                        "url('https://images.unsplash.com/photo-1519682337058-a94d519337bc')",
                }}
            >
                <div className="absolute inset-0 bg-black/40"></div>

                <div className="relative z-10 h-full flex items-center px-10 md:px-24">
                    <h1 className="text-white text-4xl md:text-5xl font-semibold">
                        Faculty
                    </h1>
                </div>
            </div>

            {/* ================= ANNOUNCEMENT BAR ================= */}
            <div className="bg-yellow-600 text-white py-3 px-6 flex items-center gap-4 text-sm md:text-base">
                <span className="font-semibold uppercase">Important Announcements</span>
                <span className="hidden md:inline">||</span>
                <marquee className="flex-1">
                    ▶ Welcome to SSDM College, Barh &nbsp;&nbsp;
                    ▶ Regarding admission form 3rd sem-2025 &nbsp;&nbsp;
                    ▶ Notice Regard
                </marquee>
            </div>

            {/* ================= BREADCRUMB ================= */}
            <div className="px-6 md:px-24 py-6 text-sm text-gray-600">
                Home &gt; <span className="text-black">Academics</span>
            </div>

            {/* ================= MAIN CONTENT ================= */}
            <div className="px-6 md:px-24 pb-16 grid grid-cols-1 md:grid-cols-4 gap-10">

                {/* ===== LEFT SIDEBAR ===== */}
                <aside className="md:col-span-1">
                    <h3 className="text-blue-700 font-semibold mb-4">Sub Menu</h3>
                    <ul className="space-y-2 text-blue-600">
                        <li className="hover:text-yellow-600 cursor-pointer">Courses</li>
                        <li className="hover:text-yellow-600 cursor-pointer">Faculty</li>
                        <li className="hover:text-yellow-600 cursor-pointer">
                            Academics Calendar
                        </li>
                        <li className="hover:text-yellow-600 cursor-pointer">
                            Administrative Staff
                        </li>
                        <li className="hover:text-yellow-600 cursor-pointer">Faculty</li>
                        <li className="hover:text-yellow-600 cursor-pointer">
                            Holiday List
                        </li>
                    </ul>
                </aside>

                <section className="md:col-span-3 space-y-12">

  {/* ================= TEACHING STAFF (GUEST / CONTRACT) ================= */}
  <div>
    <h2 className="text-blue-700 text-xl font-semibold mb-2">
      Teaching Staff (Guest / Contract) – July 2025
    </h2>
    <p className="text-gray-600 mb-4">S.S.D.M College, Barh, Patna</p>

    <div className="overflow-x-auto border rounded-lg">
      <table className="w-full border-collapse text-sm">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="border px-3 py-2">SI.No.</th>
            <th className="border px-3 py-2">Name</th>
            <th className="border px-3 py-2">Subject</th>
            <th className="border px-3 py-2">Mobile</th>
            <th className="border px-3 py-2">Email</th>
          </tr>
        </thead>
        <tbody>
          {[
            [1,"Smt. Hemlata Das","Home Science","—","hemlatadas@gmail.com"],
            [2,"Smt. Manisha Kumari","Sanskrit","8434301229","mtiwari2911@gmail.com"],
            [3,"Sri Chanki Kumar","Botany","7004489357","chankikumar@gmail.com"],
            [4,"Smt. Bandana Raj","Zoology","9102796365","vandanaraj1002@gmail.com"],
            [5,"Smt. Priti Singh","Hindi","9801474804","pritisingh231289@gmail.com"],
            [6,"Smt. Pooja Kumari","Mathematics","6200231289","poojasinghraajput@gmail.com"],
            [7,"Smt. Deepika","Ancient History","9852955102","deepikaseema05@gmail.com"],
            [8,"Sanjay Kishore Singh","Psychology","—","hs2461096@gmail.com"],
            [9,"Sri Binay Kumar Singh","Philosophy","—","—"],
            [10,"Kumari Pratibha Das","History","—","—"],
            [11,"Rupa Kumari","Physics","—","—"],
            [12,"Lori Singh","Physics","—","—"],
          ].map((row, i) => (
            <tr key={i} className="hover:bg-gray-50">
              {row.map((cell, j) => (
                <td key={j} className="border px-3 py-2">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>

  {/* ================= NON-TEACHING STAFF ================= */}
  <div>
    <h2 className="text-blue-700 text-xl font-semibold mb-2">
      Non-Teaching Staff – September 2025
    </h2>
    <p className="text-gray-600 mb-4">S.S.D.M College, Barh, Patna</p>

    <div className="overflow-x-auto border rounded-lg">
      <table className="w-full border-collapse text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-3 py-2">SI.No.</th>
            <th className="border px-3 py-2">Name</th>
            <th className="border px-3 py-2">Designation</th>
            <th className="border px-3 py-2">Mobile</th>
            <th className="border px-3 py-2">Email</th>
          </tr>
        </thead>
        <tbody>
          {[
            [1,"Shashi Kiran","L.I Home Science","9942496438","shashikiran803213@gmail.com"],
            [2,"Saurabh Kumar","L.I Physics","7542819802","saurabhkumar472@gmail.com"],
            [3,"Puja Kumari","L.I Zoology","6203782677","shivamraj6230782677@gmail.com"],
            [4,"Umesh Kumar Singh","L.I Chemistry","9955210432","umesh853897@gmail.com"],
            [5,"Kamlesh Kumar Singh","Clerk Cum Cashier","9661119629","kamlesh803211@gmail.com"],
          ].map((row, i) => (
            <tr key={i} className="hover:bg-gray-50">
              {row.map((cell, j) => (
                <td key={j} className="border px-3 py-2">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>

  {/* ================= TEACHING STAFF (REGULAR) ================= */}
  <div>
    <h2 className="text-blue-700 text-xl font-semibold mb-2">
      Teaching Staff – September 2025
    </h2>
    <p className="text-gray-600 mb-4">S.S.D.M College, Barh, Patna</p>

    <div className="overflow-x-auto border rounded-lg">
      <table className="w-full border-collapse text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-3 py-2">SI.No.</th>
            <th className="border px-3 py-2">Name</th>
            <th className="border px-3 py-2">Subject</th>
            <th className="border px-3 py-2">Mobile</th>
            <th className="border px-3 py-2">Email</th>
          </tr>
        </thead>
        <tbody>
          {[
            [1,"Dr. Kaushal Kishore Singh","Chemistry","7549298333","principalssdmcbarh@gmail.com"],
            [2,"Sri Om Prakash Singh","Chemistry","9693085283","omprakashsingh79244@gmail.com"],
            [3,"Smt. Pushplata Singh","Chemistry","7870211211","pushaplatasingh007@gmail.com"],
            [4,"Dr. Rajesh Kumar Verma","Mathematics","6200086327","rkumarverma007@gmail.com"],
            [5,"Dr. Madhu Ranjan","Economics","7903588743","ranjan.madhu8@gmail.com"],
          ].map((row, i) => (
            <tr key={i} className="hover:bg-gray-50">
              {row.map((cell, j) => (
                <td key={j} className="border px-3 py-2">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>

</section>

            </div>

        </div>
    </>
  )
}

export default Faculty