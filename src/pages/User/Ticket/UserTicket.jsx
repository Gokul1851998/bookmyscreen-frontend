import React from 'react'
import Header from '../../../components/Header/Header'
import Footer from '../../../components/Footer/Footer'
import Ticket from '../../../components/UserTicket/Ticket'

function UserTicket() {
  return (
    <div>
      <Header/>
      <div className='bg-gray-300 ' style={{minHeight:'100vh'}}><Ticket/></div>
      <Footer/>
    </div>
  )
}

export default  UserTicket
