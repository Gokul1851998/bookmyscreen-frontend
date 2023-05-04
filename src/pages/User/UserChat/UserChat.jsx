import React from 'react'
import Header from '../../../components/Header/Header'
import Footer from '../../../components/Footer/Footer'
import Chat from '../../../components/UserChat/Chat'
 function UserChat() {
  return (
    <div>
    <Header/>
    <div className='bg-gray-300 ' style={{minHeight:'100vh'}}><Chat/></div>
    <Footer/>
  </div>
  )
}

export default UserChat
