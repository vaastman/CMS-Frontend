import React from 'react'
import Navbar from '../components/Navbar'
import Slider from '../components/Slider'
import { assets } from '../assets/assest'
import NoticeBoard from '../components/NoticeBoard'
import Events from '../components/Events'
import Programs from '../components/Programs'
import About from './About'
import NoticeAndPrincipal from './NoticeAndPrincipal'
import AnnouncementBar from '../components/AnnouncementBar'
import QuickLinks from '../components/QuickLinks'

const Home = () => {
  return (
    <div>
      <Slider images={[assets.slider1, assets.slider2, assets.slider3, assets.art01, assets.art02, assets.art03]}/>
      <AnnouncementBar />
      <About/>
      <NoticeAndPrincipal />
      {/* <div className='max-w-7xl mx-auto px-4 md:px-8 lg:px-16 mb-16'>
        <NoticeBoard />
      </div> */}
      <Programs />
      <QuickLinks />
      <Events />
    </div>
  )
}

export default Home