import React from 'react'
import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import About from './pages/About'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Login from './pages/Login'
import Header from './components/Header'
import Gallery from './components/Gallery'
import ContactUs from './pages/ContactUs'
import Campus from './pages/Campus'


function App() {
  return (
    <div>
      <Header />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/campus" element={<Campus />} />
        
      </Routes>
      <Footer />
    </div>
  )
}

export default App