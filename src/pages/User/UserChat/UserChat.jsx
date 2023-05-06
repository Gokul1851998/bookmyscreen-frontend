import React from 'react'
import Header from '../../../components/Header/Header'
import Footer from '../../../components/Footer/Footer'
import Chat from '../../../components/UserChat/ChatList'
 function UserChat() {
  return (
    <div>
    <Header/>
    <div  style={{minHeight:'100vh'}}><Chat/></div>
    <Footer/>
  </div>
  )
}

export default UserChat
