import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { getTheatreShows } from '../../api/user/users'

export default function TheatreShows() {
  const location = useLocation()
  const ownerId = location.state.ownerId
  useEffect(()=>{
  const fetchData = async()=>{
  if(ownerId){
    const response = await getTheatreShows(ownerId)
    console.log(response);
  }
  }
  fetchData()
  },[])
  return (
    <div>
      <h2>gokul</h2>
    </div>
  )
}
