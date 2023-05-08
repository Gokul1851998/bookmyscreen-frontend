import React, { useEffect } from 'react'
import './Orders.css'
import { useSelector } from 'react-redux'
import { getOrder, orderCancel } from '../../api/user/users'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
function Orders() {
    const user = useSelector(state => state.users.user)
    const current =new Date()
    const navigate = useNavigate()
    const [activeOrders,setActiveOrders] = useState([])
    const [expiredOrders,setExpiredOrders] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            if(user){
        const response = await getOrder(user)
        if(response.success){
          setActiveOrders(response.data.activeOrders)
          setExpiredOrders(response.data.expireOrders)
        }else{
         toast.error('Something went wrong')
        }
        }
    }
        fetchData()
       
      }, [user])

    const handelTicket = (orderId) =>{
        navigate('/ticket',{state:orderId})
    }
    const handelCancel = (orderId) =>{
      Swal.fire({
        title: 'Are you sure?',
        text: "You want to cancel the booking!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Proceed!'
      }).then(async(result)=>{
        if (result.isConfirmed){
          const response = await orderCancel(orderId)
          if(response.success){
            Swal.fire(response.message)
            setActiveOrders(response.data)
          }else{
            toast.error('Somthing went wrong')
          }
        }
      })
    }
      
  return (
 
<div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-6xl mx-auto ">
<div className="flex justify-between gap-4">
  <div className="flex-1 mr-1 ml-1" >
  
  <h1 className=" pb-3 text-uppercase " style={{ fontWeight: 'bolder', fontSize: '3vh' }}>Upcoming Bookings</h1>
  {activeOrders && activeOrders.map((order) => (

        <div key={order._id} className="food-card food-card--vertical" >
          <div className="food-card_img">
            <img src={`https://image.tmdb.org/t/p/w300/${order.image}`} alt="" />
          </div>
          <div className="food-card_content">
            <div className="food-card_title-section">
              <a className="food-card_title" style={{ fontWeight: 'medium' }}>{order.movieName} ({order.language})</a>
              <a className="text-md" style={{ fontWeight: '' }}>
                Screen - {order.screen}
              </a>
              <br />
              <a className="text-md" style={{ fontWeight: 'bolder' }}>
                {order.selectedSeats.map((seat) => seat.id).join(', ')}
              </a>
            </div>
            <div className="food-card_bottom-section">
              <div>
                {order.ownerName} | {order.location}
              </div>
              <div className="space-between ">
                <div>
                  {new Date(order.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                </div>
                <div className="pull-right">
                  <span className="text-md">{order.showTime}</span>
                </div>
              </div>
              <hr />
              <div className="space-between">
                <h2>Qyt: <b>{order.selectedSeats.length}</b></h2>
                <div className="food-card_price">
                  <span>Rs. {order.total}</span>
                </div>
              </div>
            </div>
            {order.status === 'Booked' ? (
              <div className="food-card_button-section">
                <button style={{ width: '80px', height: '30px' }} onClick={() => handelTicket(order._id)} className="badge badge-success text-md mr-2">View Ticket</button>
                <button style={{ width: '80px', height: '30px' }}  onClick={() => handelCancel(order._id)} className="badge badge-danger text-md mt-2">Cancel</button>
              </div>
            ) : (
              <button style={{ width: '80px', height: '30px' }}  className="badge badge-danger text-md mt-2 w-100">Canceled</button>
            )}
             
          </div>
          
        </div>
  ))}

  </div>
  <div className="flex-1 mr-1 ml-1" >
 
        <h1 className=" pb-3 text-uppercase " style={{ fontWeight: 'bolder', fontSize: '3vh' }}>Previous Bookings</h1>
        {expiredOrders && expiredOrders.map((order) => (
        <div key={order._id} className="food-card food-card--vertical" style={{ filter: 'brightness(70%)' }}>
          <div className="food-card_img">
            <img src={`https://image.tmdb.org/t/p/w300/${order.image}`} alt="" />
          </div>
          <div className="food-card_content">
            <div className="food-card_title-section">
              <a className="food-card_title" style={{ fontWeight: 'medium' }}>{order.movieName} ({order.language})</a>
              <a className="text-md" style={{ fontWeight: '' }}>
                Screen - {order.screen}
              </a>
              <br />
              <a className="text-md" style={{ fontWeight: 'bolder' }}>
                {order.selectedSeats.map((seat) => seat.id).join(', ')}
              </a>
            </div>
            <div className="food-card_bottom-section">
              <div>
                {order.ownerName} | {order.location}
              </div>
              <div className="space-between">
                <div>
                  {new Date(order.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                </div>
                <div className="pull-right">
                  <span className="text-md">{order.showTime}</span>
                </div>
              </div>
              <hr />
              <div className="space-between">
                <h2>Qyt: <b>{order.selectedSeats.length}</b></h2>
                <div className="food-card_price">
                  <span>Rs. {order.total}</span>
                </div>
              </div>
            </div>
            {order.paymentstatus === 'Expired' ?   (
    <button style={{ width: '80px', height: '30px' }}  className="badge badge-warning text-white text-md mt-2 w-100">Expired</button>
  ): null
}
          </div>
        </div>
  ))}
        </div>
  </div>


</div>

  
  )
}

export default Orders