import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getTheatreShows } from '../../api/user/users'
import { toast } from 'react-hot-toast'
import moment from 'moment/moment'

export default function TheatreShows() {
  const location = useLocation()
  const ownerId = location.state.ownerId
  const navigate = useNavigate()
  const [shows,setShows] = useState([])
  const [owner,setOwner] = useState([])
  const currentDate = new Date();
  const [date,setDate] = useState(currentDate)
  useEffect(()=>{
  const fetchData = async()=>{
  if(ownerId){
    const response = await getTheatreShows(ownerId)
    console.log(response.data);
     if(response.success){
       setOwner(response.data.owner)
       setShows(response.data.shows)
     }else{
        toast.error('Shows not available')
     }
  }
  }
  fetchData()
  },[ownerId])

  const bookShow =async(showId,ownerName)=>{
    navigate('/selectSeats',{state:{showId,ownerName,date}})
  }
  return (
    <>
      <header className="bg-gray-900 sm:h-30 md:h-30 lg:h-30">
  <div className="flex flex-col sm:flex-row items-center justify-between sm:py-2 md:py-4 lg:py-6 px-4 sm:px-6 md:px-10 lg:px-16">
   
      <div className="text-white font sm:pl-4 md:pl-0 pr-3 pt-2 sm:pt-0 flex-grow sm:flex-grow-0">
      <h2 className="text-lg sm:text-2xl md:text-3xl lg:text-2xl">{owner.Name}</h2>
      <div className="flex flex-wrap py-2">
        {owner.Location} | {owner.Email}  |  {owner.Phone}
      </div>
      <div className="flex flex-wrap">
        Today Shows | {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
      </div>
    </div>
  </div>
</header>
<div className="flex flex-col justify-center m-4">
    {shows && shows.map((show)=>(
<div className="mb-5 w-full relative flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl shadow-lg p-3 max-w-md md:max-w-6xl border border-white bg-white"
     
      >
        <div className="w-100  bg-white flex flex-col space-y-2 p-3">
          <div className="flex justify-between  items-center">
            <h3 className="font-black w-50 text-gray-800 md:text-2xl text-xl">
              {show.movieName} :<br/>
              {show.location}
            </h3>
            
         
         
   { moment(show.showTime, 'hh:mma').toDate() > date ? (

<button type="button" onClick={() => bookShow(show._id, show.ownerName)} className="text-green-700 hover:text-white border-2 border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800">
<b>{show.showTime}</b>
</button>

   ) :
(
    <button type="button" disabled className="bg-yellow-500 text-white hover:text-white border  focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 ">
    <b>{show.showTime}</b></button>
)
   }
  
      

 
     
  
 
 

          </div>
        </div>
      </div>
      ))}
      </div>
    </>
  )
}
