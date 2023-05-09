import React,{useEffect} from 'react'
import { useLocation ,useNavigate} from 'react-router-dom'
import { getMovieDetails } from '../../api/movie/movie'
import { useState } from 'react'
import { getDates } from '../../api/user/users'
import moment from 'moment'
import Swal from 'sweetalert2'
import Loading from '../Loader/Loading'

function SelectTime() {
const location = useLocation()
const navigate = useNavigate()
const movieId = location.state
const [movieDetails,setMovieDetails] = useState([])
const [language,setLanguage] = useState('')
const [selectedButtonIndex, setSelectedButtonIndex] = useState(0);
const [movieshows,setMovieshows] = useState([])
const [loading1, setLoading1] = useState(true)
const [loading2, setLoading2] = useState(true)
const [loading3, setLoading3] = useState(true)

const currentDate = new Date();
const date2 = new Date();
const date3 = new Date();

const [date,setDate] = useState(currentDate)
const [curr,setCurr] = useState(currentDate)
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
       setCurr(date)
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
       setCurr('')
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
       setCurr('')
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
}, [movieId, date]);
  

const bookShow =async(showId,ownerName)=>{
  navigate('/selectSeats',{state:{showId,ownerName,date}})
}

useEffect(()=>{
  setTimeout(() => {
   setLoading1(false)
  }, 1000);
 },[movieDetails])
 useEffect(()=>{
  setTimeout(() => {
   setLoading2(false)
  }, 1000);
 },[dates])
 useEffect(()=>{
  setTimeout(() => {
   setLoading3(false)
  }, 1000);
 },[movieshows])

  return (
    <>
    <header className="bg-gray-900 sm:h-24 md:h-32 lg:h-40">
  <div className="flex flex-col sm:flex-row items-center justify-between sm:py-2 md:py-4 lg:py-6 px-4 sm:px-6 md:px-10 lg:px-16">
    <div className="text-white font sm:pl-4 md:pl-0 pr-3 pt-2 sm:pt-0 flex-grow sm:flex-grow-0">
      <h2 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl">{movieDetails.title} - {language}</h2>
      {loading1? (
        <Loading/>
      ):(
        <div className="flex flex-wrap py-2">
        {movieDetails?.genres && movieDetails.genres.map((gen) => (
          <button type="button" className="text-white border border-gray-800 font-medium rounded text-sm px-3 py-1 mr-2 mb-2">{gen.name}</button>
        ))}
      </div>
      )}
     
    </div>
  </div>
</header>


<header className="bg-gray-100">
  <div className="container flex flex-col items-center justify-center py-6 md:flex-row md:justify-between">
    {loading2? (
     <Loading/>
    ):(
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
    )}
    
  </div>
</header>
{loading3? (
<Loading/>
):(
<div className="flex flex-col justify-center m-4">
  {movieshows.length?
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
            
            {shows.map((show) => {
  if (moment(show.showTime, 'hh:mma').toDate() > curr) {
    return (
      <button onClick={() => bookShow(show._id, show.ownerName)} className="text-green-700 hover:text-white border-2 border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800">
      <b>{show.showTime}</b>
      </button>
    )
  } else {
    return (
      <button type="button" disabled className="bg-yellow-500 text-white hover:text-white border  focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 ">
    <b>{show.showTime}</b></button>
    )
  }
})}

          </div>
        </div>
      </div>
    )):(
      <div className="container-fluid">
      <div className="container-fluid mt-100 ">
        <div className="row">
          <div className="col-md-12">
            <div className="card-body cart">
            <div className="col-sm-12 empty-cart-cls d-flex flex-column align-items-center justify-content-center">
                <img
                  src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxOTYxLjY0MSAxODAzLjkxNSI+PGcgZGF0YS1uYW1lPSJYIiBmaWxsPSIjMDAwMDAwIiBjbGFzcz0iY29sb3IwMDAgc3ZnU2hhcGUiPjxwYXRoIGZpbGw9IiNlNmU2ZTYiIGQ9Ik0yNjIuNTQzIDEzODQuNjEycy0xOTkuNDQtMjQ2LjAxMS0xMDEuOTctNDk5LjI3OUMyMjQuMTA4IDcyMC4yNSA0NjIuNDMgNjI5Ljc5IDU5Ni45MjkgNzIwLjI1YzU3LjI4NSAzOC41MjcgMjQxLjA2NyAxLjI5OSAzMzkuMTk3LTE1OC4yMDggMTkwLjY4OC0zMDkuOTYgOTI5LjY3Ni0xMjguMTQ1IDczNS4wNCAzNTQuMTgtODguOTMgMjIwLjM4IDE3OC40NDMgMjM4LjY3IDU3LjY0NCA0NjguODc5WiIgY2xhc3M9ImNvbG9yZTZlNmU2IHN2Z1NoYXBlIi8+PHBhdGggZmlsbD0ibm9uZSIgc3Ryb2tlPSIjYjNiM2IzIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1taXRlcmxpbWl0PSIzNSIgc3Ryb2tlLXdpZHRoPSI0LjgxMyIgZD0ibTMxNi4wMjQgMTM4NC42MTEtMTUuNjkyLS4wMDVzLTMuNTM2LTQuMzYyLTkuNDQ0LTEyLjUyNSIgY2xhc3M9ImNvbG9yU3Ryb2tlYjNiM2IzIHN2Z1N0cm9rZSIvPjxwYXRoIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2IzYjNiMyIgc3Ryb2tlLWRhc2hhcnJheT0iMCAwIDAgMzEuNjUzIDAgMCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbWl0ZXJsaW1pdD0iMzUiIHN0cm9rZS13aWR0aD0iNC44MTMiIGQ9Ik0yOTAuODg4IDEzNzIuMDhjLTQuNTQtNi4yNzItMTAuNDgtMTQuNzktMTcuMjkzLTI1LjMiIGNsYXNzPSJjb2xvclN0cm9rZWIzYjNiMyBzdmdTdHJva2UiLz48cGF0aCBmaWxsPSJub25lIiBzdHJva2U9IiNiM2IzYjMiIHN0cm9rZS1kYXNoYXJyYXk9IjMxLjY1MyAwIDAgMCAwIDMxLjY1MyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbWl0ZXJsaW1pdD0iMzUiIHN0cm9rZS13aWR0aD0iNC44MTMiIGQ9Ik0yNzMuMDUgMTM0NS45NGMtNTEuNTAzLTc5LjcwNi0xNTEuNDA3LTI3MS4yOTUtNzYuMDI2LTQ2Ny4xNjdDMjYxLjM5MSA3MTEuNTIgNTAyLjg0MiA2MTkuODc1IDYzOS4xMDYgNzExLjUyYzU4LjAzNyAzOS4wMzMgMjQ0LjIzMiAxLjMxNiAzNDMuNjUtMTYwLjI4NSAxOTMuMTkyLTMxNC4wMyA5NDEuODgtMTI5LjgyNyA3NDQuNjkgMzU4LjgzLTg4LjI1NyAyMTguNzA3IDE2OS44NTcgMjQwLjk2IDY1LjQyIDQ2MC45OTIiIGNsYXNzPSJjb2xvclN0cm9rZWIzYjNiMyBzdmdTdHJva2UiLz48cGF0aCBmaWxsPSJub25lIiBzdHJva2U9IiNiM2IzYjMiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLW1pdGVybGltaXQ9IjM1IiBzdHJva2Utd2lkdGg9IjQuODEzIiBkPSJNMTc5Mi44NjMgMTM3MS4wNjRxLTMuMjY4IDYuODg3LTcuMDE3IDE0LjAzNmwtMTUuNjkzLS4wMDUiIGNsYXNzPSJjb2xvclN0cm9rZWIzYjNiMyBzdmdTdHJva2UiLz48cGF0aCBmaWxsPSJub25lIiBzdHJva2U9IiNiM2IzYjMiIHN0cm9rZS1kYXNoYXJyYXk9IjAgMCAwIDMwLjkzOSAwIDAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLW1pdGVybGltaXQ9IjM1IiBzdHJva2Utd2lkdGg9IjQuODEzIiBkPSJtMTc3MC4xNTMgMTM4NS4wOTUtMjkuOTM5LS4wMSIgY2xhc3M9ImNvbG9yU3Ryb2tlYjNiM2IzIHN2Z1N0cm9rZSIvPjxwYXRoIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2IzYjNiMyIgc3Ryb2tlLWRhc2hhcnJheT0iMzAuOTM5IDAgMCAwIDAgMzAuOTM5IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1taXRlcmxpbWl0PSIzNSIgc3Ryb2tlLXdpZHRoPSI0LjgxMyIgZD0ibTE3MzkuMjE0IDEzODUuMDg0LTE0MjMuMTktLjQ3MyIgY2xhc3M9ImNvbG9yU3Ryb2tlYjNiM2IzIHN2Z1N0cm9rZSIvPjxwYXRoIGZpbGw9IiM5ZTFmMjEiIGQ9Ik0xMTMwLjk3OSAxMDkyLjEzYzAgMTIxLjI2Mi03MS41MTYgODYuNTM5LTE1OS43MyA4Ni41MzktODguMjIxIDAtMTU5LjczMyAzNC43MjMtMTU5LjczMy04Ni41NFY4NDAuODA2YzAtMTIxLjI2NCA3MS41MTItMTIwLjI2NSAxNTkuNzMzLTEyMC4yNjUgODguMjE0IDAgMTU5LjczLS45OTkgMTU5LjczIDEyMC4yNjVaIiBjbGFzcz0iY29sb3I5ZTFmMjEgc3ZnU2hhcGUiLz48cGF0aCBmaWxsPSIjNWQ1ZDYxIiBkPSJNNzk0LjEzMyAxMDY1LjM0MUg4MjguOXY5Ni40MDZoLTM0Ljc2N3oiIGNsYXNzPSJjb2xvcjVkNWQ2MSBzdmdTaGFwZSIvPjxwYXRoIGZpbGw9IiM0MTQxNDMiIGQ9Ik03OTQuMTMzIDEwNjUuMzQxSDgyOC45djM1LjU0NWgtMzQuNzY3eiIgY2xhc3M9ImNvbG9yNDE0MTQzIHN2Z1NoYXBlIi8+PHBhdGggZmlsbD0iIzVkNWQ2MSIgZD0iTTExMTMuNTk5IDEwNjUuMzQxaDM0Ljc2NnY5Ni40MDZoLTM0Ljc2NnoiIGNsYXNzPSJjb2xvcjVkNWQ2MSBzdmdTaGFwZSIvPjxwYXRoIGZpbGw9IiM0MTQxNDMiIGQ9Ik0xMTEzLjU5OSAxMDY1LjM0MWgzNC43NjZ2MzUuNTQ1aC0zNC43NjZ6IiBjbGFzcz0iY29sb3I0MTQxNDMgc3ZnU2hhcGUiLz48cGF0aCBmaWxsPSIjZTYzNzM5IiBkPSJNMTE2MC40NCAxMTg3LjY0OGE1MS42MTQgNTEuNjE0IDAgMCAxLTUxLjYxNCA1MS42MTVIODMzLjY3MmE1MS42MTIgNTEuNjEyIDAgMCAxLTUxLjYxNC01MS42MTUgNTEuNjExIDUxLjYxMSAwIDAgMSA1MS42MTQtNTEuNjExaDI3NS4xNTRhNTEuNjE0IDUxLjYxNCAwIDAgMSA1MS42MTUgNTEuNjExWiIgY2xhc3M9ImNvbG9yZTYzNzM5IHN2Z1NoYXBlIi8+PHBhdGggZmlsbD0iIzllMWYyMSIgZD0iTTExMDguODI2IDEyMDMuOTYySDgzMy42NzJhNTEuNTc4IDUxLjU3OCAwIDAgMS00OC40NS0zMy45NjMgNTEuNDkgNTEuNDkgMCAwIDAgNDguNDUgNjkuMjY0aDI3NS4xNTRhNTEuNDkxIDUxLjQ5MSAwIDAgMCA0OC40NS02OS4yNjQgNTEuNTg1IDUxLjU4NSAwIDAgMS00OC40NSAzMy45NjNaIiBjbGFzcz0iY29sb3I5ZTFmMjEgc3ZnU2hhcGUiLz48cGF0aCBmaWxsPSIjZTYzNzM5IiBkPSJNMTA5OS4yMTUgNzI3LjExNWMwIDI3Ljc0Ny0yNS45ODMgNTAuMjQ0LTU4LjA0OSA1MC4yNDRIODk3LjU0NWMtMzIuMDU5IDAtNTguMDQyLTIyLjQ5Ny01OC4wNDItNTAuMjQ0IDAtMjcuNzQ5IDI1Ljk4My01MC4yNDYgNTguMDQyLTUwLjI0NmgxNDMuNjIxYzMyLjA2NiAwIDU4LjA0OSAyMi40OTcgNTguMDQ5IDUwLjI0NloiIGNsYXNzPSJjb2xvcmU2MzczOSBzdmdTaGFwZSIvPjxwYXRoIGZpbGw9IiM0MTQxNDMiIGQ9Ik04MzMuNjcyIDEyMzkuMjYzaDYzLjg4NHYxNDEuMTgzaC02My44ODR6TTEwNDMuODQyIDEyMzkuMjYzaDYzLjg4NHYxNDEuMTgzaC02My44ODR6IiBjbGFzcz0iY29sb3I0MTQxNDMgc3ZnU2hhcGUiLz48cGF0aCBmaWxsPSIjMjIyMjIyIiBkPSJNODMzLjY3MiAxMjM5LjI2M2g2My44ODR2MjYuMTA3aC02My44ODR6TTEwNDMuODQyIDEyMzkuMjYzaDYzLjg4NHYyNi4xMDdoLTYzLjg4NHpNNzkwLjMzMiAxMzgwLjQ0NmgzNjEuODM0djI3LjM4Mkg3OTAuMzMyeiIgY2xhc3M9ImNvbG9yMjIyIHN2Z1NoYXBlIi8+PHJlY3Qgd2lkdGg9IjIwMi43MjQiIGhlaWdodD0iMTAuMzIyIiB4PSI4NzEuMjQ2IiB5PSI4NTQuNzQ0IiBmaWxsPSIjZTYzNzM5IiBvcGFjaXR5PSIuNSIgcng9IjMuMDY0IiBjbGFzcz0iY29sb3JlNjM3Mzkgc3ZnU2hhcGUiLz48cmVjdCB3aWR0aD0iMjAyLjcyNCIgaGVpZ2h0PSIxMC4zMjIiIHg9Ijg3MS4yNDYiIHk9IjkwMi40ODMiIGZpbGw9IiNlNjM3MzkiIG9wYWNpdHk9Ii41IiByeD0iMy4wNjQiIGNsYXNzPSJjb2xvcmU2MzczOSBzdmdTaGFwZSIvPjxyZWN0IHdpZHRoPSIyMDIuNzI0IiBoZWlnaHQ9IjEwLjMyMiIgeD0iODcxLjI0NiIgeT0iOTU2LjY3MiIgZmlsbD0iI2U2MzczOSIgb3BhY2l0eT0iLjUiIHJ4PSIzLjA2NCIgY2xhc3M9ImNvbG9yZTYzNzM5IHN2Z1NoYXBlIi8+PHJlY3Qgd2lkdGg9IjIwMi43MjQiIGhlaWdodD0iMTAuMzIyIiB4PSI4NzEuMjQ2IiB5PSIxMDA1LjciIGZpbGw9IiNlNjM3MzkiIG9wYWNpdHk9Ii41IiByeD0iMy4wNjQiIGNsYXNzPSJjb2xvcmU2MzczOSBzdmdTaGFwZSIvPjxyZWN0IHdpZHRoPSIyMDIuNzI0IiBoZWlnaHQ9IjEwLjMyMiIgeD0iODcxLjI0NiIgeT0iMTA1Mi4xNDgiIGZpbGw9IiNlNjM3MzkiIG9wYWNpdHk9Ii41IiByeD0iMy4wNjQiIGNsYXNzPSJjb2xvcmU2MzczOSBzdmdTaGFwZSIvPjxwYXRoIGZpbGw9IiM5ZTFmMjEiIGQ9Ik03NTAuNDk3IDEwOTIuMTNjMCAxMjEuMjYyLTcxLjUxNSA4Ni41MzktMTU5LjczIDg2LjUzOS04OC4yMiAwLTE1OS43MzMgMzQuNzIzLTE1OS43MzMtODYuNTRWODQwLjgwNmMwLTEyMS4yNjQgNzEuNTEyLTEyMC4yNjUgMTU5LjczNC0xMjAuMjY1IDg4LjIxNCAwIDE1OS43My0uOTk5IDE1OS43MyAxMjAuMjY1WiIgY2xhc3M9ImNvbG9yOWUxZjIxIHN2Z1NoYXBlIi8+PHBhdGggZmlsbD0iIzVkNWQ2MSIgZD0iTTQxMy42NTEgMTA2NS4zNDFoMzQuNzY3djk2LjQwNmgtMzQuNzY3eiIgY2xhc3M9ImNvbG9yNWQ1ZDYxIHN2Z1NoYXBlIi8+PHBhdGggZmlsbD0iIzQxNDE0MyIgZD0iTTQxMy42NTEgMTA2NS4zNDFoMzQuNzY3djM1LjU0NWgtMzQuNzY3eiIgY2xhc3M9ImNvbG9yNDE0MTQzIHN2Z1NoYXBlIi8+PHBhdGggZmlsbD0iIzVkNWQ2MSIgZD0iTTczMy4xMTggMTA2NS4zNDFoMzQuNzY2djk2LjQwNmgtMzQuNzY2eiIgY2xhc3M9ImNvbG9yNWQ1ZDYxIHN2Z1NoYXBlIi8+PHBhdGggZmlsbD0iIzQxNDE0MyIgZD0iTTczMy4xMTggMTA2NS4zNDFoMzQuNzY2djM1LjU0NWgtMzQuNzY2eiIgY2xhc3M9ImNvbG9yNDE0MTQzIHN2Z1NoYXBlIi8+PHBhdGggZmlsbD0iI2U2MzczOSIgZD0iTTc5MS4zMDEgMTA2MC44NzhhMjUuNDY3IDI1LjQ2NyAwIDAgMS0yNS40NjcgMjUuNDY3aC0zMC42NjZhMjUuNDY3IDI1LjQ2NyAwIDAgMS0yNS40NjctMjUuNDY3IDI1LjQ2NyAyNS40NjcgMCAwIDEgMjUuNDY3LTI1LjQ2N2gzMC42NjZhMjUuNDY3IDI1LjQ2NyAwIDAgMSAyNS40NjcgMjUuNDY3WiIgY2xhc3M9ImNvbG9yZTYzNzM5IHN2Z1NoYXBlIi8+PHBhdGggZmlsbD0iIzllMWYyMSIgZD0iTTc2NS44MzQgMTA2OS45MjdoLTMwLjY2NmEyNS40NjUgMjUuNDY1IDAgMCAxLTI0LjA5LTE3LjI2IDI1LjQyNiAyNS40MjYgMCAwIDAgMjQuMDkgMzMuNjc4aDMwLjY2NmEyNS40MjUgMjUuNDI1IDAgMCAwIDI0LjA5LTMzLjY3OCAyNS40NjUgMjUuNDY1IDAgMCAxLTI0LjA5IDE3LjI2WiIgY2xhc3M9ImNvbG9yOWUxZjIxIHN2Z1NoYXBlIi8+PHBhdGggZmlsbD0iI2U2MzczOSIgZD0iTTc3OS45NiAxMTg3LjY0OGE1MS42MTQgNTEuNjE0IDAgMCAxLTUxLjYxNiA1MS42MTVINDUzLjE5MWE1MS42MTIgNTEuNjEyIDAgMCAxLTUxLjYxNS01MS42MTUgNTEuNjExIDUxLjYxMSAwIDAgMSA1MS42MTUtNTEuNjExaDI3NS4xNTNhNTEuNjE0IDUxLjYxNCAwIDAgMSA1MS42MTUgNTEuNjExWiIgY2xhc3M9ImNvbG9yZTYzNzM5IHN2Z1NoYXBlIi8+PHBhdGggZmlsbD0iIzllMWYyMSIgZD0iTTcyOC4zNDQgMTIwMy45NjJINDUzLjE5MWE1MS41NzggNTEuNTc4IDAgMCAxLTQ4LjQ1LTMzLjk2MyA1MS40OSA1MS40OSAwIDAgMCA0OC40NSA2OS4yNjRoMjc1LjE1M2E1MS40OTEgNTEuNDkxIDAgMCAwIDQ4LjQ1LTY5LjI2NCA1MS41ODUgNTEuNTg1IDAgMCAxLTQ4LjQ1IDMzLjk2M1oiIGNsYXNzPSJjb2xvcjllMWYyMSBzdmdTaGFwZSIvPjxwYXRoIGZpbGw9IiNlNjM3MzkiIGQ9Ik03MTguNzMzIDcyNy4xMTVjMCAyNy43NDctMjUuOTgzIDUwLjI0NC01OC4wNDggNTAuMjQ0SDUxNy4wNjNjLTMyLjA1OCAwLTU4LjA0MS0yMi40OTctNTguMDQxLTUwLjI0NCAwLTI3Ljc0OSAyNS45ODMtNTAuMjQ2IDU4LjA0MS01MC4yNDZoMTQzLjYyMmMzMi4wNjUgMCA1OC4wNDggMjIuNDk3IDU4LjA0OCA1MC4yNDZaIiBjbGFzcz0iY29sb3JlNjM3Mzkgc3ZnU2hhcGUiLz48cGF0aCBmaWxsPSIjNDE0MTQzIiBkPSJNNDUzLjE5MSAxMjM5LjI2M2g2My44ODR2MTQxLjE4M2gtNjMuODg0ek02NjMuMzYxIDEyMzkuMjYzaDYzLjg4NHYxNDEuMTgzaC02My44ODR6IiBjbGFzcz0iY29sb3I0MTQxNDMgc3ZnU2hhcGUiLz48cGF0aCBmaWxsPSIjMjIyMjIyIiBkPSJNNDUzLjE5MSAxMjM5LjI2M2g2My44ODR2MjYuMTA3aC02My44ODR6TTY2My4zNjEgMTIzOS4yNjNoNjMuODg0djI2LjEwN2gtNjMuODg0ek00MDkuODUxIDEzODAuNDQ2aDM2MS44MzR2MjcuMzgySDQwOS44NTF6IiBjbGFzcz0iY29sb3IyMjIgc3ZnU2hhcGUiLz48cmVjdCB3aWR0aD0iMjAyLjcyNCIgaGVpZ2h0PSIxMC4zMjIiIHg9IjQ5MC43NjQiIHk9Ijg1NC43NDQiIGZpbGw9IiNlNjM3MzkiIG9wYWNpdHk9Ii41IiByeD0iMy4wNjQiIGNsYXNzPSJjb2xvcmU2MzczOSBzdmdTaGFwZSIvPjxyZWN0IHdpZHRoPSIyMDIuNzI0IiBoZWlnaHQ9IjEwLjMyMiIgeD0iNDkwLjc2NCIgeT0iOTAyLjQ4MyIgZmlsbD0iI2U2MzczOSIgb3BhY2l0eT0iLjUiIHJ4PSIzLjA2NCIgY2xhc3M9ImNvbG9yZTYzNzM5IHN2Z1NoYXBlIi8+PHJlY3Qgd2lkdGg9IjIwMi43MjQiIGhlaWdodD0iMTAuMzIyIiB4PSI0OTAuNzY0IiB5PSI5NTYuNjcyIiBmaWxsPSIjZTYzNzM5IiBvcGFjaXR5PSIuNSIgcng9IjMuMDY0IiBjbGFzcz0iY29sb3JlNjM3Mzkgc3ZnU2hhcGUiLz48cmVjdCB3aWR0aD0iMjAyLjcyNCIgaGVpZ2h0PSIxMC4zMjIiIHg9IjQ5MC43NjQiIHk9IjEwMDUuNyIgZmlsbD0iI2U2MzczOSIgb3BhY2l0eT0iLjUiIHJ4PSIzLjA2NCIgY2xhc3M9ImNvbG9yZTYzNzM5IHN2Z1NoYXBlIi8+PHJlY3Qgd2lkdGg9IjIwMi43MjQiIGhlaWdodD0iMTAuMzIyIiB4PSI0OTAuNzY0IiB5PSIxMDUyLjE0OCIgZmlsbD0iI2U2MzczOSIgb3BhY2l0eT0iLjUiIHJ4PSIzLjA2NCIgY2xhc3M9ImNvbG9yZTYzNzM5IHN2Z1NoYXBlIi8+PHBhdGggZmlsbD0iI2U2MzczOSIgZD0iTTQ2OC41NSAxMDYwLjg3OGEyNS40NjcgMjUuNDY3IDAgMCAxLTI1LjQ2OCAyNS40NjdoLTMwLjY2NmEyNS40NjcgMjUuNDY3IDAgMCAxLTI1LjQ2Ny0yNS40NjcgMjUuNDY3IDI1LjQ2NyAwIDAgMSAyNS40NjctMjUuNDY3aDMwLjY2NmEyNS40NjcgMjUuNDY3IDAgMCAxIDI1LjQ2OCAyNS40NjdaIiBjbGFzcz0iY29sb3JlNjM3Mzkgc3ZnU2hhcGUiLz48cGF0aCBmaWxsPSIjOWUxZjIxIiBkPSJNNDQzLjA4MiAxMDY5LjkyN2gtMzAuNjY2YTI1LjQ2NSAyNS40NjUgMCAwIDEtMjQuMDktMTcuMjYgMjUuNDI2IDI1LjQyNiAwIDAgMCAyNC4wOSAzMy42NzhoMzAuNjY2YTI1LjQyNSAyNS40MjUgMCAwIDAgMjQuMDktMzMuNjc4IDI1LjQ2NSAyNS40NjUgMCAwIDEtMjQuMDkgMTcuMjZaTTE1MDkuMDk3IDEwOTIuMTNjMCAxMjEuMjYyLTcxLjUxNSA4Ni41MzktMTU5LjcyOSA4Ni41MzktODguMjIxIDAtMTU5LjczMyAzNC43MjMtMTU5LjczMy04Ni41NFY4NDAuODA2YzAtMTIxLjI2NCA3MS41MTItMTIwLjI2NSAxNTkuNzMzLTEyMC4yNjUgODguMjE0IDAgMTU5LjczLS45OTkgMTU5LjczIDEyMC4yNjVaIiBjbGFzcz0iY29sb3I5ZTFmMjEgc3ZnU2hhcGUiLz48cGF0aCBmaWxsPSIjNWQ1ZDYxIiBkPSJNMTE3Mi4yNTIgMTA2NS4zNDFoMzQuNzY3djk2LjQwNmgtMzQuNzY3eiIgY2xhc3M9ImNvbG9yNWQ1ZDYxIHN2Z1NoYXBlIi8+PHBhdGggZmlsbD0iIzQxNDE0MyIgZD0iTTExNzIuMjUyIDEwNjUuMzQxaDM0Ljc2N3YzNS41NDVoLTM0Ljc2N3oiIGNsYXNzPSJjb2xvcjQxNDE0MyBzdmdTaGFwZSIvPjxwYXRoIGZpbGw9IiM1ZDVkNjEiIGQ9Ik0xNDkxLjcxOCAxMDY1LjM0MWgzNC43NjZ2OTYuNDA2aC0zNC43NjZ6IiBjbGFzcz0iY29sb3I1ZDVkNjEgc3ZnU2hhcGUiLz48cGF0aCBmaWxsPSIjNDE0MTQzIiBkPSJNMTQ5MS43MTggMTA2NS4zNDFoMzQuNzY2djM1LjU0NWgtMzQuNzY2eiIgY2xhc3M9ImNvbG9yNDE0MTQzIHN2Z1NoYXBlIi8+PHBhdGggZmlsbD0iI2U2MzczOSIgZD0iTTE1NDkuOTAyIDEwNjAuODc4YTI1LjQ2NyAyNS40NjcgMCAwIDEtMjUuNDY4IDI1LjQ2N2gtMzAuNjY2YTI1LjQ2NyAyNS40NjcgMCAwIDEtMjUuNDY3LTI1LjQ2NyAyNS40NjcgMjUuNDY3IDAgMCAxIDI1LjQ2Ny0yNS40NjdoMzAuNjY2YTI1LjQ2NyAyNS40NjcgMCAwIDEgMjUuNDY4IDI1LjQ2N1oiIGNsYXNzPSJjb2xvcmU2MzczOSBzdmdTaGFwZSIvPjxwYXRoIGZpbGw9IiM5ZTFmMjEiIGQ9Ik0xNTI0LjQzNCAxMDY5LjkyN2gtMzAuNjY2YTI1LjQ2NSAyNS40NjUgMCAwIDEtMjQuMDktMTcuMjYgMjUuNDI2IDI1LjQyNiAwIDAgMCAyNC4wOSAzMy42NzhoMzAuNjY2YTI1LjQyNSAyNS40MjUgMCAwIDAgMjQuMDktMzMuNjc4IDI1LjQ2NSAyNS40NjUgMCAwIDEtMjQuMDkgMTcuMjZaIiBjbGFzcz0iY29sb3I5ZTFmMjEgc3ZnU2hhcGUiLz48cGF0aCBmaWxsPSIjZTYzNzM5IiBkPSJNMTUzOC41NiAxMTg3LjY0OGE1MS42MTQgNTEuNjE0IDAgMCAxLTUxLjYxNSA1MS42MTVIMTIxMS43OWE1MS42MTIgNTEuNjEyIDAgMCAxLTUxLjYxNC01MS42MTUgNTEuNjExIDUxLjYxMSAwIDAgMSA1MS42MTQtNTEuNjExaDI3NS4xNTRhNTEuNjE0IDUxLjYxNCAwIDAgMSA1MS42MTQgNTEuNjExWiIgY2xhc3M9ImNvbG9yZTYzNzM5IHN2Z1NoYXBlIi8+PHBhdGggZmlsbD0iIzllMWYyMSIgZD0iTTE0ODYuOTQ1IDEyMDMuOTYySDEyMTEuNzlhNTEuNTc4IDUxLjU3OCAwIDAgMS00OC40NS0zMy45NjMgNTEuNDkgNTEuNDkgMCAwIDAgNDguNDUgNjkuMjY0aDI3NS4xNTRhNTEuNDkxIDUxLjQ5MSAwIDAgMCA0OC40NS02OS4yNjQgNTEuNTg1IDUxLjU4NSAwIDAgMS00OC40NSAzMy45NjNaIiBjbGFzcz0iY29sb3I5ZTFmMjEgc3ZnU2hhcGUiLz48cGF0aCBmaWxsPSIjZTYzNzM5IiBkPSJNMTQ3Ny4zMzQgNzI3LjExNWMwIDI3Ljc0Ny0yNS45ODMgNTAuMjQ0LTU4LjA0OSA1MC4yNDRoLTE0My42MjJjLTMyLjA1OCAwLTU4LjA0MS0yMi40OTctNTguMDQxLTUwLjI0NCAwLTI3Ljc0OSAyNS45ODMtNTAuMjQ2IDU4LjA0MS01MC4yNDZoMTQzLjYyMmMzMi4wNjYgMCA1OC4wNDkgMjIuNDk3IDU4LjA0OSA1MC4yNDZaIiBjbGFzcz0iY29sb3JlNjM3Mzkgc3ZnU2hhcGUiLz48cGF0aCBmaWxsPSIjNDE0MTQzIiBkPSJNMTIxMS43OTEgMTIzOS4yNjNoNjMuODg0djE0MS4xODNoLTYzLjg4NHpNMTQyMS45NjEgMTIzOS4yNjNoNjMuODg0djE0MS4xODNoLTYzLjg4NHoiIGNsYXNzPSJjb2xvcjQxNDE0MyBzdmdTaGFwZSIvPjxwYXRoIGZpbGw9IiMyMjIyMjIiIGQ9Ik0xMjExLjc5MSAxMjM5LjI2M2g2My44ODR2MjYuMTA3aC02My44ODR6TTE0MjEuOTYxIDEyMzkuMjYzaDYzLjg4NHYyNi4xMDdoLTYzLjg4NHoiIGNsYXNzPSJjb2xvcjIyMiBzdmdTaGFwZSIvPjxyZWN0IHdpZHRoPSIyMDIuNzI0IiBoZWlnaHQ9IjEwLjMyMiIgeD0iMTI0OS4zNjQiIHk9Ijg1NC43NDQiIGZpbGw9IiNlNjM3MzkiIG9wYWNpdHk9Ii41IiByeD0iMy4wNjQiIGNsYXNzPSJjb2xvcmU2MzczOSBzdmdTaGFwZSIvPjxyZWN0IHdpZHRoPSIyMDIuNzI0IiBoZWlnaHQ9IjEwLjMyMiIgeD0iMTI0OS4zNjQiIHk9IjkwMi40ODMiIGZpbGw9IiNlNjM3MzkiIG9wYWNpdHk9Ii41IiByeD0iMy4wNjQiIGNsYXNzPSJjb2xvcmU2MzczOSBzdmdTaGFwZSIvPjxyZWN0IHdpZHRoPSIyMDIuNzI0IiBoZWlnaHQ9IjEwLjMyMiIgeD0iMTI0OS4zNjQiIHk9Ijk1Ni42NzIiIGZpbGw9IiNlNjM3MzkiIG9wYWNpdHk9Ii41IiByeD0iMy4wNjQiIGNsYXNzPSJjb2xvcmU2MzczOSBzdmdTaGFwZSIvPjxyZWN0IHdpZHRoPSIyMDIuNzI0IiBoZWlnaHQ9IjEwLjMyMiIgeD0iMTI0OS4zNjQiIHk9IjEwMDUuNyIgZmlsbD0iI2U2MzczOSIgb3BhY2l0eT0iLjUiIHJ4PSIzLjA2NCIgY2xhc3M9ImNvbG9yZTYzNzM5IHN2Z1NoYXBlIi8+PHJlY3Qgd2lkdGg9IjIwMi43MjQiIGhlaWdodD0iMTAuMzIyIiB4PSIxMjQ5LjM2NCIgeT0iMTA1Mi4xNDgiIGZpbGw9IiNlNjM3MzkiIG9wYWNpdHk9Ii41IiByeD0iMy4wNjQiIGNsYXNzPSJjb2xvcmU2MzczOSBzdmdTaGFwZSIvPjxwYXRoIGZpbGw9IiMyMjIyMjIiIGQ9Ik0xNDcuNDY2IDEzODAuNDQ2aDE2ODAuNDMydjI3LjM4MkgxNDcuNDY2eiIgY2xhc3M9ImNvbG9yMjIyIHN2Z1NoYXBlIi8+PHBhdGggZmlsbD0iI2U2MzczOSIgZD0iTTg0My4wMDQgMTA1OS40NjJhMjUuNDcgMjUuNDcgMCAwIDEtMjUuNDY3IDI1LjQ2N2gtODguODVhMjUuNDY5IDI1LjQ2OSAwIDAgMS0yNS40NjktMjUuNDY3IDI1LjQ2OCAyNS40NjggMCAwIDEgMjUuNDY5LTI1LjQ2N2g4OC44NWEyNS40NyAyNS40NyAwIDAgMSAyNS40NjcgMjUuNDY3WiIgY2xhc3M9ImNvbG9yZTYzNzM5IHN2Z1NoYXBlIi8+PHBhdGggZmlsbD0iIzllMWYyMSIgZD0iTTgxNy41MzcgMTA2OC41MWgtODguODVhMjUuNDYzIDI1LjQ2MyAwIDAgMS0yNC4wOS0xNy4yNTkgMjUuNDIgMjUuNDIgMCAwIDAgMjQuMDkgMzMuNjc4aDg4Ljg1YTI1LjQyNSAyNS40MjUgMCAwIDAgMjQuMDktMzMuNjc4IDI1LjQ2OCAyNS40NjggMCAwIDEtMjQuMDkgMTcuMjZaIiBjbGFzcz0iY29sb3I5ZTFmMjEgc3ZnU2hhcGUiLz48cGF0aCBmaWxsPSIjZTYzNzM5IiBkPSJNMTIzNi4zMjMgMTA1OS40NjJhMjUuNDcgMjUuNDcgMCAwIDEtMjUuNDY3IDI1LjQ2N2gtODguODVhMjUuNDY5IDI1LjQ2OSAwIDAgMS0yNS40NjktMjUuNDY3IDI1LjQ2OCAyNS40NjggMCAwIDEgMjUuNDY5LTI1LjQ2N2g4OC44NWEyNS40NyAyNS40NyAwIDAgMSAyNS40NjcgMjUuNDY3WiIgY2xhc3M9ImNvbG9yZTYzNzM5IHN2Z1NoYXBlIi8+PHBhdGggZmlsbD0iIzllMWYyMSIgZD0iTTEyMTAuODU2IDEwNjguNTFoLTg4Ljg1YTI1LjQ2MyAyNS40NjMgMCAwIDEtMjQuMDktMTcuMjU5IDI1LjQyIDI1LjQyIDAgMCAwIDI0LjA5IDMzLjY3OGg4OC44NWEyNS40MjUgMjUuNDI1IDAgMCAwIDI0LjA5LTMzLjY3OCAyNS40NjggMjUuNDY4IDAgMCAxLTI0LjA5IDE3LjI2WiIgY2xhc3M9ImNvbG9yOWUxZjIxIHN2Z1NoYXBlIi8+PHBhdGggZmlsbD0iI2ZiYjAzYiIgZD0ibTgxMi42MDUgODE2Ljc5MiAzMDEuMDUxIDMxNy45NTYuMTMtNDguNjUtMjkxLjQ3LTMxMS41MDhhMTQxLjk0IDE0MS45NCAwIDAgMC05LjcxMSA0Mi4yMDJaIiBjbGFzcz0iY29sb3JmYmIwM2Igc3ZnU2hhcGUiLz48cGF0aCBmaWxsPSIjZmJiMDNiIiBkPSJtMTEyOS44MTMgODE2Ljc5Mi0zMDEuMDUxIDMxNy45NTYtLjEzLTQ4LjY1IDI5MS40Ny0zMTEuNTA4YTE0MS45NCAxNDEuOTQgMCAwIDEgOS43MTEgNDIuMjAyWiIgY2xhc3M9ImNvbG9yZmJiMDNiIHN2Z1NoYXBlIi8+PC9nPjwvc3ZnPg=="
                  alt="Empty cart"
                  className="img-fluid mr-3"
                  width={250}
                  height={250}
                />
                <h3>
                  <strong>No shows available</strong>
                </h3>
                <h4>Check for any other dates :</h4>
                <a
                  onClick={()=>navigate('/')}
                  className="btn btn-primary text-white cart-btn-transform m-3"
                  data-abc="true"
                >
                  Go Home
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
    }
</div>
)}
        </>
  )
}

export default SelectTime
