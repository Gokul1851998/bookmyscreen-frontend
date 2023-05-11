import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
 function PaymentSuccessfull() {
    const navigate = useNavigate()
    const location = useLocation()
    const orderId = location.state._id
    console.log(orderId);
    const handleBill = () =>{
        if(orderId){
            navigate('/ticket',{state:orderId})
        }else{
         toast.error('Something went wrong')
        }
        
    }
  return (
   
    <div className="bg-gray-100 ">
        <div className="bg-white p-6  md:mx-auto pt-5">
          <svg viewBox="0 0 24 24" className="text-green-600 w-20 h-20 mx-auto my-6">
            <path fill="currentColor" d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z">
            </path>
          </svg>
          <div className="text-center ">
            <h3 className="md:text-3xl text-base text-gray-900 font-semibold text-center">Payment Done!</h3>
            <p className="text-gray-600 my-2 text-lg">Thank you for completing your secure online payment.</p>
            <p className='my-2 text-lg'> Have a great day!</p>
            <div className="flex justify-center space-x-8 py-10">
  <a type='button' onClick={()=>navigate('/')} className="px-12 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3" style={{borderRadius:'10px'}}>
    GO HOME
  </a>
  <a type='button'onClick={handleBill} className="px-12 bg-rose-500 hover:bg-red-600 text-white font-semibold py-3" style={{borderRadius:'10px'}}> 
    TICKET
  </a>
</div>

          </div>
        </div>
      </div>
  
  )
}

export default PaymentSuccessfull
