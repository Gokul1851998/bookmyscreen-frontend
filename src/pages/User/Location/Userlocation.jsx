import React from 'react'
import Header from '../../../components/Header/Header'
import Location from '../../../components/Userlocation/Location'
import Footer from '../../../components/Footer/Footer'

export default function Userlocation() {
  return (
    <div>
       <Header/>
      <div style={{minHeight:'100vh'}}><Location/></div>
      <Footer/>
    </div>
  )
}
