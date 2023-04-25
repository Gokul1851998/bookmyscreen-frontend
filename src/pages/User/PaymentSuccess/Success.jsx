import React from 'react'
import Header from '../../../components/Header/Header'
import Footer from '../../../components/Footer/Footer'
import PaymentSuccessfull from '../../../components/PaymentSuccessfull/PaymentSuccessfull'

function Success() {
  return (
    <div>
      <Header/>
      <div style={{minHeight:'80vh'}}>
      <PaymentSuccessfull/>
      </div>
      <Footer/>
     
    </div>
  )
}

export default Success
