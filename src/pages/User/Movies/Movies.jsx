import React from 'react'
import Header from '../../../components/Header/Header'
import Footer from '../../../components/Footer/Footer'
import AllMovies from '../../../components/UserMoviesList/AllMovies'

function Movies() {
  return (
    <div>
      <Header/>
      <div style={{minHeight:'100vh'}}> <AllMovies/></div>
      <Footer/>
    </div>
  )
}

export default Movies
