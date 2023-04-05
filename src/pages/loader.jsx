import React from 'react'
import '../index.css'
import { MutatingDots } from  'react-loader-spinner'

function Loader() {
  return (
    <div className='loader-parent'>
        <div className='loader'>
          <MutatingDots
          color='#c7d5e0'
          secondaryColor='#c7d5e0'
          />
        </div>
    </div>
  )
}

export default Loader