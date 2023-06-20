import React from 'react'
import Header from '../../../components/Header/Header'
import Footer from '../../../components/Footer/Footer'
import SinglePage from '../../../components/SinglePage/singlePage'

function MoviePage() {
  return (
    <div>
      <Header/>
      <div style={{minHeight:'100vh'}}> <SinglePage/></div> 
      <Footer/>
    </div>
  )
}

export default  MoviePage
