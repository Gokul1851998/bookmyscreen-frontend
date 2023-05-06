import React, { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import ShowDetails from '../../pages/User/ShowDetails/ShowDetails'
import { getSeats } from '../../api/user/users'
import { toast } from 'react-hot-toast'
import './UserSeats.css';
import Swal from 'sweetalert2'

function UserSeats() {
  const navigate = useNavigate()
  const [seats, setSeats] = useState([])
  const [show, setShow] = useState(null)
  const [rows,setRows] = useState(0)
  const [columns,setColumns] = useState(0)
  const location = useLocation()
  const { showId, date, ownerName } = location.state
  // const [showdate,setShowdate] = useState(date)
  const [owner,setOwner] = useState(ownerName) 
  const [selectedSeats,setSelectedSeat] = useState([]) 
  const [showDetails,setShowDetails] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      if (showId && date) {
        const showDetails = { showId, date }
        const response = await getSeats(showDetails)
        if (response.success) {
           setShowDetails(response.data.showData);
          setShow(response.data.screen)
          setColumns(response.data.screen.columns)
          setRows(response.data.screen.rows)
          setSeats(response.data.seats.dates[0].seats)
        } else {
          toast.error(response.message)
        }
      }
    }
    fetchData()
    window.scrollTo(0, 0)
  }, [showId, date])

  

  const handleSeat = (seatDetails) => {
    try {
    if(seatDetails.seatStatus === 'available'){
      seatDetails.seatStatus = 'selected'
      setSelectedSeat([...selectedSeats,seatDetails])
      console.log(selectedSeats);
    }else{
      seatDetails.seatStatus = 'available'
      const updatedSeats = selectedSeats.filter(
        (seat) => seat.id !== seatDetails.id
      )
      setSelectedSeat(updatedSeats)
      
    }
    } catch (error) {
      console.log(error.message)
    }
  }

  const data = {
    showDetails:showDetails,
    selectedSeats:selectedSeats,
    date:date,
    direction:true
  }

  const handlePayment = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('userToken');
    if(token){
      if(data.selectedSeats.length ===0){
        Swal.fire(
          'Please Select your seat',
          `Seems like you don't select any seat. You want to select atleast one seat to go for an payment option`,
          'warning'
        )
      }else{
    navigate('/payment',{state:{data}})
      }
    }else{
      Swal.fire(
        'Please Login',
        `Please login before payment`,
        'warning'
      )
  }
  }

  return (
  <>
    <header className="bg-gray-900 sm:h-30 md:h-30 lg:h-30">
  <div className="flex flex-col sm:flex-row items-center justify-between sm:py-2 md:py-4 lg:py-6 px-4 sm:px-6 md:px-10 lg:px-16">
    <div className="text-white font sm:pl-4 md:pl-0 pr-3 pt-2 sm:pt-0 flex-grow sm:flex-grow-0">
      <h2 className="text-lg sm:text-2xl md:text-3xl lg:text-2xl">{showDetails.movieName}</h2>
      <div className="flex flex-wrap py-2">
      
        {showDetails.ownerName} | {showDetails.location} | {new Date(date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })} |  {showDetails.showTime}
         
      
      </div>
    </div>
  </div>
</header>

    <div className='mainDivSeatSelect p-10'>
      <div className='insideDivSeat'>

      <div className='priceShowDiv'>
  <div className='flex justify-center'>
    <h1 className='font-semibold text-red-600 text-center md:text-left'>
      You have selected <b className='text-xl'>{selectedSeats.length}</b> seats for a price of <b className='text-xl'>{selectedSeats.length * showDetails.price}</b> rs/-
      <button onClick={handlePayment} className='cursor-pointer px-3 py-2 bg-green-600 hover:bg-green-700 rounded-lg mx-5 text-white'>
        Pay now
      </button>
    </h1>
  </div>
</div>

<div className='seatDetailsDiv flex gap-4'>
  <div className='seatAvailable flex items-center'>
    <div className='w-4 h-4 bg-black-500 mr-1 border border-black-900'></div>
    <h1 className='font-semibold'>Available</h1>
  </div>
  <div className='seatAvailable flex items-center'>
    <div className='w-4 h-4 bg-slate-400 mr-1'></div>
    <h1 className='font-semibold'>Sold</h1>
  </div>
  <div className='seatAvailable flex items-center'>
    <div className='w-4 h-4 bg-green-700 mr-1'></div>
    <h1 className='font-semibold'>Selected</h1>
  </div>
</div>


<div className='theaterScreenDiv'>
  <div className='screenDivInside'>
    <div className='flex justify-center md:mb-10'>
      <h1 className='mx-auto text-slate-400 font-medium'>All eyes this way please</h1>
    </div>
    <div className='screen'>SCREEN</div>
  </div>
</div>

        <div className='container'>
        <div className='wholeSeatDiv'>
          <div className='seatArrangeDiv mx-auto '>
            <div className='w-full h-auto justify-center my-auto flex flex-wrap py-10'>
            {seats && seats.map((seat,index)=>{ 
              if(index % columns === 0){
                return (
                  <>
                  {index !== 0 && <br />} 
                  
                  <div className='w-full flex justify-center'></div>
                  <div className='m-2'>
                    {seat.seatStatus !== 'sold' ? (
                      <>
                      <div className='flex'>

                      <h1 className='mx-2 text-gray-400 font-medium'>{seat.id.slice(0,1)}</h1>
                      <div className={`seatClass ${seat.seatStatus === 'selected' ? 'seatSelected' : ''}`} onClick={()=>handleSeat(seat)}>{seat.id.slice(2,5)}</div>
                      </div>
                      </>
                    ) : (
                      <>
                      <div className='flex'>
                      <h1 className='mx-2 text-gray-400 font-medium'>{seat.id.slice(0,1)}</h1>
                      <div className={'seatSold'}></div>
                      </div>
                      </>
                      
                    )
                    
                    }
                  </div>
                  </>
                )
              }else{
                return (
                  <div className='m-2'>
                    {seat.seatStatus !== 'sold' ? (
                      <>
                      
                      <div className={`seatClass p-px text-sm ${seat.seatStatus === 'selected' ? 'seatSelected' : ''}`} onClick={()=>handleSeat(seat)}>{seat.id.slice(2,5)}</div>
                      </>
                    ) : (
                      <>
                      
                      <div className={'seatSold'}></div>
                      </> 
                    )
                    }
                  </div>
                );
              }
            })}
            </div>
            </div>
        </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default UserSeats
