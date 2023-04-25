import React,{useEffect} from 'react'
import { useLocation ,useNavigate} from 'react-router-dom'
import { getMovieDetails } from '../../api/movie/movie'
import { useState } from 'react'
import { getDates } from '../../api/user/users'
import Swal from 'sweetalert2'

function SelectTime() {
const location = useLocation()
const navigate = useNavigate()
const movieId = location.state
const [movieDetails,setMovieDetails] = useState([])
const [language,setLanguage] = useState('')
const [selectedButtonIndex, setSelectedButtonIndex] = useState(0);
const [movieshows,setMovieshows] = useState([])

const currentDate = new Date();
const date2 = new Date();
const date3 = new Date();

const [date,setDate] = useState(currentDate)
// Calculate two more dates
date2.setTime(currentDate.getTime() + (24 * 60 * 60 * 1000)); // Add one day
date3.setTime(currentDate.getTime() + (2 * 24 * 60 * 60 * 1000)); // Add two days

const options = { 
  weekday: 'short', 
  day: 'numeric', 
  month: 'short'
};

const dates = [
  currentDate.toLocaleDateString('en-US', options),
  date2.toLocaleDateString('en-US', options),
  date3.toLocaleDateString('en-US', options)
];

const handleButtonClick = async(index) => {
    if(index===0){
      const response = await getMovieDetails(movieId);
      setDate(currentDate)
      const date = currentDate
      const shows = {response,date}
      const response2 = await getDates(shows);
      if(response2.success){
       setMovieshows(response2.data)
      }else{
        Swal.fire(
          'No Shows',
          'Shows Unavailable',
          'warning'
        )
      }
  }else if(index===1){
    const response = await getMovieDetails(movieId);
    setDate(date2)
    const date = date2
    const shows = {response,date}
    const response2 = await getDates(shows);
      if(response2.success){
       setMovieshows(response2.data)
      }else{
        Swal.fire(
          'No Shows',
          'Shows Unavailable',
          'warning'
        )
      }
  }else{
    const response = await getMovieDetails(movieId);
    setDate(date3)
    const date = date3
    const shows = {response,date}
    const response2 = await getDates(shows);
      if(response2.success){
       setMovieshows(response2.data)
      }else{
        Swal.fire(
          'No Shows',
          'Shows Unavailable',
          'warning'
        )
      }
  }
  setSelectedButtonIndex(index);
  
}
useEffect(() => {
  const fetchData = async () => {
    if (movieId && date) {
      const response = await getMovieDetails(movieId);
      const shows ={response,date}
      const response2 = await getDates(shows);
      if(response2.success){
       setMovieshows(response2.data)
      }else{
        Swal.fire(
          'No Shows',
          'Shows Unavailable',
          'warning'
        )
      }
     
      setMovieDetails(response);
      setLanguage(response?.spoken_languages[0]?.english_name);
    }
  };
  fetchData();
  window.scrollTo(0, 0);
}, [movieId, date]);
  

const bookShow =async(showId,ownerName)=>{
  navigate('/selectSeats',{state:{showId,ownerName,date}})
}


  return (
    <>
    <header className="bg-gray-900 sm:h-24 md:h-32 lg:h-40">
  <div className="flex flex-col sm:flex-row items-center justify-between sm:py-2 md:py-4 lg:py-6 px-4 sm:px-6 md:px-10 lg:px-16">
    <div className="text-white font sm:pl-4 md:pl-0 pr-3 pt-2 sm:pt-0 flex-grow sm:flex-grow-0">
      <h2 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl">{movieDetails.title} - {language}</h2>
      <div className="flex flex-wrap py-2">
        {movieDetails?.genres && movieDetails.genres.map((gen) => (
          <button type="button" className="text-white border border-gray-800 font-medium rounded text-sm px-3 py-1 mr-2 mb-2">{gen.name}</button>
        ))}
      </div>
    </div>
  </div>
</header>


<header className="bg-gray-100">
  <div className="container flex flex-col items-center justify-center py-6 md:flex-row md:justify-between">
    
    <div className="flex items-center justify-center  ml-5 mr-5 md:mt-0">
      {dates.map((date, index) => (
        <button
          key={index}
          type="button"
          className={`ml-1 px-3 py-2 mr-2 text-sm font-medium rounded-lg ${selectedButtonIndex === index ? 'bg-red-500 text-white' : 'bg-gray-300 hover:bg-gray-400'}`}
          onClick={() => handleButtonClick(index,date)}
        >
          <div>{date.split(',')[0]}</div>
          <div className='font-bold text-md'>{date.split(' ')[2]}</div>
          <div>{date.split(' ')[1]}</div>
        </button>
      ))}
    </div>
  </div>
</header>

<div className="flex flex-col justify-center m-4">
  {movieshows &&
    Object.values(
      movieshows.reduce((acc, curr) => {
        if (!acc[curr.ownerName]) {
          acc[curr.ownerName] = [curr];
        } else {
          acc[curr.ownerName].push(curr);
        }
        return acc;
      }, {})
    ).map((shows) => (
      <div
      className="mb-5 relative flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl shadow-lg p-3 max-w-md md:max-w-6xl border border-white bg-white"
      key={shows[0]._id}
      >
        <div className="w-100  bg-white flex flex-col space-y-2 p-3">
          <div className="flex justify-between items-center">
            <h3 className="font-black text-gray-800 md:text-2xl text-xl">
              {shows[0].ownerName} :<br/>
              {shows[0].location}
            </h3>
            
            {shows.map((show) => (
              
             <button onClick={()=>bookShow(show._id,show.ownerName)}
             className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-full">
             {show.showTime}
           </button>
            ))}
          </div>
        </div>
      </div>
    ))}
</div>





        </>
  )
}

export default SelectTime
