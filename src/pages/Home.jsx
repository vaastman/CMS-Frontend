import React from 'react'
import Navbar from '../components/Navbar'
import Slider from '../components/Slider'
import { assets } from '../assets/assest'
import NoticeBoard from '../components/NoticeBoard'
import Events from '../components/Events'
import Programs from '../components/Programs'

const Home = () => {
  return (
    <div>
      <Slider images={[assets.slider1, assets.slider2, assets.slider3, assets.art01, assets.art02, assets.art03]}/>
      <div className='max-w-7xl mx-auto px-4 md:px-8 lg:px-16 mb-16'>
        <NoticeBoard />
      </div>
      <Programs />
      <Events />
    </div>
  )
}

export default Home