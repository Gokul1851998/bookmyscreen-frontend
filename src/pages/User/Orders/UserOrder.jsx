import React from 'react'
import Header from '../../../components/Header/Header'
import Footer from '../../../components/Footer/Footer'
import Orders from '../../../components/UserOrders/Orders'
function UserOrder() {
  return (
    <div>
      <Header/>
      <div style={{minHeight:'100vh'}}><Orders /></div>
      <Footer/>
    </div>
  )
}

export default  UserOrder