import React, { useState } from 'react'
import { useEffect } from 'react'
import { getBookings } from '../../api/owner/ownerInstance'
import { useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { viewOrder } from '../../api/admin/admin';
const perPage = 6;
 function Bookings() {
    const owner = useSelector(state => state.owners.owner);
    const [order,setOrder] = useState([])
    const [modal,setModal] = useState(false)
    const [orders,setOrders] = useState([])
    const [ticket,setTicket] = useState([])
    useEffect(()=>{
     const fetchData= async()=>{
        if(owner){
            const response = await getBookings(owner._id)
            if(response.success){
              setOrder(response.data)
            }else{
              toast.error(response.message)
            }
        }
   
     }
     fetchData()
    },[owner])

  const handleBooking = async(orderId)=>{
    setModal(true)
    const response = await viewOrder(orderId)
    console.log(response);
    if(response.success){
      console.log(response);
      setOrders(response.data)
      setTicket(response.data.selectedSeats)
    }else{
      toast.error(response.message)
    }
//    navigate('/viewOrder',{state:orderId})
}

const [currentPage, setCurrentPage] = useState(1);

const startIndex = (currentPage - 1) * perPage;

const endIndex = startIndex + perPage;
const displayedMovies = order.slice(startIndex, endIndex);

const totalPages = Math.ceil(order.length / perPage);

const handlePrevClick = () => {
  setCurrentPage((prevPage) => prevPage - 1);
};

const handleNextClick = () => {
  setCurrentPage((prevPage) => prevPage + 1);
};

  return (
    <div className='ml-10 mr-10' style={{ overflowX: 'auto' }} >
    <div className="flex justify-between mb-3 mt-3">
    <h2 className="font-bold text-lg uppercase px-3 py-2">
      Booking List
    </h2>
  
  </div>
    <div className="overflow-x-auto" >
    <table className="table-auto min-w-full divide-y divide-gray-300" style={{ border: "0.5px solid black" }}>  
  <thead className="bg-gray-900 text-white">
    <tr>
      <th className="px-6 py-4 text-center font-semibold uppercase">No</th>
      <th className="px-6 py-4 text-center font-semibold uppercase">Booking Id</th>
            <th className="px-6 py-4 text-center font-semibold uppercase">User Name</th>
            <th className="px-6 py-4 text-center font-semibold uppercase">Movie Name</th>
            <th className="px-6 py-4 text-center font-semibold uppercase">Booking Status</th>
            <th className="px-6 py-4 text-center font-semibold uppercase">Booked date</th>
            <th className="px-6 py-4 text-center font-semibold uppercase">Details</th>
      
    </tr>
  </thead>
  <tbody className="divide-y divide-gray-200">
    {displayedMovies.map((list,index)=>(
      <tr key={list._id}>
        <td className="px-6 py-4  text-center">
          {index+1}
        </td>
        <td className="px-6 py-4 font-semibold text-center">
          {list.bookingId}
        </td>
        <td className="px-6 py-4 font-semibold text-center">
        {list.userName}
        </td>
        <td className="px-6 py-4 font-semibold text-center">
        {list.movieName}
        </td>
        <td className="px-6 py-4 font-semibold text-center">
        {list.status === 'Booked'? (
                  <p className="fw-bold text-success" > {list.status}</p>
                ):(
                  <p className="fw-bold text-danger" > {list.status}</p>
                )}
        </td>
        <td className="px-6 py-4 font-semibold text-center">
        {new Date(list.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
        </td>
        
        <td className="px-6 py-4 text-center">
          <button
            onClick={()=>handleBooking(list._id)}
            type="button"
            className="inline-block mr-2 rounded bg-info px-6 pt-2.5 pb-2 text-sm font-bold uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#14a44d] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)]">
              View
          </button>
         
        </td>
      </tr>
    ))}
  </tbody>
</table>

      <div className="flex justify-center mt-4">
      <button
        type="button"
          className="inline-block rounded  mr-4"
          onClick={handlePrevClick}
          disabled={currentPage === 1}
         >
         <i className="fas fa-chevron-left" style={{fontSize: '1.5em'}}></i>
       </button>
         <button
        type="button"
         className="inline-block rounded "
         onClick={handleNextClick}
         disabled={currentPage === totalPages}
         >
       <i className="fas fa-chevron-right" style={{fontSize: '1.5em'}}></i>

        </button>

        </div>
    </div>

    {modal && (
  <div className="modal " id="exampleModal"  aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog ">
      <div className="modal-content w-auto">
        {/* <div className="modal-header border-bottom-0">
          <button type="button" className="btn-close" data-mdb-dismiss="modal" aria-label="Close" />
        </div> */}
        
        <div className="modal-body text-start text-black p-4">
        <p className="mb-2 fw-bold" style={{color: '#000'}}>Booking summary</p>
          <h5 className="modal-title text-uppercase mb-2" id="exampleModalLabel">{orders.movieName}</h5>
          <h4 className="mb-1" style={{color: '#35558a'}}>{orders.userName}</h4>
          
          <hr className="mt-2 mb-4" style={{height: 0, backgroundColor: 'transparent', opacity: '.75', borderTop: '2px dashed #9e9e9e'}} />
         
          <div className="d-flex justify-content-between">
            <p className="small mb-0">Screen :</p>
            <p className="small mb-0">{orders.screen}</p>
          </div>
          <div className="d-flex justify-content-between">
            <p className="small mb-0">Ticket Qyt :</p>
            <p className="small mb-0">{ticket.length}</p>
          </div>
          <div className="d-flex justify-content-between pb-1">
            <p className="small">Seats :</p>
            <p className="small">{ticket.map((seat) => seat.id).join(', ')}</p>
          </div>
          <div className="d-flex justify-content-between pb-1">
            <p className="small mb-0">Date :</p>
            <p className="small mb-0">{new Date(orders.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
          </div>
          <div className="d-flex justify-content-between pb-1">
            <p className="small">Show Time :</p>
            <p className="small">{orders.showTime}</p>
          </div>
          <div className="d-flex justify-content-between pb-1">
            <p className="small">Booking Id :</p>
            <p className="small">{orders.bookingId}</p>
          </div>
          <div className="d-flex justify-content-between pb-1">
            <p className="small">Sub Total :</p>
            <p className="small">Rs. {orders.subtotal}</p>
          </div>
          <div className="d-flex justify-content-between pb-1">
            <p className="small">Convenience fees :</p>
            <p className="small">Rs. {orders.fee}</p>
          </div>
          
          <div className="d-flex justify-content-between">
            <p className="fw-bold">Total</p>
            <p className="fw-bold" style={{color: '#35558a'}}>Rs. {orders.total}</p>
          </div>
        </div>
        <div className="modal-footer d-flex justify-content-center border-top-0 py-4">
          <button onClick={()=>setModal(false)} type="button" className="btn btn-primary btn-lg mb-1" style={{backgroundColor: '#35558a'}}>
            OK
          </button>
        </div>
      </div>
    </div>
  </div>
)}
  </div>
  )
}

export default Bookings
