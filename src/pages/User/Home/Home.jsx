import React from 'react'
import Banner from '../../../components/Banner/Banner'
import Footer from '../../../components/Footer/Footer'
import Header from '../../../components/Header/Header'
import Rowpost from '../../../components/Rowpost/Rowpost'


 function Home() {
  return (
    <div>
        <Header/>
        <div className='relative z-0' style={{minHeight:'100vh'}}> 
        <Banner/>
        <Rowpost/>
        </div>
        <Footer/>
    </div>
  )
}

export default Home
