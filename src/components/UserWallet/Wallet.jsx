import React, { useEffect } from 'react'
import './Wallet.css'
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { getWallet } from '../../api/user/users';
import { toast } from 'react-hot-toast';

function Wallet() {
    const user = useSelector(state => state.users.user);
    const [users,setUsers] = useState()
    const [wallet,setWallet]= useState()
     useEffect(()=>{
         const fetchData = async()=>{
          if(user){
            const response = await getWallet(user)
            console.log(response.data);
            if(response.success){
             setUsers(response.data)
             setWallet(response.data.wallet.toFixed(2))
            }else{
              toast.error(response.message)
            }
          }
         }
         fetchData()
     },[user])
  return (
    <>
    <h1 className=" pt-3 text-uppercase " style={{ fontWeight: 'bolder',fontSize:'25px',justifyContent: 'center',display: 'flex' }}>Your Wallet</h1>
      <br />

    <div className='pb-4 rounded' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '10px' }}>
      
          <div className="iphone">
            
            <div className="headerwall">
              <div className="header-summary">
                <div className="summary-text">
                  My Balance
                </div>
                <div className="summary-balance">
                  ₹ {wallet}
                </div>
                
              </div>
              
            </div>
            
      <div className="content">
             
      <div className="transactions"><span className="t-desc">Recent Transactions</span>
      {users?.transaction?.map((amount)=>(
         <div className="transaction">
     <div className="t-icon-container"><img src="https://pbs.twimg.com/profile_images/1271385506505347074/QIc_CCEg_400x400.jpg" className="t-icon" /></div>
     <div className="t-details">
       <div className="t-title ">Razorpay </div>
       <div className="t-time"> {new Date(amount.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
       </div>
       <div className="t-time"> {new Date(amount.date).toLocaleTimeString([], { hour: '2-digit', minute:'2-digit', hour12: true })}
       </div>
     </div>
     {amount.amount > 0 ? (
  <div className="t-amount">+ {Math.abs(amount.amount)}</div>
) : (
  <div className="s-amount"> {amount.amount}</div>
)}
      </div>
    ))}
       </div>
          </div>
           
           
           
          </div>
      
       
      </div>
      </>
  )
}

export default  Wallet
