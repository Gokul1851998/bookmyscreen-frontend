import React from 'react'
import Header from '../../../components/Header/Header'
import Footer from '../../../components/Footer/Footer'
import TheatreShows from '../../../components/TheatreShows/TheatreShows'

export default function TheatreShowlist() {
  return (
    <div>
        <Header/>
      <div  style={{minHeight:'100vh'}}><TheatreShows/></div>
      <Footer/>
    </div>
  )
}
