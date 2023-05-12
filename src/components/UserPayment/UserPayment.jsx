import React,{useEffect, useState} from 'react'
import './UserPayment.css'
import { useLocation, useNavigate } from 'react-router-dom'

import { getBalance, getBill, getPayment, userOrder } from '../../api/user/users'
import { getPicture } from '../../api/movie/movie'
import { toast } from 'react-hot-toast'
import { useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import Loading from '../Loader/Loading'
 function UserPayment() {
    const user = useSelector(state => state.users)
    const location = useLocation()
    const navigate = useNavigate()
    const details = location.state.data
    const [subtotal,setSubtotal] = useState(0)
    const [fee,setFee] = useState(0)
    const [total,setTotal] = useState(0)
    const [image,setImage] = useState()
    const [language,setlanguage] = useState('')
    const [payment,setPayment] = useState(true)
    const [method,setMethod] = useState('')
    const [loading, setLoading] = useState(true)
   
    const [bookingId,setBookingId] = useState('')
    useEffect(() => {
        const fetchData = async () => {
          if (details) {
            setSubtotal(details.showDetails.price * details.selectedSeats.length)
            setFee(((details.showDetails.price * details.selectedSeats.length) / 6).toFixed(2))
            setTotal(((details.showDetails.price * details.selectedSeats.length)+(((details.showDetails.price * details.selectedSeats.length) / 6))).toFixed(2))
            const response = await getBill(details)
            const response2 = await getPicture(response.data)
            if(response2){
              setLoading(false)
              setImage(response2.poster_path)
              setlanguage(response2.spoken_languages[0].english_name)
             
            }
          }
        }
        fetchData()
      }, [details,user])
      const initializePayment = async()=>{
        if(method == 'Wallet'){
          walletPay()
        }else if(method == 'Razorpay'){
          onlinePay()
        }else{
          toast.error('Select any payment method')
        }
      }
       
      const onlinePay = async() => {
        console.log('1');
        console.log(details,fee,subtotal,total,image,user,language);
          const response = await getPayment({details,fee,subtotal,total,image,user,language})
          console.log(response);
          console.log('2');
          if(response?.data){
              handleRazorPay(response.data.order,response.data.bookings)
              
          }else{
              toast.error('Something went wrong')
          }
    }

    const walletPay = async()=>{
      console.log('3');
      const response2 = await getBalance({details,fee,subtotal,total,image,user,language})
      console.log(response2);
      console.log('4');
        if(response2?.success){
          Swal.fire(response2.message)
          const orderId = response2.data
          console.log(orderId);
          navigate('/success',{state:orderId})
        }else{
          toast.error(response2.message)
        }
    }
   
    const handleRazorPay = async(order,orderId) => {
      console.log(order);
      console.log(orderId);
        const options = {
            "key": import.meta.env.VITE_RAZORPAY_ID,
            "amount": order.amount,
            "currency": order.currency,
            "name": 'bookmyscreen',
            "order_id": order.id,
            handler: function (response) {
               console.log(response);
               navigate('/success',{state:orderId})  
            }
        }
        const rzp = new Razorpay(options)
         await rzp.open()
        
    }


  

  return (
    <div >
    <div className="d-flex justify-content-center m-5 " >
        <div className="col-md-5" >
      
          <div className="right border" style={{backgroundColor:'#fffcdc'}}>
          <div className="header pb-2" style={{ textAlign: "center" }}>Booking Summary</div>
          <hr className="mt-2 mb-2" />
            {loading? (
              <Loading/>
            ):(
              <div className="row item">
              <div className="col-4 align-self-center">
                <img className="img-fluid" src={`https://image.tmdb.org/t/p/w300/${image}`} />
              </div>
              <div className="col-8">
              
                <h1 className="font-black text-gray-800 md:text-1xl text-xl ">{details.selectedSeats.map((seat) => (seat.id)).join(', ')}
                    </h1>
                    <h2>( {details.selectedSeats.length} Tickets )</h2>
                <div className="font-black text-gray-800 md:text-1xl text-md pb-1">Screen -{details.showDetails.screen}</div>
                <div className="row ">{details.showDetails.movieName} ({language})</div>
                <div className="row text-muted">{details.showDetails.ownerName} : {details.showDetails.location}</div>
                <div className="row text-muted">{details.showDetails.showTime} | {new Date(details.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })} </div>
              </div>
            </div>
            )}
          
            <div className="line mt-3 mb-3">
             <hr className="new1" />
             </div>
            <div className="row lower">
              <div className="col text-left">Subtotal</div>
              <div className="col text-right">Rs. {subtotal}</div>
            </div>
            <div className="row lower">
              <div className="col text-left"> Convenience fees</div>
              <div className="col text-right">{fee}</div>
            </div>
            <div className="line mt-3 mb-3">
             <hr className="new1" />
             </div>
            <div className="row lower">
              <div className="col text-left md:text-1xl text-xl"><b>Total to pay</b></div>
              <div className="col text-right md:text-1xl text-xl" style={{color:'green'}}><b>Rs. {total}</b></div>
            </div>
            {/* <div className="row lower">
              <div className="col text-left"><a href="#"><u>Add promo code</u></a></div>
            </div> */}
            <div className="flex flex-col">
  <div className="inline-flex items-center pt-2">
    <label className="relative flex cursor-pointer items-center rounded-full p-2"  data-ripple-dark="true">
      <input  onClick={()=>setMethod('Razorpay')}  name="type" type="radio" className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-pink-500 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-pink-500 checked:before:bg-pink-500 hover:before:opacity-10" />
      <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-pink-500 opacity-0 transition-opacity peer-checked:opacity-100">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="currentColor">
          <circle data-name="ellipse" cx={8} cy={8} r={8} />
        </svg>
      </div>
    </label>
    <label className="mt-px cursor-pointer select-none f font-bold " >
    Razorpay
    </label>
    
  </div>
     
        <div className="inline-flex items-center ">
          <label className="relative flex cursor-pointer items-center rounded-full p-2"  data-ripple-dark="true">
            <input  onClick={()=>setMethod('Wallet')} id="react" name="type" type="radio" className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-pink-500 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-pink-500 checked:before:bg-pink-500 hover:before:opacity-10" />
            <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-pink-500 opacity-0 transition-opacity peer-checked:opacity-100">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="currentColor">
                <circle data-name="ellipse" cx={8} cy={8} r={8} />
              </svg>
            </div>
          </label>
          <label className="mt-px cursor-pointer select-none font-bold " >
            Wallet
          </label>
        </div>
      </div>
           <div className="text-center mt-2">
           <button onClick={initializePayment} className="btn md:text-1xl text-lg" style={{ background:'#f84464', color:'#fff', width: '100%' }}><b>Proceed</b></button>
           </div>
          </div>
        </div>

</div>

</div>
  )
}

export default UserPayment
