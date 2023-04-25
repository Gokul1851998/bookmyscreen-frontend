import React, { useState } from 'react'
import { useEffect } from 'react'
import { getBookings } from '../../api/owner/ownerInstance'
import { useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';

 function Bookings() {
    const owner = useSelector(state => state.owners.owner);
    const [order,setOrder] = useState([])
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
    {order.map((list,index)=>(
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
         
         >
         <i className="fas fa-chevron-left" style={{fontSize: '1.5em'}}></i>
       </button>
         <button
        type="button"
         className="inline-block rounded "
        
         >
       <i className="fas fa-chevron-right" style={{fontSize: '1.5em'}}></i>

        </button>

        </div>
    </div>
  </div>
  )
}

export default Bookings
