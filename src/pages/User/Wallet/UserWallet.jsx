import React from 'react'
import Header from '../../../components/Header/Header'
import Footer from '../../../components/Footer/Footer'
import Wallet from '../../../components/UserWallet/Wallet'

 function UserWallet() {
  return (
    <div>
      <Header/>
      <div className='bg-gray-300 ' style={{minHeight:'100vh'}}><Wallet/></div>
      <Footer/>
    </div>
  )
}

export default UserWallet
