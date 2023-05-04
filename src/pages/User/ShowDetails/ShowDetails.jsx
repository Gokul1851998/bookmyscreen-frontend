import React from 'react'
import Header from '../../../components/Header/Header'
import Footer from '../../../components/Footer/Footer'
import SelectTime from '../../../components/SelectShow/SelectTime'

function ShowDetails() {
  return (
    <div>
      <Header/>
      <div style={{minHeight:'100vh'}}><SelectTime/></div>
      <Footer/>
    </div>
  )
}

export default ShowDetails
