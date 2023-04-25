import React, { useEffect } from 'react'
import './Orders.css'
import { useSelector } from 'react-redux'
import { getOrder, orderCancel } from '../../api/user/users'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
function Orders() {
    const user = useSelector(state => state.users)
    const navigate = useNavigate()
    const [order,setOrder] = useState([])
    
    useEffect(() => {
        const fetchData = async () => {
            if(user){
        const response = await getOrder(user.user._id)
        if(response.success){
          
            setOrder(response.data)
        }else{
         toast.error('Something went wrong')
        }
        
        }
    }
        fetchData()
        window.scrollTo(0, 0)
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
            setOrder(response.data)
          }else{
            toast.error('Somthing went wrong')
          }
        }
      })
    }
      
  return (
 
    <section className="">
    <div className="container">
      <h1 className="ml-5 text-uppercase " style={{ fontWeight: 'bolder',fontSize:'25px' }}>Your Orders</h1>
      <br />
     
      <div className="rowhr">
        <div className="col-sm-6 col-md-6 col-lg-6">
          {order && order.map((order) => (
          <div key={order._id} className="food-card food-card--vertical">
            <div className="food-card_img">
              <img src={`https://image.tmdb.org/t/p/w300/${order.image}`} alt="" />
            </div>
            <div className="food-card_content">
              <div className="food-card_title-section">
                <a className="food-card_title" style={{ fontWeight: 'medium' }}>{order.movieName} ({order.language})</a>
                <a className="text-xl" style={{ fontWeight: '' }}>
                  Screen - {order.screen}
                </a>
                <br />
                <a className="text-lg" style={{ fontWeight: 'bolder' }}>
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
                    <span className="text-lg">{order.showTime}</span>
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
             <button onClick={() => handelTicket(order._id)} className="badge badge-success text-lg mr-2">View Ticket</button>
              <button onClick={() => handelCancel(order._id)} className="badge badge-danger text-lg mt-2">Cancel</button>
            </div>
            ) : (
              <button className="badge badge-danger text-lg mt-2 w-100">Canceled</button>
            )}

              
            </div>
          </div>
          ))}
        </div>
      </div>
    </div>
  </section>
  

  
  )
}

export default Orders