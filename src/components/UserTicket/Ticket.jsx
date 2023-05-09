import React from 'react'
import './Ticket.css'
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { getSingleorder } from '../../api/user/users'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import QRCode from 'qrcode.react'

function Ticket() {
    const location = useLocation()
    const orderId = location.state
    const [order,setOrder] = useState([])
    const [tickets,setTickets] = useState([])
    useEffect(() => {
        const fetchData = async () => {
          if(orderId){
            const response =await getSingleorder(orderId)
            if(response.success){
                setOrder(response.data)
                setTickets(response.data.selectedSeats)
            }else{
                toast.error(response.message)
            }
          }
    }
        fetchData()
      
      }, [orderId])

  
  return (
   
    <div className='pt-2 pb-5'>
        <h1 className="font-bold text-3xl text-center">TICKET</h1>
       
    <div key={order._id} className="ticket ">
    <div className="title">
      
      <QRCode value={order.bookingId} />
      <div className="cinema pl-4 pt-2">Booking ID</div>
      <div className=" " style={{fontSize:'1.8rem'}}><b>{order.bookingId}</b></div>
      
    </div>
    
    
    <div className="holes-lower"></div>
    <div className='m-2'>
    <div className="movie-title pl-3"><b>{order.movieName}</b></div>
    <div className="movie-title pl-3"><b>({order.language})</b></div>
    <div className="info ">
      <h1 className='pb-1'>{order.ownerName}:</h1>
      <h1 className='pb-1'>{order.location}, (Screen {order.screen})</h1>
      <h1 className='pb-1'>{order.showTime} | {new Date(order.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</h1>
      <h1 className='pt-2'><b>Quantity : {tickets.length}</b></h1>
      <div style={{ display: 'flex', alignItems: 'center' }}>
  <div className='pt-3 pb-3' style={{ width: '40px', height: '40px' }}>
   {/*?xml version="1.0" ?*/}<svg id="Icons" style={{enableBackground: 'new 0 0 32 32'}} version="1.1" viewBox="0 0 32 32" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><style type="text/css" dangerouslySetInnerHTML={{__html: "\n\t.st0{fill:none;stroke:#000000;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;}\n" }} /><path className="st0" d="M9,29H5c-1.1,0-2-0.9-2-2V17c0-1.7,1.3-3,3-3h0c1.7,0,3,1.3,3,3V29z" /><path className="st0" d="M27,29h-4V17c0-1.7,1.3-3,3-3h0c1.7,0,3,1.3,3,3v10C29,28.1,28.1,29,27,29z" /><rect className="st0" height={10} width={14} x={9} y={19} /><path className="st0" d="M6,14V7.8C6,5.7,7.7,4,9.8,4h12.3C24.3,4,26,5.7,26,7.8V14" /></svg>
  </div>
  <h2 className='pt-4' style={{ marginLeft: '10px' }}><b>{tickets.map((seat) => seat.id).join(', ')}</b></h2>
</div>
<div className=" pt-4 ">
             <hr className="new1" />
 </div>
 <div className="mt-5 pl-1 d-flex align-items-center">
  <i className="fa fa-plus-circle mr-2" style={{color: 'grey', fontSize: '20px'}}></i>
  <div>Amount Paid:</div>
  <div className="movie-title  ml-auto"><b>Rs. {order.total}</b></div>
</div>
    </div>
    </div>
  </div>
  </div>
 
  )
}

export default  Ticket
